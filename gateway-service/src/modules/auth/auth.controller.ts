import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { AuthClientGrpc } from './auth.grpc';
import { SendOtpRequest, VerifyOtpRequest } from './dto';

interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly auth: AuthClientGrpc,
		private readonly configService: ConfigService,
	) {}

	@ApiOperation({
		summary: 'Send otp code',
		description:
			'Sends a verification code to the user phone number or email.',
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public sendOtp(@Body() dto: SendOtpRequest) {
		return this.auth.sendOtp(dto);
	}

	@ApiOperation({
		summary: 'Verify otp code',
		description:
			'Verifies the code sent to the user phone number or email and returns a access token.',
	})
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	public async verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await lastValueFrom(
			this.auth.verifyOtp(dto),
		);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: this.configService.get('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: this.configService.getOrThrow<number>(
				'COOKIES_REFRESH_TOKEN_TTL',
			),
		});

		return { accessToken };
	}

	@ApiOperation({
		summary: 'Refresh access token',
		description: 'Renews access token using refresh token from cookies',
	})
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const refreshToken: unknown = req.cookies?.refreshToken;

		if (typeof refreshToken !== 'string' || !refreshToken) {
			throw new UnauthorizedException('Refresh token is missing');
		}

		const response: RefreshResponse = await lastValueFrom(
			this.auth.refresh({ refreshToken }),
		);

		const { accessToken, refreshToken: newRefreshToken } = response;

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: this.configService.get('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: this.configService.getOrThrow<number>(
				'COOKIES_REFRESH_TOKEN_TTL',
			),
		});

		return { accessToken };
	}

	@ApiOperation({
		summary: 'Logout',
		description: 'Clears the refresh token cookie and logs the user out',
	})
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public logout(@Res({ passthrough: true }) res: Response) {
		res.cookie('refreshToken', '', {
			httpOnly: true,
			secure: this.configService.get('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			expires: new Date(0),
		});

		return { ok: true };
	}
}

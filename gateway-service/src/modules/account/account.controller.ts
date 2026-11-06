import { GetAccountResponse } from '@cinema-microservices-nest/contracts/gen/account';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser, Protected } from 'src/shared/decorators';

import { AccountClientGrpc } from './account.grpc';
import {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest,
} from './dto';

enum Role {
	USER = 0,
	ADMIN = 1,
	UNRECOGNIZED = -1,
}

@Controller('account')
export class AccountController {
	public constructor(private readonly account: AccountClientGrpc) {}

	@ApiOperation({
		summary: 'User account',
		description: 'Return user account',
	})
	@ApiBearerAuth()
	@Protected(Role.ADMIN)
	@Get('account')
	@HttpCode(HttpStatus.OK)
	public getAccount(
		@CurrentUser() userId: string,
	): Promise<GetAccountResponse> {
		return this.account.getAccount({ id: userId });
	}

	@ApiOperation({
		summary: 'Init email change',
		description: 'Sends confirmation code to a new email address.',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/init')
	@HttpCode(HttpStatus.OK)
	public initEmailChange(
		@Body() dto: InitEmailChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.account.initEmailChange({
			...dto,
			userId,
		});
	}

	@ApiOperation({
		summary: 'Confirm email change',
		description:
			'Verifies confirmation code and updates user email address.',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('email/confirm')
	@HttpCode(HttpStatus.OK)
	public confirmEmailChange(
		@Body() dto: ConfirmEmailChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.account.confirmEmailChange({
			...dto,
			userId,
		});
	}

	@ApiOperation({
		summary: 'Init phone change',
		description: 'Sends confirmation code to a new phone number.',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/init')
	@HttpCode(HttpStatus.OK)
	public initPhoneChange(
		@Body() dto: InitPhoneChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.account.initPhoneChange({
			...dto,
			userId,
		});
	}

	@ApiOperation({
		summary: 'Confirm phone change',
		description:
			'Verifies confirmation code and updates user phone number.',
	})
	@ApiBearerAuth()
	@Protected()
	@Post('phone/confirm')
	@HttpCode(HttpStatus.OK)
	public confirmPhoneChange(
		@Body() dto: ConfirmPhoneChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.account.confirmPhoneChange({
			...dto,
			userId,
		});
	}
}

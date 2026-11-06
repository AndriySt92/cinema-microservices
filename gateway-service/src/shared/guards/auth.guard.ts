import { JwtAuthService } from '@cinema-microservices-nest/jwt-auth';
import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthenticatedRequest } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly jwtAuthService: JwtAuthService) {}

	public canActivate(context: ExecutionContext): boolean {
		const request = context
			.switchToHttp()
			.getRequest<AuthenticatedRequest>();

		const token = this.extractToken(request);

		if (!token) throw new UnauthorizedException('Token not provided');

		const result = this.jwtAuthService.verify(token);

		if (!result.valid) throw new UnauthorizedException(result.reason);

		request.user = {
			id: result.userId,
		};

		return true;
	}

	private extractToken(request: Request) {
		const header = request.headers.authorization;

		if (!header)
			throw new UnauthorizedException('Authorization header missing');

		if (!header.startsWith('Bearer '))
			throw new UnauthorizedException('Invalid authorization');

		const token = header.replace(/^Bearer\s+/i, '').trim();

		return token;
	}
}

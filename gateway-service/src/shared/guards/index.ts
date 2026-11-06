export { AuthGuard } from './auth.guard';
export { RolesGuard, Role } from './roles.guard';

// import { JwtAuthService } from '@cinema-microservices-nest/jwt-auth';
// import {
// 	CanActivate,
// 	ExecutionContext,
// 	Injectable,
// 	UnauthorizedException,
// } from '@nestjs/common';
// import type { Request } from 'express';

// export interface AuthenticatedUser {
// 	id: string;
// }

// export type AuthenticatedRequest = Request & {
// 	user: AuthenticatedUser;
// };

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
// 	public constructor(private readonly jwtAuthService: JwtAuthService) {}

// 	public canActivate(context: ExecutionContext): boolean {
// 		const request = context
// 			.switchToHttp()
// 			.getRequest<AuthenticatedRequest>();

// 		const authorization = request.headers.authorization;
// 		const match = authorization?.match(/^Bearer\s+(\S+)$/i);

// 		if (!match) {
// 			throw new UnauthorizedException(
// 				'Missing or malformed bearer token',
// 			);
// 		}

// 		const token = match[1];
// 		const result = this.jwtAuthService.verify(token);

// 		if (!result.valid) {
// 			throw new UnauthorizedException('Invalid or expired token');
// 		}

// 		request.user = {
// 			id: result.userId,
// 		};

// 		return true;
// 	}
// }

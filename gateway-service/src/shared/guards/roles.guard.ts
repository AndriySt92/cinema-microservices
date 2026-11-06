import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountClientGrpc } from 'src/modules/account/account.grpc';

import { ROLES_KEY } from '../decorators';
import { AuthenticatedRequest } from '../types';

export enum Role {
	USER = 0,
	ADMIN = 1,
	UNRECOGNIZED = -1,
}

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(
		private readonly reflector: Reflector,
		private readonly accountClient: AccountClientGrpc,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		// No role restrictions: allow the request to continue.
		if (!requiredRoles?.length) {
			return true;
		}

		const request = context
			.switchToHttp()
			.getRequest<AuthenticatedRequest>();

		const authenticatedUser = request.user;

		if (!authenticatedUser)
			throw new ForbiddenException('User context missing');

		const account = await this.accountClient.getAccount({
			id: authenticatedUser.id,
		});

		if (!account) {
			throw new NotFoundException('Account not found');
		}
		const hasRequiredRole = requiredRoles.includes(account.role);

		if (!hasRequiredRole) {
			throw new ForbiddenException(
				'You do not have permission to access this resource',
			);
		}

		return true;
	}
}

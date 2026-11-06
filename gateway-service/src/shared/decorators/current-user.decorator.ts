import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import { AuthenticatedRequest } from '../types';

export const CurrentUser = createParamDecorator(
	(_: unknown, ctx: ExecutionContext): string | null => {
		const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

		return request.user?.id ?? null;
	},
);

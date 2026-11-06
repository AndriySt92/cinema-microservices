import { RpcStatus } from '@cinema-microservices-nest/common/dist';
import { HttpStatus } from '@nestjs/common';

export const grpcToHttpStatus: Record<number, number> = {
	[RpcStatus.OK]: HttpStatus.OK, // 200
	[RpcStatus.CANCELLED]: 499, // 499
	[RpcStatus.UNKNOWN]: HttpStatus.INTERNAL_SERVER_ERROR, // 500
	[RpcStatus.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST, // 400
	[RpcStatus.DEADLINE_EXCEEDED]: HttpStatus.GATEWAY_TIMEOUT, // 504
	[RpcStatus.NOT_FOUND]: HttpStatus.NOT_FOUND, // 404
	[RpcStatus.ALREADY_EXISTS]: HttpStatus.CONFLICT, // 409
	[RpcStatus.PERMISSION_DENIED]: HttpStatus.FORBIDDEN, // 403
	[RpcStatus.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS, // 429
	[RpcStatus.FAILED_PRECONDITION]: HttpStatus.BAD_REQUEST, // 400
	[RpcStatus.ABORTED]: HttpStatus.CONFLICT, // 409
	[RpcStatus.OUT_OF_RANGE]: HttpStatus.BAD_REQUEST, // 400
	[RpcStatus.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED, // 501
	[RpcStatus.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR, // 500
	[RpcStatus.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE, // 503
	[RpcStatus.DATA_LOSS]: HttpStatus.INTERNAL_SERVER_ERROR, // 500
	[RpcStatus.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED, // 401
};

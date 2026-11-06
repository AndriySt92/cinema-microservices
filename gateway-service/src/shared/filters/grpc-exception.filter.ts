import {
	ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import type { Response } from 'express';

import { grpcToHttpStatus } from '../utils';

interface GrpcError {
	code: number;
	details: string;
}

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GrpcExceptionFilter.name);

	public catch(exception: unknown, host: ArgumentsHost): void {
		const response = host.switchToHttp().getResponse<Response>();

		if (exception instanceof HttpException) {
			const status = exception.getStatus();

			response.status(status).json({
				statusCode: status,
				message: exception.message,
			});
			return;
		}

		if (this.isGrpcError(exception)) {
			const status =
				grpcToHttpStatus[exception.code] ??
				HttpStatus.INTERNAL_SERVER_ERROR;

			this.logger.warn(
				`gRPC error: code=${exception.code}, status=${status}, details=${exception.details}`,
			);

			response.status(status).json({
				statusCode: status,
				message:
					status < 500
						? exception.details || 'gRPC request failed'
						: 'Internal server error',
			});
			return;
		}

		this.logger.error(
			'Unhandled exception in HTTP request',
			exception instanceof Error ? exception.stack : String(exception),
		);

		response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal server error',
		});
	}

	private isGrpcError(exception: unknown): exception is GrpcError {
		return (
			typeof exception === 'object' &&
			exception !== null &&
			'code' in exception &&
			typeof exception.code === 'number' &&
			'details' in exception &&
			typeof exception.details === 'string'
		);
	}
}

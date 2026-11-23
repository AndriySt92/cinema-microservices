import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import type { Request, Response } from 'express';
import { Counter, Gauge, Histogram } from 'prom-client';
import { finalize, type Observable } from 'rxjs';

interface ExpressRoute {
	path: unknown;
}

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
	private readonly SERVICE_NAME = 'gateway';

	public constructor(
		@InjectMetric('http_requests_total')
		private readonly counter: Counter<string>,
		@InjectMetric('http_request_duration_seconds')
		private readonly histogram: Histogram<string>,
		@InjectMetric('http_requests_in_flight')
		private readonly inFlight: Gauge<string>,
	) {}

	public intercept<T>(
		context: ExecutionContext,
		next: CallHandler<T>,
	): Observable<T> {
		const req = context.switchToHttp().getRequest<Request>();
		const res = context.switchToHttp().getResponse<Response>();
		const method = req.method.toLowerCase();

		const routePath = (req.route as ExpressRoute | undefined)?.path;

		const route = typeof routePath === 'string' ? routePath : 'unknown';

		this.inFlight.inc({ service: this.SERVICE_NAME });

		const endTimer = this.histogram.startTimer();

		return next.handle().pipe(
			finalize(() => {
				const status = res.statusCode.toString();

				const labels = {
					service: this.SERVICE_NAME,
					method,
					route,
					status,
				};

				this.counter.inc(labels);
				endTimer(labels);
				this.inFlight.dec({ service: this.SERVICE_NAME });
			}),
		);
	}
}

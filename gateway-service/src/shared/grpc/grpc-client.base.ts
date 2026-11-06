import type { OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

export abstract class GrpcClientBase<
	TService extends object,
> implements OnModuleInit {
	protected service!: TService;

	protected constructor(
		private readonly client: ClientGrpc,
		private readonly serviceName: string,
	) {}

	public onModuleInit(): void {
		this.service = this.client.getService<TService>(this.serviceName);
	}
}

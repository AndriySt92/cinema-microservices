import { PROTO_PATHS } from '@cinema-microservices-nest/contracts';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { createGrpcClient } from './grpc-client.factory';

@Module({
	imports: [
		ClientsModule.registerAsync({
			isGlobal: true,
			clients: [
				createGrpcClient({
					name: 'AUTH_PACKAGE',
					packageName: 'auth.v1',
					protoPath: PROTO_PATHS.AUTH,
					urlConfigKey: 'AUTH_GRPC_URL',
				}),
			],
		}),
	],
})
export class GrpcClientsModule {}

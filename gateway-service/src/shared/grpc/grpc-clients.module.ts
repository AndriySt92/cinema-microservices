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
					name: 'ACCOUNT_PACKAGE',
					packageName: 'account.v1',
					protoPath: PROTO_PATHS.ACCOUNT,
					urlConfigKey: 'ACCOUNT_GRPC_URL',
				}),
				createGrpcClient({
					name: 'AUTH_PACKAGE',
					packageName: 'auth.v1',
					protoPath: PROTO_PATHS.AUTH,
					urlConfigKey: 'AUTH_GRPC_URL',
				}),
				createGrpcClient({
					name: 'USERS_PACKAGE',
					packageName: 'users.v1',
					protoPath: PROTO_PATHS.USERS,
					urlConfigKey: 'USERS_GRPC_URL',
				}),
				createGrpcClient({
					name: 'MEDIA_PACKAGE',
					packageName: 'media.v1',
					protoPath: PROTO_PATHS.MEDIA,
					urlConfigKey: 'MEDIA_GRPC_URL',
				}),
				createGrpcClient({
					name: 'MOVIE_PACKAGE',
					packageName: 'movie.v1',
					protoPath: PROTO_PATHS.MOVIE,
					urlConfigKey: 'MOVIE_GRPC_URL',
				}),
				createGrpcClient({
					name: 'CATEGORY_PACKAGE',
					packageName: 'category.v1',
					protoPath: PROTO_PATHS.CATEGORY,
					urlConfigKey: 'CATEGORY_GRPC_URL',
				}),
				createGrpcClient({
					name: 'CINEMA_PACKAGE',
					packageName: 'cinema.v1',
					protoPath: PROTO_PATHS.CINEMA,
					urlConfigKey: 'CINEMA_GRPC_URL',
				}),
				createGrpcClient({
					name: 'SEAT_PACKAGE',
					packageName: 'seat.v1',
					protoPath: PROTO_PATHS.SEAT,
					urlConfigKey: 'SEAT_GRPC_URL',
				}),
				createGrpcClient({
					name: 'HALL_PACKAGE',
					packageName: 'hall.v1',
					protoPath: PROTO_PATHS.HALL,
					urlConfigKey: 'HALL_GRPC_URL',
				}),
				createGrpcClient({
					name: 'SCREENING_PACKAGE',
					packageName: 'screening.v1',
					protoPath: PROTO_PATHS.SCREENING,
					urlConfigKey: 'SCREENING_GRPC_URL',
				}),
				createGrpcClient({
					name: 'BOOKING_PACKAGE',
					packageName: 'booking.v1',
					protoPath: PROTO_PATHS.BOOKING,
					urlConfigKey: 'BOOKING_GRPC_URL',
				}),
			],
		}),
	],
})
export class GrpcClientsModule {}

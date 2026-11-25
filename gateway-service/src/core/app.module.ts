import { GrpcClientsModule } from '@cinema-microservices-nest/common';
import { JwtAuthModule } from '@cinema-microservices-nest/jwt-auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
	AccountModule,
	AuthModule,
	BookingModule,
	CategoryModule,
	CinemaModule,
	HallModule,
	MediaModule,
	MovieModule,
	ScreeningModule,
	SeatModule,
	UsersModule,
} from '@/modules';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getJwtConfig } from './config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				'.env',
			],
		}),
		JwtAuthModule.registerAsync({
			useFactory: getJwtConfig,
			inject: [ConfigService],
		}),
		GrpcClientsModule.register(
			'CINEMA',
			'SEAT',
			'HALL',
			'SCREENING',
			'MOVIE',
			'ACCOUNT',
			'AUTH',
			'CATEGORY',
			'MEDIA',
			'USERS',
			'BOOKING',
		),
		AuthModule,
		AccountModule,
		UsersModule,
		MediaModule,
		MovieModule,
		CategoryModule,
		CinemaModule,
		HallModule,
		SeatModule,
		ScreeningModule,
		BookingModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

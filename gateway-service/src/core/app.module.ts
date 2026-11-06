import { JwtAuthModule } from '@cinema-microservices-nest/jwt-auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountModule } from 'src/modules/account/account.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GrpcClientsModule } from 'src/shared/grpc';

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
		GrpcClientsModule,
		AuthModule,
		AccountModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

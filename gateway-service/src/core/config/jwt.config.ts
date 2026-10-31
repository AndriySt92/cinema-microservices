import { JwtAuthOptions } from '@cinema-microservices-nest/jwt-auth';
import { ConfigService } from '@nestjs/config';

export function getJwtConfig(configService: ConfigService): JwtAuthOptions {
	return {
		secretKey: configService.getOrThrow<string>('JWT_SECRET_KEY'),
	};
}

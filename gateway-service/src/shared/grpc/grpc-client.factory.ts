import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

interface GrpcClientDefinition {
	name: string;
	packageName: string;
	protoPath: string;
	urlConfigKey: string;
}

export const createGrpcClient = ({
	name,
	packageName,
	protoPath,
	urlConfigKey,
}: GrpcClientDefinition) => ({
	name,
	imports: [ConfigModule],
	inject: [ConfigService],

	useFactory: (configService: ConfigService) => ({
		transport: Transport.GRPC as const,
		options: {
			package: packageName,
			protoPath,
			url: configService.getOrThrow<string>(urlConfigKey),
		},
	}),
});

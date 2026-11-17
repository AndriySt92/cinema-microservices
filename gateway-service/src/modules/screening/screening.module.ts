import { Global, Module } from '@nestjs/common';

import { ScreeningController } from './screening.controller';
import { ScreeningClientGrpc } from './screening.grpc';

@Global()
@Module({
	controllers: [ScreeningController],
	providers: [ScreeningClientGrpc],
})
export class ScreeningModule {}

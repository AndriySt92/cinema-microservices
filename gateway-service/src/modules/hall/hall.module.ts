import { Global, Module } from '@nestjs/common';

import { HallController } from './hall.controller';
import { HallClientGrpc } from './hall.grpc';

@Global()
@Module({
	controllers: [HallController],
	providers: [HallClientGrpc],
})
export class HallModule {}

import { Global, Module } from '@nestjs/common';

import { SeatController } from './seat.controller';
import { SeatClientGrpc } from './seat.grpc';

@Global()
@Module({
	controllers: [SeatController],
	providers: [SeatClientGrpc],
})
export class SeatModule {}

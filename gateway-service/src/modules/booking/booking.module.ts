import { Global, Module } from '@nestjs/common';

import { BookingController } from './booking.controller';
import { BookingClientGrpc } from './booking.grpc';

@Global()
@Module({
	controllers: [BookingController],
	providers: [BookingClientGrpc],
	exports: [BookingClientGrpc],
})
export class BookingModule {}

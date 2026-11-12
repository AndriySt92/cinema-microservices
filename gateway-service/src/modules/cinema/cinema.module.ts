import { Global, Module } from '@nestjs/common';

import { CinemaController } from './cinema.controller';
import { CinemaClientGrpc } from './cinema.grpc';

@Global()
@Module({
	controllers: [CinemaController],
	providers: [CinemaClientGrpc],
})
export class CinemaModule {}

import { Global, Module } from '@nestjs/common';

import { MovieController } from './movie.controller';
import { MovieClientGrpc } from './movie.grpc';

@Global()
@Module({
	controllers: [MovieController],
	providers: [MovieClientGrpc],
})
export class MovieModule {}

import { Global, Module } from '@nestjs/common';

import { MediaClientGrpc } from './media.grpc';

@Global()
@Module({
	providers: [MediaClientGrpc],
	exports: [MediaClientGrpc],
})
export class MediaModule {}

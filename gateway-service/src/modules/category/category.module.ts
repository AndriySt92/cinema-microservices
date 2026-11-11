import { Global, Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryClientGrpc } from './category.grpc';

@Global()
@Module({
	controllers: [CategoryController],
	providers: [CategoryClientGrpc],
})
export class CategoryModule {}

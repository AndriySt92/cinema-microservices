import { Global, Module } from '@nestjs/common';

import { AccountController } from './account.controller';
import { AccountClientGrpc } from './account.grpc';

@Global()
@Module({
	controllers: [AccountController],
	providers: [AccountClientGrpc],
	exports: [AccountClientGrpc],
})
export class AccountModule {}

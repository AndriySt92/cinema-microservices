import { Module } from '@nestjs/common';

import { MediaModule } from '../media/media.module';

import { UsersController } from './users.controller';
import { UsersClientGrpc } from './users.grpc';

@Module({
	imports: [MediaModule],
	controllers: [UsersController],
	providers: [UsersClientGrpc],
})
export class UsersModule {}

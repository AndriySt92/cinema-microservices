import type {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse,
	UpdateUserRequest,
	UpdateUserResponse,
	UsersServiceClient,
} from '@cinema-microservices-nest/contracts/gen/users';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GrpcClientBase } from 'src/shared/grpc';

@Injectable()
export class UsersClientGrpc extends GrpcClientBase<UsersServiceClient> {
	public constructor(@Inject('USERS_PACKAGE') client: ClientGrpc) {
		super(client, 'UsersService');
	}

	public getMe(request: GetMeRequest): Promise<GetMeResponse> {
		return lastValueFrom(this.service.getMe(request));
	}

	public createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
		return lastValueFrom(this.service.createUser(request));
	}

	public updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
		return lastValueFrom(this.service.updateUser(request));
	}
}

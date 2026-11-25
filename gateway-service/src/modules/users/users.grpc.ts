import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
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

@Injectable()
export class UsersClientGrpc extends GrpcClientBase<UsersServiceClient> {
	public constructor(@Inject(GRPC_CLIENT_TOKENS.USERS) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.USERS);
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

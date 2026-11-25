import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	AccountServiceClient,
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	GetAccountRequest,
	GetAccountResponse,
	InitEmailChangeRequest,
	InitPhoneChangeRequest,
} from '@cinema-microservices-nest/contracts/gen/account';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AccountClientGrpc extends GrpcClientBase<AccountServiceClient> {
	public constructor(@Inject(GRPC_CLIENT_TOKENS.ACCOUNT) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.ACCOUNT);
	}

	public getAccount(request: GetAccountRequest): Promise<GetAccountResponse> {
		return lastValueFrom(this.service.getAccount(request));
	}

	public initEmailChange(request: InitEmailChangeRequest) {
		return this.service.initEmailChange(request);
	}

	public confirmEmailChange(request: ConfirmEmailChangeRequest) {
		return this.service.confirmEmailChange(request);
	}

	public initPhoneChange(request: InitPhoneChangeRequest) {
		return this.service.initPhoneChange(request);
	}

	public confirmPhoneChange(request: ConfirmPhoneChangeRequest) {
		return this.service.confirmPhoneChange(request);
	}
}

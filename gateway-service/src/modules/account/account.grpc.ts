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
import { GrpcClientBase } from 'src/shared/grpc';

@Injectable()
export class AccountClientGrpc extends GrpcClientBase<AccountServiceClient> {
	public constructor(@Inject('ACCOUNT_PACKAGE') client: ClientGrpc) {
		super(client, 'AccountService');
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

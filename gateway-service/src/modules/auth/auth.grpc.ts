import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	AuthServiceClient,
	RefreshRequest,
	SendOtpRequest,
	VerifyOtpRequest,
} from '@cinema-microservices-nest/contracts/gen/auth';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthClientGrpc extends GrpcClientBase<AuthServiceClient> {
	public constructor(@Inject(GRPC_CLIENT_TOKENS.AUTH) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.AUTH);
	}

	public sendOtp(request: SendOtpRequest) {
		return this.service.sendOtp(request);
	}

	public verifyOtp(request: VerifyOtpRequest) {
		return this.service.verifyOtp(request);
	}

	public refresh(request: RefreshRequest) {
		return this.service.refresh(request);
	}
}

import type {
	AuthServiceClient,
	RefreshRequest,
	SendOtpRequest,
	VerifyOtpRequest,
} from '@cinema-microservices-nest/contracts/gen/auth';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { GrpcClientBase } from 'src/shared/grpc';

@Injectable()
export class AuthClientGrpc extends GrpcClientBase<AuthServiceClient> {
	public constructor(@Inject('AUTH_PACKAGE') client: ClientGrpc) {
		super(client, 'AuthService');
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

import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	CinemaServiceClient,
	CreateCinemaResponse,
	GetCinemaRequest,
	GetCinemaResponse,
	ListCinemasResponse,
} from '@cinema-microservices-nest/contracts/gen/cinema';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateCinemaRequest } from './dto';

@Injectable()
export class CinemaClientGrpc extends GrpcClientBase<CinemaServiceClient> {
	public constructor(@Inject(GRPC_CLIENT_TOKENS.CINEMA) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.CINEMA);
	}

	public getCinema(request: GetCinemaRequest): Promise<GetCinemaResponse> {
		return lastValueFrom(this.service.getCinema(request));
	}

	public listCinemas(): Promise<ListCinemasResponse> {
		return lastValueFrom(this.service.listCinemas({}));
	}

	public createCinema(
		request: CreateCinemaRequest,
	): Promise<CreateCinemaResponse> {
		return lastValueFrom(this.service.createCinema(request));
	}
}

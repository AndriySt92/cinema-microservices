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
import { GrpcClientBase } from 'src/shared/grpc';

import { CreateCinemaRequest } from './dto';

@Injectable()
export class CinemaClientGrpc extends GrpcClientBase<CinemaServiceClient> {
	public constructor(@Inject('CINEMA_PACKAGE') client: ClientGrpc) {
		super(client, 'CinemaService');
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

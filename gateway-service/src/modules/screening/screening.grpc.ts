import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	CreateScreeningResponse,
	GetScreeningRequest,
	GetScreeningResponse,
	GetScreeningsByMovieRequest,
	GetScreeningsByMovieResponse,
	GetScreeningsResponse,
	ScreeningServiceClient,
} from '@cinema-microservices-nest/contracts/gen/screening';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateScreeningRequest, GetScreeningsRequest } from './dto';

@Injectable()
export class ScreeningClientGrpc extends GrpcClientBase<ScreeningServiceClient> {
	public constructor(
		@Inject(GRPC_CLIENT_TOKENS.SCREENING) client: ClientGrpc,
	) {
		super(client, GRPC_SERVICE_NAMES.SCREENING);
	}

	public createScreening(
		request: CreateScreeningRequest,
	): Promise<CreateScreeningResponse> {
		return lastValueFrom(this.service.createScreening(request));
	}

	public listScreenings(
		request: GetScreeningsRequest,
	): Promise<GetScreeningsResponse> {
		return lastValueFrom(this.service.getScreenings(request));
	}

	public getScreeningsByMovie(
		request: GetScreeningsByMovieRequest,
	): Promise<GetScreeningsByMovieResponse> {
		return lastValueFrom(this.service.getScreeningsByMovie(request));
	}

	public getScreening(
		request: GetScreeningRequest,
	): Promise<GetScreeningResponse> {
		return lastValueFrom(this.service.getScreening(request));
	}
}

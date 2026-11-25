import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	CreateHallResponse,
	GetHallRequest,
	GetHallResponse,
	HallServiceClient,
	ListHallsRequest,
	ListHallsResponse,
} from '@cinema-microservices-nest/contracts/gen/hall';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateHallRequest } from './dto';

@Injectable()
export class HallClientGrpc extends GrpcClientBase<HallServiceClient> {
	public constructor(@Inject(GRPC_CLIENT_TOKENS.HALL) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.HALL);
	}

	public getHall(request: GetHallRequest): Promise<GetHallResponse> {
		return lastValueFrom(this.service.getHall(request));
	}

	public listHalls(request: ListHallsRequest): Promise<ListHallsResponse> {
		return lastValueFrom(this.service.listHallsByTheater(request));
	}

	public createHall(request: CreateHallRequest): Promise<CreateHallResponse> {
		return lastValueFrom(this.service.createHall(request));
	}
}

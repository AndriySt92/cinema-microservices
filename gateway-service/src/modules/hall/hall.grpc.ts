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
import { GrpcClientBase } from 'src/shared/grpc';

import { CreateHallRequest } from './dto';

@Injectable()
export class HallClientGrpc extends GrpcClientBase<HallServiceClient> {
	public constructor(@Inject('HALL_PACKAGE') client: ClientGrpc) {
		super(client, 'HallService');
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

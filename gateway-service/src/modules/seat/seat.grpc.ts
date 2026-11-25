import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	GetSeatRequest,
	GetSeatResponse,
	ListSeatsRequest,
	ListSeatsResponse,
	SeatServiceClient,
} from '@cinema-microservices-nest/contracts/gen/seat';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SeatClientGrpc extends GrpcClientBase<SeatServiceClient> {
	public constructor(@Inject(GRPC_CLIENT_TOKENS.SEAT) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.SEAT);
	}

	public getSeat(request: GetSeatRequest): Promise<GetSeatResponse> {
		return lastValueFrom(this.service.getSeat(request));
	}

	public listSeats(request: ListSeatsRequest): Promise<ListSeatsResponse> {
		return lastValueFrom(this.service.listSeatsByHall(request));
	}
}

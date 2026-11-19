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
import { GrpcClientBase } from 'src/shared/grpc';

@Injectable()
export class SeatClientGrpc extends GrpcClientBase<SeatServiceClient> {
	public constructor(@Inject('SEAT_PACKAGE') client: ClientGrpc) {
		super(client, 'SeatService');
	}

	public getSeat(request: GetSeatRequest): Promise<GetSeatResponse> {
		return lastValueFrom(this.service.getSeat(request));
	}

	public listSeats(request: ListSeatsRequest): Promise<ListSeatsResponse> {
		return lastValueFrom(this.service.listSeatsByHall(request));
	}
}

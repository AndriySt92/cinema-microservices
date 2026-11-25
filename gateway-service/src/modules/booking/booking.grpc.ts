import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	BookingServiceClient,
	GetUserBookingsRequest,
	GetUserBookingsResponse,
} from '@cinema-microservices-nest/contracts/gen/booking';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookingClientGrpc extends GrpcClientBase<BookingServiceClient> {
	constructor(@Inject(GRPC_CLIENT_TOKENS.BOOKING) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.BOOKING);
	}

	public getUserBookings(
		request: GetUserBookingsRequest,
	): Promise<GetUserBookingsResponse> {
		return lastValueFrom(this.service.getUserBookings(request));
	}
}

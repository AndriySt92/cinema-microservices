import { GrpcClientBase } from '@cinema-microservices-nest/common';
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
	constructor(@Inject('BOOKING_PACKAGE') client: ClientGrpc) {
		super(client, 'BookingService');
	}

	public getUserBookings(
		request: GetUserBookingsRequest,
	): Promise<GetUserBookingsResponse> {
		return lastValueFrom(this.service.getUserBookings(request));
	}
}

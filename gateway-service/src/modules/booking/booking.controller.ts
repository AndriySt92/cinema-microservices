import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser, Protected } from 'src/shared/decorators';

import { BookingClientGrpc } from './booking.grpc';

@Controller('bookings')
export class BookingController {
	public constructor(private readonly booking: BookingClientGrpc) {}

	@ApiOperation({
		summary: 'Get user bookings',
		description:
			'Retrieves all bookings for the authenticated user, including movie, cinema, hall, seats.',
	})
	@ApiBearerAuth()
	@Protected()
	@Get()
	@HttpCode(HttpStatus.OK)
	public async getUserBookings(@CurrentUser() userId: string) {
		const response = await this.booking.getUserBookings({
			userId,
		});

		return Array.isArray(response.bookings) ? response.bookings : [];
	}
}

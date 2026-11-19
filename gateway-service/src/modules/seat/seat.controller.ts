import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SeatClientGrpc } from './seat.grpc';

@Controller('seats')
export class SeatController {
	public constructor(private readonly seat: SeatClientGrpc) {}

	@ApiOperation({
		summary: 'Get seat by hall and screening',
		description: 'Retrieves the details of a specific hall by its ID.',
	})
	@Get(':hall_id/:screening_id')
	@HttpCode(HttpStatus.OK)
	public async listsByHall(
		@Param('hall_id') hallId: string,
		@Param('screening_id') screeningId: string,
	) {
		const response = await this.seat.listSeats({
			hallId,
			screeningId,
		});

		return Array.isArray(response.seats) ? response.seats : [];
	}
}

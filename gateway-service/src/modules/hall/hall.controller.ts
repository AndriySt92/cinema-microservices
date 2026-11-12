import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateHallRequest } from './dto';
import { HallClientGrpc } from './hall.grpc';

@Controller('halls')
export class HallController {
	public constructor(private readonly hall: HallClientGrpc) {}

	@ApiOperation({
		summary: 'Get a hall by ID',
		description: 'Retrieves the details of a specific hall by its ID.',
	})
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') id: string) {
		const { hall } = await this.hall.getHall({ id });

		return hall;
	}

	@ApiOperation({
		summary: 'Create a new hall',
		description: 'Creates a new hall with the provided details.',
	})
	// @Protected(Role.ADMIN)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateHallRequest) {
		return await this.hall.createHall(dto);
	}
}

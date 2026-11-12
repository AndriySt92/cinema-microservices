import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CinemaClientGrpc } from './cinema.grpc';
import { CreateCinemaRequest } from './dto';

@Controller('cinemas')
export class CinemaController {
	public constructor(private readonly cinema: CinemaClientGrpc) {}

	@ApiOperation({
		summary: 'Get all cinemas',
		description: 'Retrieves a list of all available cinemas.',
	})
	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll() {
		const response = await this.cinema.listCinemas();

		return Array.isArray(response.cinemas) ? response.cinemas : [];
	}

	@ApiOperation({
		summary: 'Create a cinema',
		description: 'Creates a new cinema with the provided information.',
	})
	// @Protected(Role.ADMIN)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateCinemaRequest) {
		return await this.cinema.createCinema(dto);
	}
}

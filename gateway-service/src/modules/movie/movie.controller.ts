import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { TimestampMapper } from 'src/shared/mappers';

import { GetMoviesRequest } from './dto';
import { MovieClientGrpc } from './movie.grpc';

@Controller('movies')
export class MovieController {
	public constructor(private readonly movie: MovieClientGrpc) {}

	@ApiOperation({
		summary: 'Get all movies',
		description:
			'Retrieves a list of movies with optional filtering by category, random ordering, and result limit.',
	})
	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(@Query() dto: GetMoviesRequest) {
		const response = await this.movie.listMovies(dto);

		return (response.movies ?? []).map(movie => ({
			...movie,
			releaseDate: TimestampMapper.toISOString(movie.releaseDate),
		}));
	}

	@ApiOperation({
		summary: 'Get movie by slug',
		description:
			'Retrieves detailed information about a movie identified by its unique slug.',
	})
	@Get(':slug')
	@HttpCode(HttpStatus.OK)
	public async getBySlug(@Param('slug') slug: string) {
		const response = await this.movie.getMovie({ slug });

		if (!response.movie) {
			return null;
		}

		const movie = response.movie;

		return {
			...movie,
			releaseDate: TimestampMapper.toISOString(movie.releaseDate),
		};
	}
}

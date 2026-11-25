import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	GetMovieRequest,
	GetMovieResponse,
	ListMoviesRequest,
	ListMoviesResponse,
	MovieServiceClient,
} from '@cinema-microservices-nest/contracts/gen/movie';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MovieClientGrpc extends GrpcClientBase<MovieServiceClient> {
	public constructor(@Inject(GRPC_CLIENT_TOKENS.MOVIE) client: ClientGrpc) {
		super(client, GRPC_SERVICE_NAMES.MOVIE);
	}

	public getMovie(request: GetMovieRequest): Promise<GetMovieResponse> {
		return lastValueFrom(this.service.getMovie(request));
	}

	public listMovies(request: ListMoviesRequest): Promise<ListMoviesResponse> {
		return lastValueFrom(this.service.listMovies(request));
	}
}

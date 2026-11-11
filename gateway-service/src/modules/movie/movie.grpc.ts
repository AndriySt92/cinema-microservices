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
import { GrpcClientBase } from 'src/shared/grpc';

@Injectable()
export class MovieClientGrpc extends GrpcClientBase<MovieServiceClient> {
	public constructor(@Inject('MOVIE_PACKAGE') client: ClientGrpc) {
		super(client, 'MovieService');
	}

	public getMovie(request: GetMovieRequest): Promise<GetMovieResponse> {
		return lastValueFrom(this.service.getMovie(request));
	}

	public listMovies(request: ListMoviesRequest): Promise<ListMoviesResponse> {
		return lastValueFrom(this.service.listMovies(request));
	}
}

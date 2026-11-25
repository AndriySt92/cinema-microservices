import {
	GRPC_CLIENT_TOKENS,
	GRPC_SERVICE_NAMES,
	GrpcClientBase,
} from '@cinema-microservices-nest/common';
import type {
	CategoryServiceClient,
	GetAllCategoriesResponse,
} from '@cinema-microservices-nest/contracts/gen/category';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CategoryClientGrpc extends GrpcClientBase<CategoryServiceClient> {
	public constructor(
		@Inject(GRPC_CLIENT_TOKENS.CATEGORY) client: ClientGrpc,
	) {
		super(client, GRPC_SERVICE_NAMES.CATEGORY);
	}

	public getAllCategories(): Promise<GetAllCategoriesResponse> {
		return lastValueFrom(this.service.getAllCategories({}));
	}
}

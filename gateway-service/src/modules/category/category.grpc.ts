import type {
	CategoryServiceClient,
	GetAllCategoriesResponse,
} from '@cinema-microservices-nest/contracts/gen/category';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GrpcClientBase } from 'src/shared/grpc';

@Injectable()
export class CategoryClientGrpc extends GrpcClientBase<CategoryServiceClient> {
	public constructor(@Inject('CATEGORY_PACKAGE') client: ClientGrpc) {
		super(client, 'CategoryService');
	}

	public getAllCategories(): Promise<GetAllCategoriesResponse> {
		return lastValueFrom(this.service.getAllCategories({}));
	}
}

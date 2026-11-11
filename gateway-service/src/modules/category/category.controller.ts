import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CategoryClientGrpc } from './category.grpc';

@Controller('categories')
export class CategoryController {
	public constructor(private readonly category: CategoryClientGrpc) {}

	@ApiOperation({
		summary: 'Get all categories',
		description: 'Retrieves a list of all available movie categories.',
	})
	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll() {
		const response = await this.category.getAllCategories();

		return Array.isArray(response.categories) ? response.categories : [];
	}
}

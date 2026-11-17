import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class GetScreeningsRequest {
	@ApiPropertyOptional({
		example: '81lI6j9Ctva6e7oCPpelc',
	})
	@IsOptional()
	@IsString()
	public cinemaId?: string;

	@ApiPropertyOptional({
		example: '2026-12-20T16:00:00.000Z',
	})
	@IsOptional()
	@IsISO8601()
	public date!: string;
}

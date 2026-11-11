import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsInt,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';

export class GetMoviesRequest {
	@ApiPropertyOptional({
		example: 'classic',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }: { value: string }) => value.toString().trim())
	public category!: string;

	@ApiPropertyOptional({
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	@Transform(({ value }: { value: string | boolean }) => {
		if (value === 'true') return true;
		if (value === 'false') return false;

		return value;
	})
	public random!: boolean;

	@ApiPropertyOptional({
		example: 6,
	})
	@IsInt()
	@IsOptional()
	@Min(1)
	@Max(100)
	@Transform(({ value }: { value: string }) =>
		value !== undefined ? Number(value) : undefined,
	)
	public limit!: number;
}

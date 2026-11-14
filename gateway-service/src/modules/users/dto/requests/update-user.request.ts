import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserRequest {
	@ApiPropertyOptional({ example: 'Jane Doe', maxLength: 120 })
	@IsOptional()
	@IsString()
	@MaxLength(120)
	public name?: string;

	@ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
	@IsOptional()
	@IsString()
	public avatar?: string;
}

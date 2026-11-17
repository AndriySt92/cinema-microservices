import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateScreeningRequest {
	@ApiProperty({
		example: '672a1b2c3d4e5f6789012345',
		description: 'ID of the movie',
	})
	@IsNotEmpty()
	@IsString()
	public movieId!: string;

	@ApiProperty({
		example: '672a1b2c3d4e5f6789012346',
		description: 'ID of the hall',
	})
	@IsNotEmpty()
	@IsString()
	public hallId!: string;

	@ApiProperty({
		example: '2026-12-20T14:00:00.000Z',
		description: 'Screening start date and time in ISO 8601 format',
	})
	@IsNotEmpty()
	@IsDateString()
	public startAt!: string;

	@ApiProperty({
		example: '2026-12-20T16:00:00.000Z',
		description: 'Screening end date and time in ISO 8601 format',
	})
	@IsNotEmpty()
	@IsDateString()
	public endAt!: string;
}

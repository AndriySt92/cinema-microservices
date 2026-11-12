import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaRequest {
	@ApiProperty({
		example: 'Hollywood Cinema',
	})
	@IsString()
	@IsNotEmpty()
	public name!: string;

	@ApiProperty({
		example: '123 Main St',
	})
	@IsString()
	@IsNotEmpty()
	public address!: string;
}

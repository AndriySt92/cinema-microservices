import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class InitEmailChangeRequest {
	@ApiProperty({
		example: 'example@gmail.com',
	})
	@IsNotEmpty()
	@IsEmail()
	public email!: string;
}

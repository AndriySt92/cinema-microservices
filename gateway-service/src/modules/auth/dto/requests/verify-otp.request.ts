import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
	IsEnum,
	IsNumberString,
	IsString,
	Length,
	Validate,
} from 'class-validator';
import { IdentifierValidator } from 'src/shared/validators';

export class VerifyOtpRequest {
	@ApiProperty({
		example: '+380951234567',
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier!: string;

	@ApiProperty({
		example: '123456',
	})
	@Transform(({ value }: { value: unknown }) =>
		typeof value === 'string' ? value.trim() : value,
	)
	@IsString()
	@IsNumberString()
	@Length(6, 6)
	code!: string;

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email'],
	})
	@IsEnum(['phone', 'email'])
	public type!: 'phone' | 'email';
}

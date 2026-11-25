import {
	BadRequestException,
	Body,
	Controller,
	FileTypeValidator,
	Get,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	ParseFilePipe,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
} from '@nestjs/swagger';
import { randomBytes } from 'crypto';

import { CurrentUser, Protected } from '@/shared/decorators';

import { MediaClientGrpc } from '../media/media.grpc';

import { UpdateUserRequest } from './dto';
import { UsersClientGrpc } from './users.grpc';

@Controller('users')
export class UsersController {
	public constructor(
		private readonly users: UsersClientGrpc,
		private readonly media: MediaClientGrpc,
	) {}

	@ApiOperation({
		summary: 'Get current user',
		description: 'Returns the profile for the authenticated user.',
	})
	@ApiBearerAuth()
	@Protected()
	@Get('me')
	@HttpCode(HttpStatus.OK)
	public getMe(@CurrentUser() userId: string) {
		return this.users.getMe({ id: userId });
	}

	@ApiOperation({
		summary: 'Create current user',
		description: 'Creates a profile for the authenticated user.',
	})
	@ApiBearerAuth()
	@Protected()
	@Post()
	@HttpCode(HttpStatus.OK)
	public createUser(@CurrentUser() userId: string) {
		return this.users.createUser({ id: userId });
	}

	@ApiOperation({
		summary: 'Update current user',
		description: 'Updates the authenticated user profile.',
	})
	@ApiBearerAuth()
	@Protected()
	@Patch('me')
	@HttpCode(HttpStatus.OK)
	public updateUser(
		@Body() dto: UpdateUserRequest,
		@CurrentUser() userId: string,
	) {
		return this.users.updateUser({ ...dto, userId });
	}

	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Image file to upload',
		schema: {
			type: 'object',
			properties: {
				file: { type: 'string', format: 'binary' },
			},
		},
	})
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor('file'))
	@Protected()
	@Patch('me/avatar')
	@HttpCode(HttpStatus.OK)
	public async changeAvatar(
		@CurrentUser() userId: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 10 * 1024 * 1024,
						message: 'Размер файла не должен превышать 10MB',
					}),
					new FileTypeValidator({
						fileType: /(jpg|jpeg|png|webp|gif)$/i,
					}),
				],
				exceptionFactory(error) {
					if (error.includes('File is too large'))
						throw new BadRequestException(
							'Размер файла не должен превышать 10MB',
						);
					if (error.includes('Invalid file type'))
						throw new BadRequestException(
							'Разрешены только изображения форматов: JPG, PNG, WEBP, GIF',
						);
					throw new BadRequestException('Некорректный файл');
				},
			}),
		)
		file: Express.Multer.File,
	) {
		const response = await this.media.upload({
			fileName: randomBytes(16).toString('hex'),
			folder: 'users',
			contentType: file.mimetype,
			data: new Uint8Array(file.buffer),
			resizeWidth: 512,
			resizeHeight: 512,
		});

		return this.users.updateUser({ userId, avatar: response.key });
	}
}

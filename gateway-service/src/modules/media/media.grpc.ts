import type {
	DeleteRequest,
	DeleteResponse,
	GetRequest,
	GetResponse,
	MediaServiceClient,
	UploadRequest,
	UploadResponse,
} from '@cinema-microservices-nest/contracts/gen/media';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GrpcClientBase } from 'src/shared/grpc';

@Injectable()
export class MediaClientGrpc extends GrpcClientBase<MediaServiceClient> {
	public constructor(@Inject('MEDIA_PACKAGE') client: ClientGrpc) {
		super(client, 'MediaService');
	}

	public get(request: GetRequest): Promise<GetResponse> {
		return lastValueFrom(this.service.get(request));
	}

	public upload(request: UploadRequest): Promise<UploadResponse> {
		return lastValueFrom(this.service.upload(request));
	}

	public delete(request: DeleteRequest): Promise<DeleteResponse> {
		return lastValueFrom(this.service.delete(request));
	}
}

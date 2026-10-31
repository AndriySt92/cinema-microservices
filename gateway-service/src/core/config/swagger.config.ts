import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Cinema API')
		.setDescription('API for getaway service')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('/docs', app, swaggerDocument, {
		yamlDocumentUrl: '/openapi.yaml',
	});
}

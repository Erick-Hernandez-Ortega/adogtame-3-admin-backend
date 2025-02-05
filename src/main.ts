import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle('API Adogtame')
    .setDescription('Documentación de la API de administrador de Adogtame')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

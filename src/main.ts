import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as hbs from 'hbs';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('App');
  const config = new DocumentBuilder()
    .setTitle('Portofolio')
    .setDescription('Portofolio API')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'main' });

  const configService = app.get(ConfigService);
  const serviceAccount = {
    "type": configService.get<string>('type'),
    "project_id": configService.get<string>('project_id'),
    "private_key_id": configService.get<string>('private_key_id'),
    "private_key": configService.get<string>('private_key'),
    "client_email": configService.get<string>('client_email'),
    "client_id": configService.get<string>('client_id'),
    "auth_uri": configService.get<string>('auth_uri'),
    "token_uri": configService.get<string>('token_uri'),
    "auth_provider_x509_cert_url": configService.get<string>('auth_provider_x509_cert_url'),
    "client_x509_cert_url": configService.get<string>('client_x509_cert_url')
  } as ServiceAccount
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  await app.listen(process.env.PORT || 3000);
  logger.log('Application started on port 3000');
  
}
bootstrap();
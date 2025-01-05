import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  console.log("init")
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('오누의 스웨거')
    .setDescription('welcome to onueo swagger')
    .setVersion('1.0')
    // .addTag('pic')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

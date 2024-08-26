import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://user-one-phi.vercel.app', 'http://localhost:3000'], // Add your allowed URLs here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    credentials: true, // Include credentials like cookies in CORS requests
  });

  const port = process.env.PORT || 3333;

  await app.listen(port);
}
bootstrap();

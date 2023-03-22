import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    PrismaModule,
    ExperiencesModule, 
    AuthModule, 
    ConfigModule.forRoot({isGlobal: true,}), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

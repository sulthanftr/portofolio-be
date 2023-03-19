import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseService } from './firebase/firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ExperiencesModule, AuthModule, ConfigModule.forRoot(), ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}

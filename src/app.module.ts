import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExperiencesModule } from './experiences/experiences.module';

@Module({
  imports: [PrismaModule, ExperiencesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

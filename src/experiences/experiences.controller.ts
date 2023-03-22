import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExperienceEntity } from './entities/experience.entity';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';

@Controller('experiences')
@ApiTags('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiCreatedResponse({ type: ExperienceEntity })
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experiencesService.create(createExperienceDto);
  }

  @Get()
  @ApiOkResponse({ type: ExperienceEntity, isArray: true })
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({ type: ExperienceEntity })
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({ type: ExperienceEntity })
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experiencesService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({ type: ExperienceEntity })
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(+id);
  }
}

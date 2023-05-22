import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiCreatedResponse({ type: ProjectEntity })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOkResponse({ type: ProjectEntity, isArray: true })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({ type: ProjectEntity })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({ type: ProjectEntity })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({ type: ProjectEntity })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}

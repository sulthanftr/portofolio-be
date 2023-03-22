import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {
  }

  create(createExperienceDto: CreateExperienceDto) {
    return this.prisma.experience.create({ data: createExperienceDto });
  }

  findAll() {
    return this.prisma.experience.findMany();
  }

  findOne(id: number) {
    return this.prisma.experience.findUnique({ where: { id } });
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return this.prisma.experience.update({
      where: { id },
      data: updateExperienceDto,
    });
  }

  remove(id: number) {
    return this.prisma.experience.delete({ where: { id } });
  }
}

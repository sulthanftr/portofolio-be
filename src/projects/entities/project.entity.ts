import { Project } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectEntity implements Project {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url: string;
}

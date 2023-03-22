import { Experience } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ExperienceEntity implements Experience {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  startedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  endedAt: Date | null;
}
 
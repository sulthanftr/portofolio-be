import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: true, default: new Date()})
  startedAt: Date;

  @ApiProperty({ required: false })
  endedAt: Date;
}

import { IsArray, IsEnum, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ExperienceLevel } from './generate-questions.dto';

export class QAItemDto {
  @IsString()
  question!: string;

  @IsString()
  answer!: string;
}

export class ReviewBatchDto {
  @IsString()
  role!: string;

  @IsString()
  topic!: string;

  @IsEnum(ExperienceLevel)
  experienceLevel!: ExperienceLevel;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QAItemDto)
  items!: QAItemDto[];
} 
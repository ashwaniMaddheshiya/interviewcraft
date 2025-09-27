import { IsEnum, IsString } from 'class-validator';

export enum ExperienceLevel {
  Fresher = 'fresher',
  Junior = 'junior',
  Mid = 'mid',
  Senior = 'senior',
}

export class GenerateQuestionsDto {
  @IsString()
  role!: string; // e.g., Frontend Developer, Backend Developer

  @IsString()
  topic!: string; // e.g., React, Next.js, JavaScript

  @IsEnum(ExperienceLevel)
  experienceLevel!: ExperienceLevel;
} 
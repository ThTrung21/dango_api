import { IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  name: string;
}

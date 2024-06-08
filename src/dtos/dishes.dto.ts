import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, isArray, ArrayMinSize, IsInt, Min } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString({ each: true })
  public images: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(0, { each: true })
  public productid: number[];
}

export class UpdateDishDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public images: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(0, { each: true })
  public productid: number[];
}

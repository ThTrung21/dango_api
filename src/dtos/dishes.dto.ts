import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, isArray, ArrayMinSize, IsInt, Min, isString, isNumber } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public category: string;
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  public score: number;

  @IsString({ each: true })
  public images: string[];

  @IsString({ each: true })
  public productid: string[];
}

export class UpdateDishDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  public category: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public images: string[];

  @IsString({ each: true })
  public productid: string[];
  @IsNumber()
  public score: number;
}
export class UpdateLikeDto {
  @IsNumber()
  public score: number;
}

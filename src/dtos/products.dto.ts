import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsNumber()
  @IsNotEmpty()
  public importPrice: number;

  @IsString()
  @IsNotEmpty()
  public brandName: string;

  @IsNotEmpty()
  @IsNumber()
  public categoryId?: number;

  @IsNumber()
  @IsOptional()
  public sold: number;

  @IsString({ each: true })
  public images: string[];

  @IsNumber()
  public stock: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsOptional()
  public price: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public brandName: string;

  @IsNumber()
  @IsOptional()
  public categoryId?: number;

  @IsNumber()
  @IsOptional()
  public sold: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public images: string[];

  @IsNumber()
  public stock: number;
}

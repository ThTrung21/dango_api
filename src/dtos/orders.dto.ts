import { OrderStatus } from '@/interfaces/orders.interface';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ProductItem {
  @IsNumber()
  public productId: number;

  @IsNumber()
  public quantity: number;
}

export class CreateOrderDto {
  @IsString()
  public orderAddress?: string;

  @IsString()
  public orderName?: string;

  @IsString()
  public orderPhone?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  public status?: OrderStatus;

  @ValidateNested()
  @Type(() => ProductItem)
  public products: ProductItem[];
}

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  public orderAddress?: string;

  @IsString()
  @IsOptional()
  public orderName?: string;

  @IsString()
  @IsOptional()
  public orderPhone?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  public status?: OrderStatus;
}

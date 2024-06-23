//import { Role } from '@/interfaces/auth.interface';
import { Role } from '@/interfaces/users.interface';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEnum,
  isArray,
  IsArray,
  isString,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  public email: string;

  @IsOptional()
  @IsString({ each: true })
  public likeddish: string[];

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  public fullname: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  public phone: string;

  @IsDateString()
  @IsOptional()
  public dob: Date;

  @IsOptional()
  @IsEnum(Role)
  public role?: Role;

  @IsString()
  @IsOptional()
  public address: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  public oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public newPassword: string;
}

export class UpdateUserDto {
  @IsString()
  @MaxLength(45)
  @IsOptional()
  public fullname?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public dob?: Date;

  @IsString()
  @IsOptional()
  public avatar?: string;

  @IsString()
  @IsOptional()
  public address: string;

  @IsString({ each: true })
  public likeddish: string[];
}

export class UpdateUserLikeDto {
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  public likeddish: string[];
}

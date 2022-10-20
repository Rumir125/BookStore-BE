import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
export class BookRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  public title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public author: string;

  @IsNumber()
  public year: number;

  @IsArray()
  public genres: string;

  @IsOptional()
  @MaxLength(500)
  public description: string;

  @IsOptional()
  @MaxLength(200)
  public photoUrl: string;
}

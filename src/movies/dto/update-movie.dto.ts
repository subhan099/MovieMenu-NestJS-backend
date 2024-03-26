import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

// export class UpdateMovieDto extends PartialType(CreateMovieDto) {}


@Exclude()
export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @Expose()
  name: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  year: string;

}
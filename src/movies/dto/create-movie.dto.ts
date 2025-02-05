import { IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    name:string;

    @IsString()
    year: number;
}

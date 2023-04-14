import { IsNumber, IsString } from 'class-validator';

export class TestDto {
    
  @IsString()
  email: string;

  @IsNumber()
  password: string;

}

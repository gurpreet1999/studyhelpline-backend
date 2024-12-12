import { IsString, IsNotEmpty, IsEmail, IsArray } from 'class-validator';

export class StudentQueryDto {
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    class: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    preferredTime: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    preferredDay: string[];
}



export class studentChatboxQueryDto{
    

@IsString()
query:string


}
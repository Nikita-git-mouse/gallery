import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateUserInput {
    @ApiProperty({example: 'user@mail.com', description: 'Email'})
    @IsString({ message: 'idi nahui' })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
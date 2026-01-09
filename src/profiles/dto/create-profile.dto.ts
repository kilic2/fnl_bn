import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, IsArray, IsOptional } from 'class-validator';

export class CreateProfileDto {
    @IsNotEmpty({ message: 'Kullanıcı adı boş ' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'e mail  boş ' })
    @IsEmail({}, { message: 'e mail gecersiz' })
    email: string;

    @IsNotEmpty({ message: 'sifre boş ' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Büyük harf, küçük harf, sayı ve sembol içermeli)',
    })
    password: string;

    @IsNotEmpty({ message: 'sifre tekrarı boş ' })
    rpPassword: string;

    @IsNotEmpty()
    @IsNumber()
    profileTypeId: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    tagIds?: number[];
}
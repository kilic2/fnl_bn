import {  IsNotEmpty,  IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateReviewDto {
    @IsNotEmpty({ message: 'başlık boş ' })
        @IsString()
        title: string;
    
        @IsNotEmpty({ message: 'review  boş ' })
      
        desc: string;
    
     
    
      
        
        @Type(()=> Date)
         
        date: Date = new Date();
        
    

}

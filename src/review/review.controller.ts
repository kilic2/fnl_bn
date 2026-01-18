import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ReviewService } from './review.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')  
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }
  @Post()
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './fotograflar',
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async create(@Body() CreateReviewDto: CreateReviewDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Fotoğraf yüklenmedi');
    }
    const photoUrl = `https://api.donanim.evdekom.com.tr/fotograflar/${file.filename}`;
    return await this.reviewService.create(CreateReviewDto, photoUrl);
  }
    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
}
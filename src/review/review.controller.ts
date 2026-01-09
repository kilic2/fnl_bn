import { Controller, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')  // <-- 'reviews' değil 'review'
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }
}
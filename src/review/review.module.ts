import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Comment } from 'src/comment/entities/comment.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Review,Comment])],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [TypeOrmModule]
})
export class ReviewModule { }
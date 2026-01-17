import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) { }
       async create(CreateReviewDto: CreateReviewDto, photoUrl: string) {
          
           const newReview = this.reviewRepository.create({
               title: CreateReviewDto.title,
               desc: CreateReviewDto.desc,
               date: CreateReviewDto.date,
               img: photoUrl 
              
             
           });
           const savedReview = await this.reviewRepository.save(newReview);
           return savedReview;
       }
   

    async findAll() {
        return this.reviewRepository.find({
            order: { date: 'DESC' }
        });
    }

    async findOne(id: number) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['comments', 'comments.user', 'comments.user.tags']  
        });

        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        return review;
    }
}
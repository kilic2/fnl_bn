import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) { }

    async findAll() {
        return this.reviewRepository.find({
            order: { date: 'DESC' }
        });
    }

    async findOne(id: number) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['comments', 'comments.user', 'comments.user.tags']  // 'tags' kaldırıldı!
        });

        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        return review;
    }
}
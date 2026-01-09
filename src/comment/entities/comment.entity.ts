import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => Profile, (profile) => profile.comments, { eager: true })
    user: Profile;

    @Column('text')
    content: string;

    @CreateDateColumn()
    date: Date;

    @Column()
    reviewId: number;

    @ManyToOne(() => Review, (review) => review.comments)
    review: Review;
}
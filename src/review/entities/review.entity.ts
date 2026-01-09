import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    desc: string;

    @Column()
    img: string;

    @CreateDateColumn()
    date: Date;

    @OneToMany(() => Comment, (comment) => comment.review)
    comments: Comment[];
}
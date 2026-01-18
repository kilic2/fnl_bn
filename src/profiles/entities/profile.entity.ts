import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileType } from 'src/profile-type/entities/profile-type.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    photo: string;

    @ManyToOne(() => ProfileType, (profileType) => profileType.profiles)
    profileType: ProfileType;

    @Column()
    profileTypeId: number;

    @ManyToMany(() => Tag, (tag) => tag.profiles)
    @JoinTable({
        name: 'profile_tag',
        joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' }
    })
    tags: Tag[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
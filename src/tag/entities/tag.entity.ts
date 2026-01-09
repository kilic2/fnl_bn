import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Profile, (profile) => profile.tags)
    profiles: Profile[];
}
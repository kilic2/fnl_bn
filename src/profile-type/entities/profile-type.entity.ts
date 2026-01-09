


import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
@Entity()
export class ProfileType {
    @PrimaryGeneratedColumn()
    id:number;  
    @Column()
    name:string;

    @OneToMany(() => Profile, (profile) => profile.profileType)
    profiles: Profile[];
}

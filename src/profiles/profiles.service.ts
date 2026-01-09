import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private profileRep: Repository<Profile>
    ) { }

    async create(createProfileDto: CreateProfileDto, photoUrl: string) {
        if (createProfileDto.password != createProfileDto.rpPassword) {
            throw new BadRequestException('şifreler eslesmiyor');
        }
        const newProfile = this.profileRep.create({
            username: createProfileDto.username,
            email: createProfileDto.email,
            password: createProfileDto.password,
            photo: photoUrl,
            profileTypeId: createProfileDto.profileTypeId,
            tags: createProfileDto.tagIds ? createProfileDto.tagIds.map(id => ({ id })) : [],
        });
        const savedProfile = await this.profileRep.save(newProfile);
        return savedProfile;
    }

    findAll() {
        return this.profileRep.find();
    }

    findOne(id: number) {
        return this.profileRep.findOneBy({ id });
    }

    async update(id: number, updateProfileDto: UpdateProfileDto, photo: string) {
        const profile = await this.findOne(id);
        if (!profile) throw new NotFoundException();

        if (updateProfileDto.password && updateProfileDto.password.length > 0) {
            if (updateProfileDto.password !== updateProfileDto.rpPassword) {
                throw new BadRequestException('Yeni şifre ve tekrarı eşleşmiyor!');
            }
            profile.password = updateProfileDto.password;
        }

        if (updateProfileDto.username) {
            profile.username = updateProfileDto.username;
        }

        if (updateProfileDto.email) {
            profile.email = updateProfileDto.email;
        }

        if (updateProfileDto.profileTypeId) {
            profile.profileTypeId = updateProfileDto.profileTypeId;
        }

        if (photo && photo.length > 0) {
            profile.photo = photo;
        }

        return this.profileRep.save(profile);
    }

    async remove(id: number) {
        const profile = await this.findOne(id);
        if (!profile) {
            throw new NotFoundException(`Profile with id ${id} not found`);
        }
        return await this.profileRep.remove(profile);
    }
}
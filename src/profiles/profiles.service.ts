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
        return this.profileRep.find({
            relations: {
                tags: true,
                profileType: true
            }
        });
    }

    findOne(id: number) {
        return this.profileRep.findOne({
            where: { id: id },
            relations: { 
                tags: true,
                profileType: true
            } 
        });
    }

    async update(id: number, updateProfileDto: UpdateProfileDto, photo: string) {
        console.log('🔵 Update called with:', { id, updateProfileDto, photo });
        
        const profile = await this.findOne(id);
        if (!profile) throw new NotFoundException();

        console.log('🟡 Current profile.profileTypeId:', profile.profileTypeId);

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

        console.log('🟢 updateProfileDto.profileTypeId:', updateProfileDto.profileTypeId);
        console.log('🟢 Type:', typeof updateProfileDto.profileTypeId);
        console.log('🟢 Check undefined:', updateProfileDto.profileTypeId !== undefined);
        
        if (updateProfileDto.profileTypeId !== undefined) {
            console.log('✅ Setting profileTypeId to:', updateProfileDto.profileTypeId);
            profile.profileTypeId = updateProfileDto.profileTypeId;
        }

        if (photo && photo.length > 0) {
            profile.photo = photo;
        }

        console.log('🔴 Before save - profile.profileTypeId:', profile.profileTypeId);
        const savedProfile = await this.profileRep.save(profile);
        console.log('🔴 After save - savedProfile.profileTypeId:', savedProfile.profileTypeId);
        
        const result = await this.profileRep.findOne({
            where: { id: savedProfile.id },
            relations: ['profileType', 'tags']
        });
        console.log('🟣 Final result - profileTypeId:', result.profileTypeId);
        
        return result;
    }

    async remove(id: number) {
        const profile = await this.findOne(id);
        if (!profile) {
            throw new NotFoundException(`Profile with id ${id} not found`);
        }
        return await this.profileRep.remove(profile);
    }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './entities/profile-type.entity';
import { CreateProfileTypeDto } from './dto/create-profile-type.dto';
import { UpdateProfileTypeDto } from './dto/update-profile-type.dto';

@Injectable()
export class ProfileTypeService {
  constructor(
    @InjectRepository(ProfileType)
    private profileTypeRepository: Repository<ProfileType>,
  ) {}

  async create(createProfileTypeDto: CreateProfileTypeDto) {
    const newProfileType = this.profileTypeRepository.create(createProfileTypeDto);
    return await this.profileTypeRepository.save(newProfileType);
  }

  findAll() {
    return this.profileTypeRepository.find();
  }

  findOne(id: number) {
    return  this.profileTypeRepository.findOneBy({id});
  }

  async update(id: number, updateProfileTypeDto: UpdateProfileTypeDto) {
    const profileType = await this.findOne(id);
    if (!profileType) {
      throw new NotFoundException(`ProfileType with id ${id} not found`);
    }
    Object.assign(profileType, updateProfileTypeDto);
    return await this.profileTypeRepository.save(profileType);
  }

  async remove(id: number) {
    const profileType = await this.findOne(id);
    if (!profileType) {
      throw new NotFoundException(`ProfileType with id ${id} not found`);
    }
    return await this.profileTypeRepository.remove(profileType);
  }
}

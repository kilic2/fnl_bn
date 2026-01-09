import { Module } from '@nestjs/common';
import { ProfileTypeService } from './profile-type.service';
import { ProfileTypeController } from './profile-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileType } from './entities/profile-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileType]) 
  ],
  controllers: [ProfileTypeController],
  providers: [ProfileTypeService],
})
export class ProfileTypeModule {}

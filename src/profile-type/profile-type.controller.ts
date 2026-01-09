import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileTypeService } from './profile-type.service';
import { CreateProfileTypeDto } from './dto/create-profile-type.dto';
import { UpdateProfileTypeDto } from './dto/update-profile-type.dto';

@Controller('profileTypes')
export class ProfileTypeController {
  constructor(private readonly profileTypeService: ProfileTypeService) {}

  @Post()
  create(@Body() createProfileTypeDto: CreateProfileTypeDto) {
    return ;
  }

  @Get()
  findAll() {
    return this.profileTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return ;
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileTypeDto: UpdateProfileTypeDto) {
    return ;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileTypeService.remove(+id);
  }
}

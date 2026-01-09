// profiles.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './fotograflar',
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async create(@Body() createProfileDto: CreateProfileDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Fotoğraf yüklenmedi');
    }
    const photoUrl = `https://api.donanim.evdekom.com.tr/fotograflar/${file.filename}`;
    return await this.profilesService.create(createProfileDto, photoUrl);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './fotograflar',
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let photoUrl: string = '';

    if (file !== undefined) {
      photoUrl = `http://localhost:3000/fotograflar/${file.filename}`;
    }

    return this.profilesService.update(+id, updateProfileDto, photoUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
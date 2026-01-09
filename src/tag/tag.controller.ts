import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')  // <-- 'tags' değil 'tag'
export class TagController {
    constructor(private readonly tagService: TagService) { }

    @Get()
    findAll() {
        return this.tagService.findAll();
    }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { ProfileTypeModule } from './profile-type/profile-type.module';
import { TagModule } from './tag/tag.module';
import { ReviewModule } from './review/review.module';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'fotograflar'),
            serveRoot: '/fotograflar',
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'odev3.sqlite',
            autoLoadEntities: true,
            synchronize: true,
        }),
        ProfileTypeModule,
        TagModule,
        ReviewModule,      
        ProfilesModule,
        CommentModule      // <-- Comment AFTER Review
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
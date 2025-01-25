import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService, PrismaService],
})
export class HeroesModule {}

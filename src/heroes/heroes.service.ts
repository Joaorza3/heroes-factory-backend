import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from 'src/prisma.service';
import { IHeroesFilters } from 'src/interfaces/heroes-filters.interface';

@Injectable()
export class HeroesService {
  constructor(private prismaService: PrismaService) {}

  create(createHeroDto: CreateHeroDto) {
    return this.prismaService.hero.create({
      data: {
        name: createHeroDto.name,
        nickname: createHeroDto.nickname,
        date_of_birth: createHeroDto.dateOfBirth,
        universe: createHeroDto.universe,
        main_power: createHeroDto.mainPower,
        avatar_url: createHeroDto.avatarUrl,
        is_active: true,
      },
    });
  }

  async findAll({ name, universe, isActive, cursor, skip }: IHeroesFilters) {
    const whereName = name && {
      OR: [
        {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        {
          nickname: {
            contains: name,
            mode: 'insensitive',
          },
        },
      ],
    };

    const whereUniverse = universe
      ? {
          universe: {
            equals: universe,
          },
        }
      : {};

    const whereIsActive = isActive
      ? {
          is_active: {
            equals: isActive,
          },
        }
      : {};

    const query = {
      where: {
        ...whereName,
        ...whereUniverse,
        ...whereIsActive,
      },
      cursor: cursor && {
        id: cursor,
      },
      skip: skip,
    };

    const count = await this.prismaService.hero.count({
      where: {
        ...whereName,
        ...whereUniverse,
        ...whereIsActive,
      },
    });

    const heroes = await this.prismaService.hero.findMany(query);

    return {
      count,
      heroes,
    };
  }

  findOne(id: string) {
    return this.prismaService.hero.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateHeroDto: UpdateHeroDto) {
    return this.prismaService.hero.update({
      where: {
        id: id,
      },
      data: {
        name: updateHeroDto.name,
        nickname: updateHeroDto.nickname,
        date_of_birth: updateHeroDto.dateOfBirth,
        universe: updateHeroDto.universe,
        main_power: updateHeroDto.mainPower,
        avatar_url: updateHeroDto.avatarUrl,
      },
    });
  }

  activate(id: string) {
    return this.prismaService.hero.update({
      where: {
        id: id,
      },
      data: {
        is_active: true,
      },
    });
  }

  deactivate(id: string) {
    return this.prismaService.hero.update({
      where: {
        id: id,
      },
      data: {
        is_active: false,
      },
    });
  }
}

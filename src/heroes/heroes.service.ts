import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from '../prisma.service';
import { IHeroesFilters } from '../interfaces/heroes-filters.interface';
import * as moment from 'moment';

@Injectable()
export class HeroesService {
  constructor(private prismaService: PrismaService) {}

  create(createHeroDto: CreateHeroDto) {
    return this.prismaService.hero.create({
      data: {
        name: createHeroDto.name,
        nickname: createHeroDto.nickname,
        date_of_birth: new Date(createHeroDto.date_of_birth).toISOString(),
        universe: createHeroDto.universe,
        main_power: createHeroDto.main_power,
        avatar_url: createHeroDto.avatar_url,
        is_active: true,
      },
    });
  }

  async generateCsvReport() { 
    const heroes = await this.prismaService.hero.findMany();

    const csvHeader = 'id,name,nickname,date_of_birth,universe,main_power,avatar_url,is_active\n';

    const csvContent = heroes
      .map((hero) => {
        const dateOfBirth = moment(hero.date_of_birth).format('YYYY-MM-DD');

        return `${hero.id},${hero.name},${hero.nickname},${dateOfBirth},${hero.universe},${hero.main_power},${hero.avatar_url},${hero.is_active}`;
      })
      .join('\n');

    return csvHeader + csvContent;
  }

  prepareQueryFilters({
    name,
    universe,
    isActive,
    cursor,
    skip,
  }: IHeroesFilters) {
    const whereName = name && {
      OR: [
        {
          name: {
            contains: name,
          },
        },
        {
          nickname: {
            contains: name,
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
            equals: isActive.toLowerCase() === 'true',
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
      skip: Number(skip),
      take: 10,
    };

    return query;
  }

  async findAll({ name, universe, isActive, cursor, skip }: IHeroesFilters) {
    const query = this.prepareQueryFilters({
      name,
      universe,
      isActive,
      cursor,
      skip,
    });

    const count = await this.prismaService.hero.count({
      where: query.where,
    });

    const heroes = await this.prismaService.hero.findMany({
      ...query,
      orderBy: {
        created_at: 'desc',
      },
    });

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
        date_of_birth: new Date(updateHeroDto.date_of_birth).toISOString(),
        universe: updateHeroDto.universe,
        main_power: updateHeroDto.main_power,
        avatar_url: updateHeroDto.avatar_url,
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

  remove(id: string) {
    return this.prismaService.hero.delete({
      where: {
        id: id,
      },
    });
  }
}

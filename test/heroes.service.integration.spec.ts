import { Test, TestingModule } from '@nestjs/testing';
import { HeroesService } from '../src/heroes/heroes.service';
import { PrismaService } from '../src/prisma.service';
import { CreateHeroDto } from '../src/heroes/dto/create-hero.dto';
import { UpdateHeroDto } from '../src/heroes/dto/update-hero.dto';

describe('HeroesService Integration', () => {
  let service: HeroesService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroesService, PrismaService],
    }).compile();

    service = module.get<HeroesService>(HeroesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.hero.deleteMany()
    await prismaService.$disconnect();
  });

  it('should create a hero', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: new Date('1939-05-27'),
      universe: 'DC',
      main_power: 'Intelligence',
      avatar_url: 'https://example.com/batman.jpg',
    };

    const hero = await service.create(createHeroDto);

    expect(hero).toHaveProperty('id');
    expect(hero.name).toBe(createHeroDto.name);
  });

  it('should update a hero', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'Clark Kent',
      nickname: 'Superman',
      date_of_birth: new Date('1938-06-18'),
      universe: 'DC',
      main_power: 'Super Strength',
      avatar_url: 'https://example.com/superman.jpg',
    };

    const createdHero = await service.create(createHeroDto);

    const updateHeroDto: UpdateHeroDto = {
      name: 'Clark Kent',
      nickname: 'Superman',
      date_of_birth: new Date('1938-06-18'),
      universe: 'DC',
      main_power: 'Flight',
      avatar_url: 'https://example.com/superman.jpg',
    };

    const updatedHero = await service.update(createdHero.id, updateHeroDto);

    expect(updatedHero.main_power).toBe(updateHeroDto.main_power);
  });

  it('should activate a hero', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'Diana Prince',
      nickname: 'Wonder Woman',
      date_of_birth: new Date('1941-10-21'),
      universe: 'DC',
      main_power: 'Super Strength',
      avatar_url: 'https://example.com/wonderwoman.jpg',
    };

    const createdHero = await service.create(createHeroDto);

    const activatedHero = await service.activate(createdHero.id);

    expect(activatedHero.is_active).toBe(true);
  });

  it('should deactivate a hero', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'Barry Allen',
      nickname: 'The Flash',
      date_of_birth: new Date('1956-10-01'),
      universe: 'DC',
      main_power: 'Super Speed',
      avatar_url: 'https://example.com/flash.jpg',
    };

    const createdHero = await service.create(createHeroDto);

    const deactivatedHero = await service.deactivate(createdHero.id);

    expect(deactivatedHero.is_active).toBe(false);
  });

  it('should find a hero by id', async () => {
    const createHeroDto: CreateHeroDto = {
      name: 'Arthur Curry',
      nickname: 'Aquaman',
      date_of_birth: new Date('1941-11-01'),
      universe: 'DC',
      main_power: 'Aquatic Abilities',
      avatar_url: 'https://example.com/aquaman.jpg',
    };

    const createdHero = await service.create(createHeroDto);

    const foundHero = await service.findOne(createdHero.id);

    expect(foundHero).toHaveProperty('id');
    expect(foundHero.name).toBe(createHeroDto.name);
  });

  it('should find all heroes', async () => {
    const heroes = await service.findAll({ skip: 0 });

    expect(heroes).toHaveProperty('count');
    expect(heroes).toHaveProperty('heroes');
  });
});

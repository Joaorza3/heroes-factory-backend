import { Test, TestingModule } from '@nestjs/testing';
import { HeroesService } from './heroes.service';
import { PrismaService } from '../prisma.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let prismaService: PrismaService;

  let mockHero = {
    name: 'Steve Rogers',
    nickname: 'Capitão America',
    date_of_birth: new Date('2025-01-06'),
    universe: 'Marvel',
    main_power: 'Soro de Super soldado',
    avatar_url:
      'https://i.pinimg.com/736x/7a/d7/15/7ad715227a0707890f92bcb50f1e2d94.jpg',
  };

  const mockPrismaService = {
    hero: {
      create: jest.fn().mockImplementation((dto) => ({
        id: '1',
        ...dto.data,
      })),
      count: jest.fn().mockImplementation(() => 1),
      findMany: jest.fn().mockImplementation((query) => {
        if (query.where.name === 'Steve Rogers') {
          return [
            {
              id: '1',
              ...mockHero,
            },
          ];
        }
        return [];
      }),
      findUnique: jest.fn().mockImplementation(() => ({
        id: '1',
        ...mockHero,
      })),
      update: jest.fn().mockImplementation(() => ({
        id: '1',
        ...mockHero,
      })),
      delete: jest.fn().mockImplementation(() => ({
        id: '1',
        ...mockHero,
      })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<HeroesService>(HeroesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a hero', async () => {
    const hero = await service.create(mockHero);

    expect(hero).toHaveProperty('id');
    expect(prismaService.hero.create).toHaveBeenCalledWith({
      data: {
        ...mockHero,
        date_of_birth: mockHero.date_of_birth.toISOString(),
        is_active: true,
      },
    });
  });

  it('should prepare query filters with name', () => {
    const filters = {
      name: 'Steve Rogers',
      skip: 0,
    };

    const query = service.prepareQueryFilters(filters);

    expect(query).toEqual({
      where: {
        OR: [
          {
            name: {
              contains: 'Steve Rogers',
            },
          },
          {
            nickname: {
              contains: 'Steve Rogers',
            },
          },
        ],
      },
      cursor: undefined,
      skip: 0,
      take: 10,
    });
  });

  it('should prepare query filters with universe', () => {
    const filters = {
      universe: 'Marvel',
      skip: 0,
    };

    const query = service.prepareQueryFilters(filters);

    expect(query).toEqual({
      where: {
        universe: {
          equals: 'Marvel',
        },
      },
      cursor: undefined,
      skip: 0,
      take: 10,
    });
  });

  it('should prepare query filters with isActive', () => {
    const filters = {
      isActive: 'true',
      skip: 0,
    };

    const query = service.prepareQueryFilters(filters);

    expect(query).toEqual({
      where: {
        is_active: {
          equals: true,
        },
      },
      cursor: undefined,
      skip: 0,
      take: 10,
    });
  });

  it('should prepare query filters with cursor and skip', () => {
    const filters = {
      cursor: '1',
      skip: 5,
    };

    const query = service.prepareQueryFilters(filters);

    expect(query).toEqual({
      where: {},
      cursor: {
        id: '1',
      },
      skip: 5,
      take: 10,
    });
  });

  it('should return all heroes', async () => {
    const heroes = await service.findAll({
      skip: 0,
    });

    expect(heroes).toHaveProperty('count');
    expect(heroes).toHaveProperty('heroes');
    expect(prismaService.hero.count).toHaveBeenCalled();
  });

  it('should return all heroes with name filter', async () => {
    prismaService.hero.count = jest.fn().mockImplementation(() => 1);
    prismaService.hero.findMany = jest.fn().mockImplementation(() => [
      {
        id: '1',
        ...mockHero,
      },
    ]);

    const expectedWhere = {
      OR: [
        {
          name: {
            contains: 'Steve Rogers',
          },
        },
        {
          nickname: {
            contains: 'Steve Rogers',
          },
        },
      ],
    };

    const heroes = await service.findAll({
      name: 'Steve Rogers',
      skip: 0,
    });

    expect(heroes).toHaveProperty('count');
    expect(heroes).toHaveProperty('heroes');
    expect(heroes.heroes.length).toBe(1);
    expect(prismaService.hero.count).toHaveBeenCalledWith({
      where: expectedWhere,
    });
    expect(prismaService.hero.findMany).toHaveBeenCalledWith({
      where: expectedWhere,
      orderBy: {
        created_at: 'desc',
      },
      skip: 0,
      cursor: undefined,
      take: 10,
    });
  });

  it('should return all heroes with universe filter', async () => {
    const heroes = await service.findAll({
      universe: 'Marvel',
      skip: 0,
    });

    expect(heroes).toHaveProperty('count');
    expect(heroes).toHaveProperty('heroes');
    expect(prismaService.hero.count).toHaveBeenCalledWith({
      where: {
        universe: {
          equals: 'Marvel',
        },
      },
    });
    expect(prismaService.hero.findMany).toHaveBeenCalledWith({
      where: {
        universe: {
          equals: 'Marvel',
        },
      },
      cursor: undefined,
      take: 10,
      orderBy: {
        created_at: 'desc',
      },
      skip: 0,
    });
  });

  it('should return a hero', async () => {
    const hero = await service.findOne('1');

    expect(hero).toHaveProperty('id');
    expect(prismaService.hero.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });

  it('should update a hero', async () => {
    const hero = await service.update('1', mockHero);

    expect(hero).toHaveProperty('id');
    expect(prismaService.hero.update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        ...mockHero,
        date_of_birth: mockHero.date_of_birth.toISOString(),
      },
    });
  });

  it('should activate a hero', async () => {
    const hero = await service.activate('1');

    expect(hero).toHaveProperty('id');
    expect(prismaService.hero.update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        is_active: true,
      },
    });
  });

  it('should deactivate a hero', async () => {
    const hero = await service.deactivate('1');

    expect(hero).toHaveProperty('id');
    expect(prismaService.hero.update).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
      data: {
        is_active: false,
      },
    });
  });

  it('should remove a hero', async () => {
    await service.remove('1');

    expect(prismaService.hero.delete).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });
});

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const heroes = [
    {
      name: 'Robert Bruce Banner',
      nickname: 'Hulk',
      date_of_birth: '1962-04-10T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Force',
      avatar_url:
        'https://avatarfiles.alphacoders.com/366/thumb-1920-366077.png',
      is_active: false,
      created_at: '2025-01-25T16:18:52.298Z',
      updated_at: '2025-01-26T02:00:19.539Z',
    },
    {
      name: 'Clark Kent',
      nickname: 'Superman',
      date_of_birth: '1938-06-01T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Super Strength',
      avatar_url:
        'https://tr.rbxcdn.com/180DAY-6540dad9383363ae2def49071164d089/420/420/Hat/Webp/noFilter',
      is_active: true,
      created_at: '2025-01-25T16:18:52.298Z',
      updated_at: '2025-01-25T17:14:14.536Z',
    },
    {
      name: 'Peter Parker',
      nickname: 'Spider-Man',
      date_of_birth: '1962-08-15T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Spider Abilities',
      avatar_url:
        'https://i.pinimg.com/736x/04/88/cf/0488cf690fc02dfde19829076474739f.jpg',
      is_active: false,
      created_at: '2025-01-25T16:18:52.298Z',
      updated_at: '2025-01-26T00:45:59.039Z',
    },
    {
      name: 'Diana Prince',
      nickname: 'Wonder Woman',
      date_of_birth: '1941-10-21T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Combat Skills',
      avatar_url:
        'https://i.pinimg.com/564x/c6/9a/13/c69a13d097873c9f3f8d9212e82f623f.jpg',
      is_active: true,
      created_at: '2025-01-25T16:18:52.298Z',
      updated_at: '2025-01-26T00:44:57.023Z',
    },
    {
      name: 'Tony Stark',
      nickname: 'Iron Man',
      date_of_birth: '1963-03-01T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Intelligence',
      avatar_url: 'https://avatarfiles.alphacoders.com/328/328943.jpg',
      is_active: false,
      created_at: '2025-01-25T16:18:52.298Z',
      updated_at: '2025-01-26T00:44:59.862Z',
    },
    {
      name: 'Bruce Wayne',
      nickname: 'Batman',
      date_of_birth: '2025-01-10T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Preparo',
      avatar_url: 'https://i.redd.it/0ib74hskh1x81.jpg',
      is_active: true,
      created_at: '2025-01-26T00:35:05.975Z',
      updated_at: '2025-01-26T00:45:49.619Z',
    },
    {
      name: 'Scott Lang',
      nickname: 'Homem formiga',
      date_of_birth: '2010-01-25T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Controlar Tamanho',
      avatar_url:
        'https://i.pinimg.com/474x/f0/a0/31/f0a031574b7ba232a9e1874b857772d7.jpg',
      is_active: true,
      created_at: '2025-01-26T00:38:27.331Z',
      updated_at: '2025-01-26T02:06:26.655Z',
    },
    {
      name: 'Barry Allen',
      nickname: 'Flash',
      date_of_birth: '2020-12-12T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Velocidade',
      avatar_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJpa1i2L346sYVYhZhvIKVuSuYlnAg1GEVnQ&s',
      is_active: false,
      created_at: '2025-01-26T02:01:13.204Z',
      updated_at: '2025-01-26T02:14:56.330Z',
    },
    {
      name: 'Hal Jordan',
      nickname: 'Green Lantern',
      date_of_birth: '1888-12-12T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Anel Com Poderes',
      avatar_url: 'https://avatarfiles.alphacoders.com/259/259768.png',
      is_active: true,
      created_at: '2025-01-26T02:02:20.604Z',
      updated_at: '2025-01-26T02:02:20.604Z',
    },
    {
      name: 'Wade Wilson',
      nickname: 'Deadpool',
      date_of_birth: '0010-10-10T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Fator de Cura',
      avatar_url:
        'https://i.pinimg.com/736x/e4/f6/22/e4f622aa71de5a74a633d855e7ef6a88.jpg',
      is_active: false,
      created_at: '2025-01-26T02:03:34.982Z',
      updated_at: '2025-01-26T02:14:52.248Z',
    },
    {
      name: 'Logan',
      nickname: 'Wolverine',
      date_of_birth: '2024-12-31T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Esqueleto de Adamantium',
      avatar_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3xksCTqM9pvvfb7xvXK-c78LY_mQSx5LjfA&s',
      is_active: true,
      created_at: '2025-01-26T02:04:16.212Z',
      updated_at: '2025-01-26T02:04:16.212Z',
    },
    {
      name: 'Steve Rogers',
      nickname: 'Capitão America',
      date_of_birth: '2025-01-06T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Soro de Super soldado',
      avatar_url:
        'https://i.pinimg.com/736x/7a/d7/15/7ad715227a0707890f92bcb50f1e2d94.jpg',
      is_active: true,
      created_at: '2025-01-26T02:06:13.819Z',
      updated_at: '2025-01-26T02:06:13.819Z',
    },
    {
      name: 'Matt Murdock',
      nickname: 'Demolidor',
      date_of_birth: '2024-12-29T00:00:00.000Z',
      universe: 'Marvel',
      main_power: 'Artes Marciais',
      avatar_url: 'https://avatarfiles.alphacoders.com/259/259762.jpg',
      is_active: true,
      created_at: '2025-01-26T02:13:21.445Z',
      updated_at: '2025-01-26T02:15:14.299Z',
    },
  ];

  const promises = heroes.map(async (hero) => {
    await prisma.hero.create({
      data: hero,
    });
  });

  await Promise.all(promises);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

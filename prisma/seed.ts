import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const heroes = [
    {
      name: 'Robert Bruce Banner',
      nickname: 'Hulk',
      date_of_birth: '1962-04-10T00:00:00Z',
      universe: 'Marvel',
      main_power: 'Force',
      avatar_url:
        'https://avatarfiles.alphacoders.com/366/thumb-1920-366077.png',
      is_active: true,
    },
    {
      name: 'Clark Kent',
      nickname: 'Superman',
      date_of_birth: '1938-06-01T00:00:00Z',
      universe: 'DC',
      main_power: 'Super Strength',
      avatar_url:
        'https://tr.rbxcdn.com/180DAY-6540dad9383363ae2def49071164d089/420/420/Hat/Webp/noFilter',
      is_active: true,
    },
    {
      name: 'Diana Prince',
      nickname: 'Wonder Woman',
      date_of_birth: '1941-10-21T00:00:00Z',
      universe: 'DC',
      main_power: 'Combat Skills',
      avatar_url:
        'https://i.pinimg.com/564x/c6/9a/13/c69a13d097873c9f3f8d9212e82f623f.jpg',
      is_active: false,
    },
    {
      name: 'Tony Stark',
      nickname: 'Iron Man',
      date_of_birth: '1963-03-01T00:00:00Z',
      universe: 'Marvel',
      main_power: 'Intelligence',
      avatar_url: 'https://avatarfiles.alphacoders.com/328/328943.jpg',
      is_active: true,
    },
    {
      name: 'Peter Parker',
      nickname: 'Spider-Man',
      date_of_birth: '1962-08-15T00:00:00Z',
      universe: 'Marvel',
      main_power: 'Spider Abilities',
      avatar_url:
        'https://i.pinimg.com/736x/04/88/cf/0488cf690fc02dfde19829076474739f.jpg',
      is_active: false,
    },
  ];

  const promises = heroes.map(async (hero) => {
    await prisma.hero.create({
      data: hero,
    });
  });

  const result = await Promise.all(promises);
  console.log(result);
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

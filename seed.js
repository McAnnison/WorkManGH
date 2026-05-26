const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Categories
  const categories = [
    { name: 'Mason', slug: 'mason', icon: '🧱' },
    { name: 'Carpenter', slug: 'carpenter', icon: '🪚' },
    { name: 'Plumber', slug: 'plumber', icon: '🔧' },
    { name: 'Painter', slug: 'painter', icon: '🎨' },
    { name: 'Electrician', slug: 'electrician', icon: '⚡' },
    { name: 'Welder', slug: 'welder', icon: '🔥' },
    { name: 'Tiler', slug: 'tiler', icon: '🏗️' },
    { name: 'Mechanic', slug: 'mechanic', icon: '🔩' },
  ];

  console.log('Creating categories...');
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // 2. Create a Sample Artisan
  // Note: In a real scenario, passwords would be hashed
  console.log('Creating sample artisan...');
  const plumberCat = await prisma.category.findUnique({ where: { slug: 'plumber' } });

  const sampleUser = await prisma.user.upsert({
    where: { phone: '0244123456' },
    update: {},
    create: {
      name: 'Kofi Arhin',
      phone: '0244123456',
      role: 'ARTISAN',
      artisanProfile: {
        create: {
          categoryId: plumberCat.id,
          experienceYears: 8,
          bio: 'Expert in leak repairs and bathroom installations in the Accra Metropolitan area.',
          latitude: 5.6037,
          longitude: -0.1870,
          address: 'Osu, Accra',
          available: true,
        },
      },
    },
  });

  // 3. Create a Sample Review
  console.log('Creating sample review...');
  const customerUser = await prisma.user.upsert({
    where: { phone: '0555987654' },
    update: {},
    create: {
      name: 'Ama Serwaa',
      phone: '0555987654',
      role: 'CUSTOMER',
    },
  });

  const profile = await prisma.artisanProfile.findUnique({
    where: { userId: sampleUser.id }
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Very professional and arrived on time!',
      customerId: customerUser.id,
      artisanId: profile.id,
    },
  });

  console.log('✅ Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
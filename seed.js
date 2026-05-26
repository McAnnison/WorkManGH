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
    { name: 'Gardener', slug: 'gardener', icon: '🌳' }, // Added a new category for more variety
  ];

  console.log('Creating categories...');
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // 2. Create Sample Artisans and Users
  console.log('Creating sample users and artisan profiles...');

  const categoriesMap = {};
  for (const cat of categories) {
    const foundCat = await prisma.category.findUnique({ where: { slug: cat.slug } });
    categoriesMap[cat.slug] = foundCat.id;
  }

  const sampleArtisansData = [
    {
      name: 'Kofi Arhin', phone: '0244123456', categorySlug: 'plumber', experienceYears: 8,
      bio: 'Expert in leak repairs and bathroom installations in the Accra Metropolitan area.',
      latitude: 5.6037, longitude: -0.1870, address: 'Osu, Accra', available: true,
    },
    {
      name: 'Adwoa Mensah', phone: '0543210987', categorySlug: 'electrician', experienceYears: 12,
      bio: 'Certified electrician for residential and commercial wiring. Safety first!',
      latitude: 5.6148, longitude: -0.2058, address: 'Labone, Accra', available: true,
    },
    {
      name: 'Kwame Boateng', phone: '0201122334', categorySlug: 'carpenter', experienceYears: 15,
      bio: 'Custom furniture, roofing, and general carpentry. Quality craftsmanship guaranteed.',
      latitude: 5.5947, longitude: -0.1687, address: 'Cantonments, Accra', available: false,
    },
    {
      name: 'Akua Nsiah', phone: '0278899001', categorySlug: 'painter', experienceYears: 6,
      bio: 'Interior and exterior painting services. Bringing color to your world.',
      latitude: 5.6200, longitude: -0.1900, address: 'East Legon, Accra', available: true,
    },
    {
      name: 'Yaw Owusu', phone: '0501122334', categorySlug: 'welder', experienceYears: 10,
      bio: 'Fabrication and repair of metal structures. Gates, fences, and more.',
      latitude: 5.5800, longitude: -0.2200, address: 'Kaneshie, Accra', available: true,
    },
    {
      name: 'Fati Mohammed', phone: '0265544332', categorySlug: 'tiler', experienceYears: 7,
      bio: 'Professional tiling for floors and walls. Attention to detail.',
      latitude: 5.6000, longitude: -0.1700, address: 'Dansoman, Accra', available: false,
    },
    {
      name: 'Musa Ibrahim', phone: '0240001112', categorySlug: 'mechanic', experienceYears: 20,
      bio: 'Experienced auto mechanic for all car brands. Reliable and efficient.',
      latitude: 5.5700, longitude: -0.2000, address: 'Circle, Accra', available: true,
    },
    {
      name: 'Abena Darko', phone: '0551234567', categorySlug: 'mason', experienceYears: 10,
      bio: 'Bricklaying, blockwork, and general masonry services. Strong foundations.',
      latitude: 5.6050, longitude: -0.1850, address: 'Accra Central, Accra', available: true,
    },
    {
      name: 'Esi Mensah', phone: '0241234567', categorySlug: 'gardener', experienceYears: 5,
      bio: 'Landscaping and garden maintenance. Creating beautiful outdoor spaces.',
      latitude: 5.6080, longitude: -0.1950, address: 'Airport Residential, Accra', available: true,
    },
  ];

  const createdArtisans = [];
  for (const artisanData of sampleArtisansData) {
    const user = await prisma.user.upsert({
      where: { phone: artisanData.phone },
      update: {
        name: artisanData.name,
        role: 'ARTISAN',
      },
      create: {
        name: artisanData.name,
        phone: artisanData.phone,
        role: 'ARTISAN',
        artisanProfile: {
          create: {
            categoryId: categoriesMap[artisanData.categorySlug],
            experienceYears: artisanData.experienceYears,
            bio: artisanData.bio,
            latitude: artisanData.latitude,
            longitude: artisanData.longitude,
            address: artisanData.address,
            available: artisanData.available,
          },
        },
      },
      include: { artisanProfile: true },
    });
    createdArtisans.push(user.artisanProfile);
  }

  // 3. Create a Sample Review
  console.log('Creating sample review...');
  const customerUser = await prisma.user.upsert({
    where: { phone: '0555987654' },
    update: {
      name: 'Ama Serwaa',
      role: 'CUSTOMER',
    },
    create: {
      name: 'Ama Serwaa',
      phone: '0555987654',
      role: 'CUSTOMER',
    },
  });
  
  const firstArtisanProfile = createdArtisans[0]; // Get the first created artisan for a review

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Very professional and arrived on time!',
      customerId: customerUser.id,
      artisanId: firstArtisanProfile.id,
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
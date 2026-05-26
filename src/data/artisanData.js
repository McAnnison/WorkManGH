// Artisan categories
export const ARTISAN_CATEGORIES = [
  { id: 'mason', name: 'Mason', pluralName: 'Masons', icon: '🧱' },
  { id: 'carpenter', name: 'Carpenter', pluralName: 'Carpenters', icon: '🪚' },
  { id: 'plumber', name: 'Plumber', pluralName: 'Plumbers', icon: '🔧' },
  { id: 'painter', name: 'Painter', pluralName: 'Painters', icon: '🎨' },
  { id: 'electrician', name: 'Electrician', pluralName: 'Electricians', icon: '⚡' },
  { id: 'welder', name: 'Welder', pluralName: 'Welders', icon: '🔥' },
  { id: 'tiler', name: 'Tiler', pluralName: 'Tilers', icon: '🏗️' },
  { id: 'mechanic', name: 'Mechanic', pluralName: 'Mechanics', icon: '🔩' },
  { id: 'tailor', name: 'Tailor', pluralName: 'Tailors', icon: '🧵' },
  { id: 'seamstress', name: 'Seamstress', pluralName: 'Seamstresses', icon: '👗' },
  { id: 'barber', name: 'Barber', pluralName: 'Barbers', icon: '💈' },
  { id: 'hair-stylist', name: 'Hair Stylist', pluralName: 'Hair Stylists', icon: '💇🏾‍♀️' },
  { id: 'makeup-artist', name: 'Makeup Artist', pluralName: 'Makeup Artists', icon: '💄' },
  { id: 'nail-technician', name: 'Nail Technician', pluralName: 'Nail Technicians', icon: '💅' },
  { id: 'photographer', name: 'Photographer', pluralName: 'Photographers', icon: '📷' },
  { id: 'videographer', name: 'Videographer', pluralName: 'Videographers', icon: '🎥' },
  { id: 'dj', name: 'DJ', pluralName: 'DJs', icon: '🎧' },
  { id: 'graphic-designer', name: 'Graphic Designer', pluralName: 'Graphic Designers', icon: '🎨' },
  { id: 'web-designer', name: 'Web Designer', pluralName: 'Web Designers', icon: '💻' },
  { id: 'tech-repair', name: 'Tech Repair', pluralName: 'Tech Repair Pros', icon: '🖥️' },
  { id: 'chef', name: 'Chef', pluralName: 'Chefs', icon: '👨🏾‍🍳' },
  { id: 'caterer', name: 'Caterer', pluralName: 'Caterers', icon: '🍲' },
  { id: 'fitness-trainer', name: 'Fitness Trainer', pluralName: 'Fitness Trainers', icon: '🏋🏾' },
  { id: 'tutor', name: 'Tutor', pluralName: 'Tutors', icon: '📚' },
  { id: 'cleaner', name: 'Cleaner', pluralName: 'Cleaners', icon: '🧹' },
  { id: 'mover', name: 'Mover', pluralName: 'Movers', icon: '📦' },
];

// Sample artisan data (in a real app, this would come from a backend)
export const SAMPLE_ARTISANS = [
  {
    id: '1',
    name: 'Kwame Mensah',
    category: 'plumber',
    phone: '+233244123456',
    experience: 8,
    rating: 4.7,
    reviewCount: 45,
    location: {
      latitude: 5.6037,
      longitude: -0.1870,
      address: 'Accra, Greater Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Expert plumber with 8 years experience in residential and commercial plumbing.'
  },
  {
    id: '2',
    name: 'Akosua Boateng',
    category: 'electrician',
    phone: '+233244234567',
    experience: 5,
    rating: 4.9,
    reviewCount: 62,
    location: {
      latitude: 5.6100,
      longitude: -0.1900,
      address: 'East Legon, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Certified electrician specializing in home wiring and electrical repairs.'
  },
  {
    id: '3',
    name: 'Kofi Asante',
    category: 'carpenter',
    phone: '+233244345678',
    experience: 12,
    rating: 4.8,
    reviewCount: 89,
    location: {
      latitude: 5.5950,
      longitude: -0.1800,
      address: 'Osu, Accra'
    },
    available: false,
    profilePhoto: null,
    portfolio: [],
    bio: 'Master carpenter specializing in furniture making and home renovations.'
  },
  {
    id: '4',
    name: 'Ama Adusei',
    category: 'painter',
    phone: '+233244456789',
    experience: 6,
    rating: 4.6,
    reviewCount: 34,
    location: {
      latitude: 5.6000,
      longitude: -0.1950,
      address: 'Tema, Greater Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Professional painter with expertise in interior and exterior painting.'
  },
  {
    id: '5',
    name: 'Yaw Darko',
    category: 'mason',
    phone: '+233244567890',
    experience: 10,
    rating: 4.5,
    reviewCount: 56,
    location: {
      latitude: 5.6080,
      longitude: -0.1920,
      address: 'Madina, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Experienced mason specializing in building construction and block laying.'
  },
  {
    id: '6',
    name: 'Abena Owusu',
    category: 'tiler',
    phone: '+233244678901',
    experience: 7,
    rating: 4.8,
    reviewCount: 41,
    location: {
      latitude: 5.5980,
      longitude: -0.1880,
      address: 'Labadi, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Expert tiler with 7 years experience in floor and wall tiling.'
  },
  {
    id: '7',
    name: 'Kwabena Nkrumah',
    category: 'welder',
    phone: '+233244789012',
    experience: 9,
    rating: 4.7,
    reviewCount: 38,
    location: {
      latitude: 5.6020,
      longitude: -0.1850,
      address: 'Adabraka, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Professional welder specializing in metal fabrication and repairs.'
  },
  {
    id: '8',
    name: 'Efua Mensah',
    category: 'plumber',
    phone: '+233244890123',
    experience: 4,
    rating: 4.4,
    reviewCount: 28,
    location: {
      latitude: 5.6060,
      longitude: -0.1910,
      address: 'Achimota, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Reliable plumber for all your plumbing needs.'
  },
  {
    id: '9',
    name: 'Naa Dede Adjei',
    category: 'tailor',
    phone: '+233244901234',
    experience: 11,
    rating: 4.9,
    reviewCount: 71,
    location: {
      latitude: 5.5942,
      longitude: -0.1768,
      address: 'Osu, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Fashion tailor specializing in custom outfits, alterations, and bridal wear.'
  },
  {
    id: '10',
    name: 'Mariam Yeboah',
    category: 'seamstress',
    phone: '+233244912345',
    experience: 9,
    rating: 4.8,
    reviewCount: 58,
    location: {
      latitude: 5.6155,
      longitude: -0.2050,
      address: 'Kaneshie, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Skilled seamstress for dresses, school uniforms, and wardrobe repairs.'
  },
  {
    id: '11',
    name: 'Emmanuel Kubi',
    category: 'barber',
    phone: '+233244923456',
    experience: 7,
    rating: 4.7,
    reviewCount: 64,
    location: {
      latitude: 5.5620,
      longitude: -0.2058,
      address: 'Dansoman, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Barber offering clean fades, beard grooming, and kids haircuts.'
  },
  {
    id: '12',
    name: 'Grace Agyeman',
    category: 'hair-stylist',
    phone: '+233244934567',
    experience: 10,
    rating: 4.9,
    reviewCount: 77,
    location: {
      latitude: 5.6320,
      longitude: -0.1905,
      address: 'Airport Residential, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Hair stylist for braids, natural hair care, relaxers, and styling.'
  },
  {
    id: '13',
    name: 'Abigail Owusu',
    category: 'makeup-artist',
    phone: '+233244945678',
    experience: 6,
    rating: 4.8,
    reviewCount: 49,
    location: {
      latitude: 5.6030,
      longitude: -0.1822,
      address: 'Ring Road, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Makeup artist for weddings, events, photoshoots, and special occasions.'
  },
  {
    id: '14',
    name: 'Sandra Poku',
    category: 'nail-technician',
    phone: '+233244956789',
    experience: 5,
    rating: 4.7,
    reviewCount: 36,
    location: {
      latitude: 5.6275,
      longitude: -0.1780,
      address: 'Cantoments, Accra'
    },
    available: false,
    profilePhoto: null,
    portfolio: [],
    bio: 'Nail technician specializing in acrylics, gel polish, pedicures, and nail art.'
  },
  {
    id: '15',
    name: 'Michael Ofori',
    category: 'photographer',
    phone: '+233244967890',
    experience: 8,
    rating: 4.9,
    reviewCount: 83,
    location: {
      latitude: 5.5565,
      longitude: -0.2020,
      address: 'Korle Bu, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Photographer for events, portraits, product shoots, and family sessions.'
  },
  {
    id: '16',
    name: 'Bright Addo',
    category: 'videographer',
    phone: '+233244978901',
    experience: 7,
    rating: 4.8,
    reviewCount: 52,
    location: {
      latitude: 5.6110,
      longitude: -0.1842,
      address: 'Adabraka, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Videographer creating event coverage, promo videos, and social content.'
  },
  {
    id: '17',
    name: 'Kobby Frimpong',
    category: 'dj',
    phone: '+233244989012',
    experience: 9,
    rating: 4.9,
    reviewCount: 68,
    location: {
      latitude: 5.5905,
      longitude: -0.1962,
      address: 'Labone, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'DJ for parties, weddings, corporate events, and private shows.'
  },
  {
    id: '18',
    name: 'Esi Dapaah',
    category: 'graphic-designer',
    phone: '+233244990123',
    experience: 6,
    rating: 4.8,
    reviewCount: 41,
    location: {
      latitude: 5.6190,
      longitude: -0.1935,
      address: 'North Ridge, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Graphic designer for flyers, logos, social media graphics, and branding.'
  },
  {
    id: '19',
    name: 'Daniel Tetteh',
    category: 'web-designer',
    phone: '+233244991234',
    experience: 5,
    rating: 4.7,
    reviewCount: 33,
    location: {
      latitude: 5.6165,
      longitude: -0.1878,
      address: 'Osu Oxford Street, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Web designer building modern landing pages, portfolios, and business sites.'
  },
  {
    id: '20',
    name: 'Samuel Boateng',
    category: 'tech-repair',
    phone: '+233244992345',
    experience: 9,
    rating: 4.9,
    reviewCount: 74,
    location: {
      latitude: 5.6108,
      longitude: -0.2028,
      address: 'Kaneshie Market, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Tech repair specialist for phones, laptops, desktops, and accessories.'
  },
  {
    id: '21',
    name: 'Chef Akua Mensimah',
    category: 'chef',
    phone: '+233244993456',
    experience: 12,
    rating: 4.9,
    reviewCount: 92,
    location: {
      latitude: 5.6333,
      longitude: -0.1725,
      address: 'East Legon, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Private chef offering Ghanaian meals, continental dishes, and meal prep.'
  },
  {
    id: '22',
    name: 'Nana Kwesi Aidoo',
    category: 'caterer',
    phone: '+233244994567',
    experience: 10,
    rating: 4.8,
    reviewCount: 65,
    location: {
      latitude: 5.6075,
      longitude: -0.2065,
      address: 'Makola, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Caterer for weddings, funerals, birthdays, and corporate events.'
  },
  {
    id: '23',
    name: 'Yaw Asare',
    category: 'fitness-trainer',
    phone: '+233244995678',
    experience: 8,
    rating: 4.7,
    reviewCount: 57,
    location: {
      latitude: 5.6490,
      longitude: -0.1815,
      address: 'Legon, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Fitness trainer offering weight loss plans, strength training, and home workouts.'
  },
  {
    id: '24',
    name: 'Moses Amonoo',
    category: 'tutor',
    phone: '+233244996789',
    experience: 7,
    rating: 4.9,
    reviewCount: 48,
    location: {
      latitude: 5.6055,
      longitude: -0.1895,
      address: 'Teshie, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Tutor for JHS, SHS, and basic computing lessons with flexible home visits.'
  },
  {
    id: '25',
    name: 'Fatima Sule',
    category: 'cleaner',
    phone: '+233244997890',
    experience: 4,
    rating: 4.6,
    reviewCount: 29,
    location: {
      latitude: 5.5985,
      longitude: -0.1985,
      address: 'Circle, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Cleaner for homes, offices, post-construction spaces, and deep cleaning.'
  },
  {
    id: '26',
    name: 'Kofi Tandoh',
    category: 'mover',
    phone: '+233244998901',
    experience: 6,
    rating: 4.7,
    reviewCount: 37,
    location: {
      latitude: 5.6140,
      longitude: -0.2140,
      address: 'Abossey Okai, Accra'
    },
    available: true,
    profilePhoto: null,
    portfolio: [],
    bio: 'Mover helping with relocation, lifting, packing, and safe delivery of items.'
  },
];

// Function to get artisans by category
export const getArtisansByCategory = (category) => {
  return SAMPLE_ARTISANS.filter(artisan => artisan.category === category);
};

// Function to calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Validate input parameters
  if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90) {
    console.error('Invalid latitude value. Must be between -90 and 90.');
    return 0;
  }
  if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
    console.error('Invalid longitude value. Must be between -180 and 180.');
    return 0;
  }
  
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

// Function to get nearby artisans sorted by distance
export const getNearbyArtisans = (category, userLat, userLon) => {
  const artisans = getArtisansByCategory(category);
  return artisans.map(artisan => ({
    ...artisan,
    distance: calculateDistance(userLat, userLon, artisan.location.latitude, artisan.location.longitude)
  })).sort((a, b) => a.distance - b.distance);
};

// Artisan categories
export const ARTISAN_CATEGORIES = [
  { id: 'mason', name: 'Mason', icon: '🧱' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚' },
  { id: 'plumber', name: 'Plumber', icon: '🔧' },
  { id: 'painter', name: 'Painter', icon: '🎨' },
  { id: 'electrician', name: 'Electrician', icon: '⚡' },
  { id: 'welder', name: 'Welder', icon: '🔥' },
  { id: 'tiler', name: 'Tiler', icon: '🏗️' },
  { id: 'mechanic', name: 'Mechanic', icon: '🔩' },
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
];

// Function to get artisans by category
export const getArtisansByCategory = (category) => {
  return SAMPLE_ARTISANS.filter(artisan => artisan.category === category);
};

// Function to calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

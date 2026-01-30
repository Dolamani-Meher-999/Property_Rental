const properties = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    type: 'Apartment',
    price: 2500,
    location: '123 Main St, New York, NY',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 124,
    beds: 2,
    baths: 2,
    area: 1200,
    yearBuilt: 2018,
    garage: 1,
    availableFrom: 'March 1, 2025',
    description: 'Beautiful modern apartment in the heart of downtown. Features an open floor plan, stainless steel appliances, and floor-to-ceiling windows with stunning city views. Walking distance to restaurants, shopping, and public transportation.',
    features: [
      'Central Air Conditioning',
      'In-Unit Laundry',
      'Hardwood Floors',
      'Dishwasher',
      'Microwave',
      'Balcony',
      'Fitness Center',
      '24/7 Security'
    ],
    amenities: [
      'Swimming Pool',
      'Gym',
      'Parking',
      'Pet Friendly',
      'Elevator',
      'Doorman'
    ]
  },
  {
    id: '2',
    title: 'Cozy Studio Near Central Park',
    type: 'Studio',
    price: 1800,
    location: '456 Park Ave, New York, NY',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 89,
    beds: 1,
    baths: 1,
    area: 600,
    yearBuilt: 2015,
    garage: 0,
    availableFrom: 'Immediately',
    description: 'Charming studio apartment just steps from Central Park. Perfect for professionals or students looking for a convenient location with easy access to public transportation and local amenities.',
    features: [
      'Air Conditioning',
      'Hardwood Floors',
      'Kitchenette',
      'Walk-in Closet',
      'High-Speed Internet'
    ],
    amenities: [
      'Laundry Facility',
      'Bike Storage',
      'Pet Friendly',
      'Elevator'
    ]
  },
  {
    id: '3',
    title: 'Luxury Penthouse with City Views',
    type: 'Penthouse',
    price: 5000,
    location: '789 High St, New York, NY',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 45,
    beds: 3,
    baths: 3.5,
    area: 2500,
    yearBuilt: 2020,
    garage: 2,
    availableFrom: 'April 15, 2025',
    description: 'Stunning penthouse with breathtaking city views. This luxurious residence features high-end finishes, a gourmet kitchen, and a spacious terrace perfect for entertaining. Includes access to all building amenities.',
    features: [
      'Central Air Conditioning',
      'In-Unit Laundry',
      'Hardwood Floors',
      'Gourmet Kitchen',
      'Walk-in Closets',
      'Private Terrace',
      'Smart Home System',
      'Home Office'
    ],
    amenities: [
      'Rooftop Deck',
      'Fitness Center',
      'Swimming Pool',
      '24/7 Concierge',
      'Valet Parking',
      'Pet Spa',
      'Theater Room',
      'Wine Cellar'
    ]
  },
  {
    id: '4',
    title: 'Charming Brownstone in Brooklyn',
    type: 'House',
    price: 3500,
    location: '101 Brownstone Ln, Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 67,
    beds: 3,
    baths: 2,
    area: 1800,
    yearBuilt: 1920,
    garage: 1,
    availableFrom: 'March 20, 2025',
    description: 'Beautifully restored brownstone in a prime Brooklyn location. This home features original architectural details, modern updates, and a private backyard. Close to restaurants, shops, and public transportation.',
    features: [
      'Central Air Conditioning',
      'Hardwood Floors',
      'Eat-in Kitchen',
      'Fireplace',
      'Backyard',
      'Basement Storage',
      'Stainless Steel Appliances'
    ],
    amenities: [
      'Private Yard',
      'Street Parking',
      'Washer/Dryer Hookup',
      'Pet Friendly'
    ]
  },
  {
    id: '5',
    title: 'Modern Loft in Arts District',
    type: 'Loft',
    price: 3200,
    location: '202 Art St, New York, NY',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 92,
    beds: 2,
    baths: 2,
    area: 1500,
    yearBuilt: 2019,
    garage: 1,
    availableFrom: 'April 1, 2025',
    description: 'Stylish loft in the heart of the Arts District. Features high ceilings, exposed brick walls, and large windows that flood the space with natural light. Walking distance to galleries, restaurants, and nightlife.',
    features: [
      'Central Air Conditioning',
      'In-Unit Laundry',
      'Concrete Floors',
      'Open Floor Plan',
      'Floor-to-Ceiling Windows',
      'Modern Kitchen',
      'Walk-in Closet'
    ],
    amenities: [
      'Rooftop Deck',
      'Fitness Center',
      'Bike Storage',
      '24/7 Security',
      'Pet Friendly',
      'Elevator'
    ]
  },
  {
    id: '6',
    title: 'Luxury Waterfront Condo',
    type: 'Condo',
    price: 4200,
    location: '303 Harbor Dr, New York, NY',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 56,
    beds: 2,
    baths: 2.5,
    area: 1800,
    yearBuilt: 2021,
    garage: 2,
    availableFrom: 'May 1, 2025',
    description: 'Stunning waterfront condo with panoramic views of the harbor. This luxury residence features high-end finishes, a gourmet kitchen, and a private balcony. Enjoy resort-style amenities and a prime location.',
    features: [
      'Waterfront Views',
      'Gourmet Kitchen',
      'Hardwood Floors',
      'In-Unit Laundry',
      'Walk-in Closets',
      'Smart Home System',
      'Private Balcony',
      'Home Office'
    ],
    amenities: [
      'Infinity Pool',
      'Fitness Center',
      'Spa',
      '24/7 Concierge',
      'Valet Parking',
      'Boat Dock',
      'Theater Room',
      'Wine Cellar'
    ]
  }
];

export default properties;

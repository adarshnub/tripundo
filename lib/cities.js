export const CITIES = [
  { name: 'Bangalore', lat: 12.97, lng: 77.59, tag: 'Tech hub' },
  { name: 'Munnar', lat: 10.09, lng: 77.06, tag: 'Tea hills' },
  { name: 'Wayanad', lat: 11.60, lng: 76.08, tag: 'Misty forest' },
  { name: 'Varkala', lat: 8.74, lng: 76.71, tag: 'Cliff beach' },
  { name: 'Goa', lat: 15.30, lng: 74.12, tag: 'Coast' },
  { name: 'Manali', lat: 32.24, lng: 77.19, tag: 'Snow' },
  { name: 'Mumbai', lat: 19.07, lng: 72.87, tag: 'Metro' },
  { name: 'Delhi', lat: 28.61, lng: 77.20, tag: 'North' },
  { name: 'San Francisco', lat: 37.77, lng: -122.41, tag: 'SF Bay' },
  { name: 'New York', lat: 40.71, lng: -74.00, tag: 'NYC' },
  { name: 'London', lat: 51.51, lng: -0.13, tag: 'UK' },
  { name: 'Berlin', lat: 52.52, lng: 13.40, tag: 'EU' },
  { name: 'Singapore', lat: 1.35, lng: 103.81, tag: 'SEA' },
  { name: 'Tokyo', lat: 35.68, lng: 139.69, tag: 'Asia' },
  { name: 'Bali', lat: -8.34, lng: 115.09, tag: 'Tropical' },
  { name: 'Dubai', lat: 25.20, lng: 55.27, tag: 'Gulf' },
];

export const ROUTES = [
  ['Bangalore', 'Munnar'],
  ['Bangalore', 'Wayanad'],
  ['Bangalore', 'Goa'],
  ['Bangalore', 'Varkala'],
  ['Mumbai', 'Goa'],
  ['Delhi', 'Manali'],
  ['Bangalore', 'Manali'],
  ['Bangalore', 'San Francisco'],
  ['Bangalore', 'Singapore'],
  ['Bangalore', 'London'],
  ['New York', 'London'],
  ['San Francisco', 'Tokyo'],
  ['Singapore', 'Bali'],
  ['Berlin', 'Bangalore'],
  ['Dubai', 'Bangalore'],
  ['Tokyo', 'Singapore'],
];

export function latLngToVec3(lat, lng, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

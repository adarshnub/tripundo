export const reservedKeywords = ['munnar', 'varkala', 'wayanad', 'goa', 'kodaikanal', 'alleppey']

export const tripundoProfiles = [
  {
    id: 'profile-aarav',
    name: 'Aarav Kumar',
    initials: 'AK',
    role: 'Senior Software Engineer',
    company: 'Razorpay',
    industry: 'Fintech',
    city: 'Bangalore',
    persona: 'Developer',
    linkedInStatus: 'verified',
    trustScore: 94,
    tripsCompleted: 8,
    interests: ['trekking', 'photography', 'coffee', 'road trips'],
    capabilities: ['driver', 'first aid', 'trek experience'],
    badges: ['Verified Professional', 'LinkedIn Connected', 'Experienced Traveler'],
  },
  {
    id: 'profile-meera',
    name: 'Meera Shah',
    initials: 'MS',
    role: 'Senior Product Manager',
    company: 'Atlassian',
    industry: 'SaaS',
    city: 'Bangalore',
    persona: 'Product',
    linkedInStatus: 'verified',
    trustScore: 89,
    tripsCompleted: 6,
    interests: ['coastal trips', 'sunrise hikes', 'food trails'],
    capabilities: ['navigator', 'photographer'],
    badges: ['Verified Professional', 'LinkedIn Connected'],
  },
  {
    id: 'profile-dev',
    name: 'Dev Raman',
    initials: 'DR',
    role: 'ML Engineer',
    company: 'Google',
    industry: 'AI',
    city: 'Bangalore',
    persona: 'Developer',
    linkedInStatus: 'pending',
    trustScore: 84,
    tripsCompleted: 5,
    interests: ['weekend treks', 'night drives', 'camera gear'],
    capabilities: ['driver', 'photographer'],
    badges: ['Verified Professional', 'Experienced Traveler'],
  },
  {
    id: 'profile-isha',
    name: 'Isha Nair',
    initials: 'IN',
    role: 'Founder',
    company: 'SeedLoop',
    industry: 'Climate Tech',
    city: 'Kochi',
    persona: 'Founder',
    linkedInStatus: 'verified',
    trustScore: 91,
    tripsCompleted: 7,
    interests: ['slow travel', 'founder circles', 'mountain stays'],
    capabilities: ['trip lead', 'treasurer'],
    badges: ['Verified Professional', 'LinkedIn Connected', 'Trusted Organizer'],
  },
  {
    id: 'profile-riya',
    name: 'Riya Menon',
    initials: 'RM',
    role: 'Product Designer',
    company: 'Figma',
    industry: 'Design',
    city: 'Trivandrum',
    persona: 'Designer',
    linkedInStatus: 'verified',
    trustScore: 87,
    tripsCompleted: 4,
    interests: ['coastal walks', 'sketching', 'cafes'],
    capabilities: ['photographer', 'navigator'],
    badges: ['Verified Professional', 'LinkedIn Connected'],
  },
]

export const tripundoCommunities = [
  {
    id: 'community-munnar-devs',
    name: 'Munnar',
    destination: 'Munnar',
    community_type: 'official',
    reserved_keyword: 'munnar',
    focus: 'Tea hills, misty routes, and weekend plans from Bangalore and Kochi.',
    members: 234,
    activeTrips: 18,
    trustScore: 88,
    cover_image_path:
      'https://images.unsplash.com/photo-1635756227689-01eda5140530?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    image:
      'https://images.unsplash.com/photo-1635756227689-01eda5140530?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    theme_tags: ['Tea trails', 'Weekend', 'Hill roads', 'Developers'],
    tags: ['Tea trails', 'Weekend', 'Hill roads', 'Developers'],
    created_by_profile_id: 'admin',
    createdAt: '2026-05-22',
    discussions: ['Best sunrise point near Top Station?', 'Who can drive hill roads?', 'Laptop-free weekend pledge'],
    messages: [
      { id: 'cm-munnar-1', authorId: 'profile-aarav', body: 'Anyone planning a July Munnar drive from Bangalore?', createdAt: '2026-06-04T09:00:00.000Z' },
      { id: 'cm-munnar-2', authorId: 'profile-meera', body: 'Top Station sunrise is worth it if we leave early.', createdAt: '2026-06-04T09:15:00.000Z' },
      { id: 'cm-munnar-3', authorId: 'profile-dev', body: 'I can help with route planning and fuel split.', createdAt: '2026-06-04T09:34:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1609766418204-94aae0ecf1de?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1623652672188-7aa3e014d689?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-varkala',
    name: 'Varkala',
    destination: 'Varkala',
    community_type: 'official',
    reserved_keyword: 'varkala',
    focus: 'Cliff walks, work resets, sunrise swims, and coastal planning groups.',
    members: 156,
    activeTrips: 9,
    trustScore: 81,
    cover_image_path:
      'https://images.unsplash.com/photo-1708149995661-10ddb24e016e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    image:
      'https://images.unsplash.com/photo-1708149995661-10ddb24e016e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    theme_tags: ['Cliffs', 'Coastal', 'Design', 'Sunsets'],
    tags: ['Cliffs', 'Coastal', 'Design', 'Sunsets'],
    created_by_profile_id: 'admin',
    createdAt: '2026-05-28',
    discussions: ['Cliff cafe crawl', 'Sunset sketch walk', 'Women-only coastal plan'],
    messages: [
      { id: 'cm-varkala-1', authorId: 'profile-riya', body: 'I am collecting stays near the cliff for August.', createdAt: '2026-06-03T12:00:00.000Z' },
      { id: 'cm-varkala-2', authorId: 'profile-meera', body: 'Can we create a women-in-product plan here?', createdAt: '2026-06-03T12:20:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-wayanad',
    name: 'Wayanad',
    destination: 'Wayanad',
    community_type: 'official',
    reserved_keyword: 'wayanad',
    focus: 'Forest stays, monsoon trails, quiet reset trips, and remote worker circles.',
    members: 198,
    activeTrips: 14,
    trustScore: 83,
    cover_image_path:
      'https://images.pexels.com/photos/34130875/pexels-photo-34130875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1600',
    image:
      'https://images.pexels.com/photos/34130875/pexels-photo-34130875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1600',
    theme_tags: ['Forest', 'Remote work', 'Monsoon', 'Trekking'],
    tags: ['Forest', 'Remote work', 'Monsoon', 'Trekking'],
    created_by_profile_id: 'admin',
    createdAt: '2026-05-25',
    discussions: ['Stay with stable Wi-Fi?', 'Trek difficulty check', 'Food preference poll'],
    messages: [
      { id: 'cm-wayanad-1', authorId: 'profile-isha', body: 'Wayanad is better if we keep it slow and quiet.', createdAt: '2026-06-02T11:10:00.000Z' },
      { id: 'cm-wayanad-2', authorId: 'profile-dev', body: 'I can create a date poll for July 24 vs July 31.', createdAt: '2026-06-02T11:28:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-goa-founders',
    name: 'Goa',
    destination: 'Goa',
    community_type: 'official',
    reserved_keyword: 'goa',
    focus: 'Founder resets, beach runs, coworking breaks, and coastal group plans.',
    members: 412,
    activeTrips: 31,
    trustScore: 86,
    cover_image_path:
      'https://images.unsplash.com/photo-1685271552630-9bc169185566?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    image:
      'https://images.unsplash.com/photo-1685271552630-9bc169185566?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    theme_tags: ['Founders', 'Coastal', 'Reset', 'Coworking'],
    tags: ['Founders', 'Coastal', 'Reset', 'Coworking'],
    created_by_profile_id: 'admin',
    createdAt: '2026-05-18',
    discussions: ['No-pitch dinner ideas', 'North Goa or South Goa?', 'Morning run group'],
    messages: [
      { id: 'cm-goa-1', authorId: 'profile-isha', body: 'Founder reset plan for early August?', createdAt: '2026-06-01T08:45:00.000Z' },
      { id: 'cm-goa-2', authorId: 'profile-aarav', body: 'South Goa if we want quiet. North if we want more food options.', createdAt: '2026-06-01T09:12:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-kodaikanal',
    name: 'Kodaikanal',
    destination: 'Kodaikanal',
    community_type: 'official',
    reserved_keyword: 'kodaikanal',
    focus: 'Pine forest walks, lake loops, and small calm weekend groups.',
    members: 121,
    activeTrips: 6,
    trustScore: 79,
    cover_image_path:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    theme_tags: ['Pine forest', 'Lake', 'Slow travel'],
    tags: ['Pine forest', 'Lake', 'Slow travel'],
    created_by_profile_id: 'admin',
    createdAt: '2026-06-01',
    discussions: ['Lake loop route?', 'Best bus timing from Bangalore?'],
    messages: [
      { id: 'cm-kodai-1', authorId: 'profile-riya', body: 'Kodai works well for smaller groups. Anyone interested in July?', createdAt: '2026-06-05T08:12:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-alleppey',
    name: 'Alleppey',
    destination: 'Alleppey',
    community_type: 'official',
    reserved_keyword: 'alleppey',
    focus: 'Backwater stays, calm group boats, and Kerala slow weekends.',
    members: 144,
    activeTrips: 7,
    trustScore: 82,
    cover_image_path:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    theme_tags: ['Backwaters', 'Kerala', 'Slow travel'],
    tags: ['Backwaters', 'Kerala', 'Slow travel'],
    created_by_profile_id: 'admin',
    createdAt: '2026-06-03',
    discussions: ['Houseboat or homestay?', 'Can we keep this budget friendly?'],
    messages: [
      { id: 'cm-alleppey-1', authorId: 'profile-meera', body: 'Backwater weekend sounds perfect after a release week.', createdAt: '2026-06-05T13:42:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-weekend-hikers-kerala',
    name: 'Weekend Hikers Kerala',
    destination: 'Kerala',
    community_type: 'user_created',
    reserved_keyword: null,
    focus: 'Short hikes for people who can leave Friday night and return Sunday.',
    members: 58,
    activeTrips: 4,
    trustScore: 76,
    cover_image_path:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    theme_tags: ['Hiking', 'Kerala', 'Weekend'],
    tags: ['Hiking', 'Kerala', 'Weekend'],
    created_by_profile_id: 'profile-dev',
    createdAt: '2026-06-04',
    discussions: ['Beginner-friendly trek list', 'First aid volunteers?'],
    messages: [
      { id: 'cm-hikers-1', authorId: 'profile-dev', body: 'Creating a lightweight hiking group for Kerala weekend trails.', createdAt: '2026-06-05T15:00:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-beach-hopping-south',
    name: 'Beach Hopping South India',
    destination: 'South India',
    community_type: 'user_created',
    reserved_keyword: null,
    focus: 'Weekend beach-hopping circles across Varkala, Gokarna, Pondy, and Goa.',
    members: 73,
    activeTrips: 5,
    trustScore: 74,
    cover_image_path:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    theme_tags: ['Beaches', 'Coastal', 'South India'],
    tags: ['Beaches', 'Coastal', 'South India'],
    created_by_profile_id: 'profile-riya',
    createdAt: '2026-06-02',
    discussions: ['Varkala vs Gokarna for first plan?'],
    messages: [
      { id: 'cm-beach-1', authorId: 'profile-riya', body: 'Let us keep this group for coastal plan ideas across South India.', createdAt: '2026-06-05T16:10:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'community-digital-nomads-goa',
    name: 'Digital Nomads Goa',
    destination: 'Goa',
    community_type: 'user_created',
    reserved_keyword: null,
    focus: 'Work-friendly stays, cafe routes, and weekday-to-weekend travel plans.',
    members: 96,
    activeTrips: 8,
    trustScore: 78,
    cover_image_path:
      'https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?auto=format&fit=crop&w=1600&q=85',
    image:
      'https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?auto=format&fit=crop&w=1600&q=85',
    theme_tags: ['Nomads', 'Goa', 'Coworking'],
    tags: ['Nomads', 'Goa', 'Coworking'],
    created_by_profile_id: 'profile-isha',
    createdAt: '2026-06-05',
    discussions: ['Best weekly stay near cafes?'],
    messages: [
      { id: 'cm-nomads-1', authorId: 'profile-isha', body: 'This group is for coworking-friendly Goa plans.', createdAt: '2026-06-05T18:20:00.000Z' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

export const tripundoTrips = [
  {
    id: 'trip-munnar-sprint',
    communityId: 'community-munnar-devs',
    title: 'Munnar Mist Sprint',
    destination: 'Munnar',
    route: 'Bangalore -> Munnar',
    startDate: '2026-07-10',
    endDate: '2026-07-13',
    pickup: 'Indiranagar Metro',
    budget: 'Moderate',
    status: 'planning',
    groupType: 'Mixed',
    seats: 9,
    seatsAvailable: 3,
    planMembers: ['profile-aarav', 'profile-meera', 'profile-dev', 'profile-isha'],
    memberStatuses: [
      { profileId: 'profile-aarav', status: 'confirmed' },
      { profileId: 'profile-meera', status: 'confirmed' },
      { profileId: 'profile-dev', status: 'interested' },
      { profileId: 'profile-isha', status: 'interested' },
    ],
    confirmedParticipants: ['profile-aarav', 'profile-meera'],
    organizerId: 'profile-aarav',
    organizer: 'Aarav Kumar',
    matchScore: 92,
    groupTrustScore: 87,
    lifecycleMoment: 'Planning',
    planStatus: 'Planning group open',
    resources: ['Car available', 'Driver available', 'First aid volunteer required'],
    icebreakers: ['What is one work topic banned for this trip?', 'Coffee stop or sunrise stop first?'],
    chatMessages: [
      { id: 'msg-munnar-1', authorId: 'profile-aarav', body: 'I created this plan for a Bangalore to Munnar weekend run. Anyone interested can join the planning chat.', createdAt: '2026-06-06T03:00:00.000Z' },
      { id: 'msg-munnar-2', authorId: 'profile-meera', body: 'I can make July 10-13. Can we finalize rooms before starting the trip?', createdAt: '2026-06-06T03:04:00.000Z' },
      { id: 'msg-munnar-3', authorId: 'profile-dev', body: 'I am in for the drive. I can take one car and share fuel expenses.', createdAt: '2026-06-06T03:08:00.000Z' },
    ],
    timeline: [
      { label: 'Plan opened', detail: 'Community discussion started', status: 'done' },
      { label: 'Date poll', detail: 'July 10-13 leading', status: 'active' },
      { label: 'Trip start', detail: 'Indiranagar pickup', status: 'upcoming' },
      { label: 'Destination reached', detail: 'Munnar tea hills', status: 'upcoming' },
    ],
    checklist: ['Confirm drivers', 'Book homestay', 'Fuel split', 'First aid kit', 'Rain jackets'],
    expenses: [
      { category: 'Fuel', amount: 5200, paidBy: 'Aarav' },
      { category: 'Stay advance', amount: 9000, paidBy: 'Meera' },
    ],
  },
  {
    id: 'trip-wayanad-remote',
    communityId: 'community-wayanad',
    title: 'Wayanad Remote Reset',
    destination: 'Wayanad',
    route: 'Bangalore -> Wayanad',
    startDate: '2026-07-24',
    endDate: '2026-07-27',
    pickup: 'Koramangala Social',
    budget: 'Budget',
    status: 'planning',
    groupType: 'Mixed',
    seats: 8,
    seatsAvailable: 2,
    planMembers: ['profile-isha', 'profile-aarav', 'profile-dev'],
    memberStatuses: [
      { profileId: 'profile-isha', status: 'confirmed' },
      { profileId: 'profile-aarav', status: 'interested' },
      { profileId: 'profile-dev', status: 'interested' },
    ],
    confirmedParticipants: ['profile-isha'],
    organizerId: 'profile-isha',
    organizer: 'Isha Nair',
    matchScore: 88,
    groupTrustScore: 84,
    lifecycleMoment: 'Route planning',
    planStatus: 'Date not finalized',
    resources: ['Photographer required', 'Trek leader required'],
    icebreakers: ['Remote-work confession round', 'One place you want to go offline'],
    chatMessages: [
      { id: 'msg-wayanad-1', authorId: 'profile-isha', body: 'This is an open planning group for Wayanad. Join freely, discuss dates, then confirm only if you are traveling.', createdAt: '2026-06-06T03:12:00.000Z' },
      { id: 'msg-wayanad-2', authorId: 'profile-aarav', body: 'Can we compare July 24 vs July 31 before finalizing?', createdAt: '2026-06-06T03:15:00.000Z' },
    ],
    timeline: [
      { label: 'Plan opened', detail: 'Remote reset idea posted', status: 'done' },
      { label: 'Date poll', detail: 'Two weekends open', status: 'active' },
      { label: 'Stay shortlist', detail: 'Forest homestay options', status: 'upcoming' },
    ],
    checklist: ['Pick date', 'Shortlist stay', 'Food preference poll', 'Route check'],
    expenses: [{ category: 'Stay estimate', amount: 6400, paidBy: 'Pending' }],
  },
  {
    id: 'trip-varkala-women',
    communityId: 'community-varkala',
    title: 'Varkala Women in Product',
    destination: 'Varkala',
    route: 'Kochi -> Varkala',
    startDate: '2026-08-07',
    endDate: '2026-08-10',
    pickup: 'Kochi Airport',
    budget: 'Premium',
    status: 'started',
    groupType: 'Women Only',
    seats: 10,
    seatsAvailable: 4,
    planMembers: ['profile-meera', 'profile-isha', 'profile-riya'],
    memberStatuses: [
      { profileId: 'profile-meera', status: 'confirmed' },
      { profileId: 'profile-isha', status: 'confirmed' },
      { profileId: 'profile-riya', status: 'confirmed' },
    ],
    confirmedParticipants: ['profile-meera', 'profile-isha', 'profile-riya'],
    organizerId: 'profile-meera',
    organizer: 'Meera Shah',
    matchScore: 86,
    groupTrustScore: 90,
    lifecycleMoment: 'Trip started',
    planStatus: 'Trip started',
    resources: ['Trip lead assigned', 'Treasurer assigned'],
    icebreakers: ['Best product lesson from travel?', 'Sunrise yoga or cliff walk?'],
    chatMessages: [
      { id: 'msg-varkala-1', authorId: 'profile-meera', body: 'Women-only Varkala plan is open. Join this planning group first; final travelers will be locked when we start.', createdAt: '2026-06-06T03:18:00.000Z' },
    ],
    timeline: [
      { label: 'Plan opened', detail: 'Women in Product route created', status: 'done' },
      { label: 'Travelers confirmed', detail: '3 travelers confirmed', status: 'done' },
      { label: 'Trip started', detail: 'Kochi pickup complete', status: 'active' },
      { label: 'Reach Varkala', detail: 'Cliff check-in', status: 'upcoming' },
    ],
    checklist: ['Airport pickup', 'Stay check-in', 'Cliff walk', 'Expense split'],
    expenses: [
      { category: 'Cab', amount: 2800, paidBy: 'Meera' },
      { category: 'Stay', amount: 12000, paidBy: 'Isha' },
    ],
  },
  {
    id: 'trip-goa-founder-reset',
    communityId: 'community-goa-founders',
    title: 'Goa Founder Reset',
    destination: 'Goa',
    route: 'Bangalore -> Goa',
    startDate: '2026-08-21',
    endDate: '2026-08-24',
    pickup: 'Bangalore airport',
    budget: 'Premium',
    status: 'planning',
    groupType: 'Mixed',
    seats: 8,
    seatsAvailable: 5,
    planMembers: ['profile-isha', 'profile-aarav'],
    memberStatuses: [
      { profileId: 'profile-isha', status: 'confirmed' },
      { profileId: 'profile-aarav', status: 'interested' },
    ],
    confirmedParticipants: ['profile-isha'],
    organizerId: 'profile-isha',
    organizer: 'Isha Nair',
    matchScore: 90,
    groupTrustScore: 86,
    lifecycleMoment: 'Planning',
    planStatus: 'Planning group open',
    resources: ['No-pitch dinner', 'Morning run', 'Coworking cafe'],
    icebreakers: ['One thing you are trying to stop overthinking?'],
    chatMessages: [
      { id: 'msg-goa-1', authorId: 'profile-isha', body: 'This reset is for founders who need three calm days without pitch talk.', createdAt: '2026-06-06T04:18:00.000Z' },
    ],
    timeline: [
      { label: 'Plan opened', detail: 'Founder reset idea posted', status: 'done' },
      { label: 'Confirm travelers', detail: 'Need 4 more confirmed', status: 'active' },
    ],
    checklist: ['Pick stay', 'Choose beach run route', 'Dinner poll'],
    expenses: [{ category: 'Stay estimate', amount: 18000, paidBy: 'Pending' }],
  },
]

export const storyTemplates = [
  { id: 'planned', moment: 'Trip planned', format: 'story', size: '1080x1920', theme: 'cinematic', caption: 'Trip planned with verified travelers. #Tripundo #TechTravel' },
  { id: 'starting', moment: 'Starting now', format: 'story', size: '1080x1920', theme: 'route-map', caption: 'Starting the route with a verified Tripundo group. #WeekendTrip #Tripundo' },
  { id: 'reached', moment: 'Reached destination', format: 'feed-portrait', size: '1080x1350', theme: 'destination', caption: 'Reached the destination with people we actually trust. #Tripundo' },
  { id: 'completed', moment: 'Trip completed', format: 'square', size: '1080x1080', theme: 'trust-score', caption: 'Trip completed. Trust earned through real journeys. #Tripundo #TechTravel' },
]

export const adminMetrics = {
  totalUsers: 1284,
  verifiedUsers: 914,
  tripsCreated: 126,
  tripsCompleted: 48,
  activeCommunities: tripundoCommunities.length,
  reportsPending: 4,
  verificationRate: 71,
  safetyIncidentRate: 1.2,
}

export function calculateTrustScore({
  identityVerified = true,
  linkedInVerified = false,
  completedTrips = 0,
  averageRating = 0,
  activeReports = 0,
} = {}) {
  const identity = identityVerified ? 25 : 0
  const linkedIn = linkedInVerified ? 20 : 0
  const trips = Math.min(20, completedTrips * 4)
  const ratings = Math.round(Math.min(25, (averageRating / 5) * 25))
  const safety = activeReports === 0 ? 10 : 0
  return identity + linkedIn + trips + ratings + safety
}

export function calculateMatchScore(profile, trip) {
  const profileWords = [...profile.interests, ...profile.capabilities, profile.persona].join(' ').toLowerCase()
  const tripWords = [...trip.resources, ...trip.icebreakers, trip.title, trip.destination].join(' ').toLowerCase()
  const overlaps = profileWords
    .split(/\W+/)
    .filter((word) => word.length > 3 && tripWords.includes(word))

  return Math.min(98, Math.max(64, 76 + overlaps.length * 4 + Math.round(profile.trustScore / 12)))
}

export function getCommunityById(id) {
  return tripundoCommunities.find((community) => community.id === id)
}

export function getTripsForCommunity(communityId) {
  return tripundoTrips.filter((trip) => trip.communityId === communityId)
}

export function getProfileById(id) {
  return tripundoProfiles.find((profile) => profile.id === id)
}

export function getTripundoBootstrap() {
  return {
    source: 'demo',
    currentUser: tripundoProfiles[0],
    profiles: tripundoProfiles,
    communities: tripundoCommunities,
    trips: tripundoTrips,
    storyTemplates,
    reservedKeywords,
    adminMetrics,
    notifications: [
      'Munnar has 2 active planning groups.',
      'Digital Nomads Goa was created by Isha.',
      'Varkala Women in Product started its trip.',
    ],
  }
}

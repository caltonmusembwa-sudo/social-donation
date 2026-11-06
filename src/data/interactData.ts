import { 
  SupplyPledgeTier, SchoolLeaderboardEntry, SuccessStory, 
  ClubContentItem, AdCreative, GalleryPhoto, DailyInspirationalQuote 
} from '../types/interactClub';

export const USER_ACCOUNT_EMAIL = 'caltonmusembwa@gmail.com';
export const CLUB_DOMAIN = 'ouinteract.org';
export const SCHOOL_LOGO_URL = '/assets/aistudio/onwards_e90da280.jpg';

export const DAILY_INSPIRATIONAL_QUOTES: DailyInspirationalQuote[] = [
  {
    id: 'quote-mother-teresa',
    quote: 'If you can’t feed a hundred people, then feed just ONE.',
    author: 'Mother Teresa',
    roleOrContext: 'Humanitarian & Nobel Peace Laureate',
    subtext: 'Even a single cup of warm porridge keeps a young child in class, smiling, and ready to learn.',
    imageUrl: '/assets/aistudio/a217d086298c6a2b3475f30e16b66e44_32c90be7.jpg',
    badge: 'Zero Hunger & Porridge Drive',
    accentColor: '#d97706',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    transitionType: 'zoom',
    dayLabel: 'Monday Compassion',
  },
  {
    id: 'quote-rotaract-grace',
    quote: 'Giving is the greatest act of grace.',
    author: 'Rotaract & Rotary International',
    roleOrContext: 'District 3141 / SMPL Sparx · Unite for Good',
    subtext: 'Service Above Self is not about how much we give, but how much love and care we put into giving.',
    imageUrl: '/assets/aistudio/d4884c62d2c6586ae84b9f9ee157f848_e5e11c53.jpg',
    badge: 'Rotary Service Above Self',
    accentColor: '#1d4ed8',
    badgeColor: 'bg-blue-600/20 text-blue-300 border-blue-500/40',
    transitionType: 'flip',
    dayLabel: 'Wednesday Fellowship',
  },
  {
    id: 'quote-power-to-help',
    quote: 'You have the power to help. No amount is too small to give.',
    author: 'O&U Interact Youth Movement',
    roleOrContext: 'Onwards & Upwards Secondary School Outreach',
    subtext: 'One exercise book, one geometry set, or one uniform can restore a student’s pride for a full year.',
    imageUrl: '/assets/aistudio/f3f9a9fa5773f8b7ea3c000433cdc696_51636620.jpg',
    badge: 'Scholastic Materials Drive',
    accentColor: '#f59e0b',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    transitionType: 'slide',
    dayLabel: 'Friday Action',
  },
  {
    id: 'quote-charity-jar',
    quote: 'Charity gathers in drops of kindness until a river of opportunity flows.',
    author: 'Community Care & Student Giving',
    roleOrContext: 'Physical Supplies & Feeder School Network',
    subtext: 'When students and teachers join hands, the impossible becomes daily reality across PEAS schools.',
    imageUrl: '/assets/aistudio/c7d43b6ea9be122f0106a83e5e03fc23_5fdf33ba.jpg',
    badge: 'Collective Community Action',
    accentColor: '#e11d48',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    transitionType: 'bounce',
    dayLabel: 'Weekend Gratitude',
  },
];

export const COMMUNITY_GALLERY_IMAGES: GalleryPhoto[] = [
  {
    id: 'gal-q1',
    title: 'Daily Quote: If You Can’t Feed a Hundred, Feed Just ONE',
    category: 'Everyday Quotes & Inspiration',
    imageUrl: '/assets/aistudio/a217d086298c6a2b3475f30e16b66e44_32c90be7.jpg',
    caption: 'Mother Teresa reminder inspiring our school porridge and student lunch outreach.',
    featured: true,
  },
  {
    id: 'gal-q2',
    title: 'Daily Quote: Giving is the Greatest Act of Grace',
    category: 'Everyday Quotes & Inspiration',
    imageUrl: '/assets/aistudio/d4884c62d2c6586ae84b9f9ee157f848_e5e11c53.jpg',
    caption: 'Official Rotary and Rotaract motto reminding students to lead with grace and service.',
    featured: true,
  },
  {
    id: 'gal-q3',
    title: 'Daily Quote: You Have the Power to Help',
    category: 'Everyday Quotes & Inspiration',
    imageUrl: '/assets/aistudio/f3f9a9fa5773f8b7ea3c000433cdc696_51636620.jpg',
    caption: 'No amount is too small to give — student hands uplifting young hearts.',
    featured: true,
  },
  {
    id: 'gal-q4',
    title: 'Daily Quote: The Charity Jar of Kindness',
    category: 'Everyday Quotes & Inspiration',
    imageUrl: '/assets/aistudio/c7d43b6ea9be122f0106a83e5e03fc23_5fdf33ba.jpg',
    caption: 'Every single notebook, pencil, and pair of shoes contributed changes a child’s life.',
    featured: true,
  },
  {
    id: 'gal-1',
    title: 'PEAS Samling Nama High School Community Visit',
    category: 'Partner Visits',
    imageUrl: '/assets/aistudio/Peas_Sampling_Nama_High_School_Visit_cce89195.png',
    caption: 'Official delegation and school leaders coming together in front of the PEAS Samling Nama High School campus.',
    featured: true,
  },
  {
    id: 'gal-2',
    title: 'Student Voice & Assembly Address',
    category: 'Student Leaders',
    imageUrl: '/assets/aistudio/images__3__245ac07c.jpg',
    caption: 'O&U Interact student leaders addressing peers and teachers in school uniform during the term assembly.',
    featured: true,
  },
  {
    id: 'gal-3',
    title: 'Teacher & Student Athlete Mentorship',
    category: 'Campus & Teachers',
    imageUrl: '/assets/aistudio/images__1__9b1711cc.jpg',
    caption: 'Head athletics coach Marcus and student runner celebrating sports achievement and team solidarity.',
    featured: true,
  },
  {
    id: 'gal-4',
    title: 'Warm Welcome by Headteacher',
    category: 'Campus & Teachers',
    imageUrl: '/assets/aistudio/images__4__88a8e4c6.jpg',
    caption: 'Headmistress Tr. Agnes smiling proudly outside the classroom block at partner feeder school.',
    featured: true,
  },
  {
    id: 'gal-5',
    title: 'Partnership Handshake Ceremony',
    category: 'Partner Visits',
    imageUrl: '/assets/aistudio/images__2__74622b31.jpg',
    caption: 'Official partnership reception and student handshake outside the school compound with visiting partners.',
  },
  {
    id: 'gal-6',
    title: 'Educators & Advisory Team',
    category: 'Partner Visits',
    imageUrl: '/assets/aistudio/images__5__7e70cd76.jpg',
    caption: 'School advisory team and educators visiting the school grounds to review scholastic resource distribution.',
  },
  {
    id: 'gal-7',
    title: 'Dormitory & Boarding Facilities Drive',
    category: 'Facilities & Drives',
    imageUrl: '/assets/aistudio/images_ff349e97.jpg',
    caption: 'Student boarding dormitory with double bunk beds prepared for the upcoming academic semester.',
  },
  {
    id: 'gal-8',
    title: 'Our People in Action',
    category: 'Student Leaders',
    imageUrl: '/assets/aistudio/Screenshot_2026-11-04_120047_4b1e5d1b.png',
    caption: 'Community celebration banner recognizing O&U Interact mentors, educators, and youth volunteers.',
    featured: true,
  },
];

export const SUPPLY_PLEDGE_TIERS: SupplyPledgeTier[] = [
  {
    id: 'starter',
    name: 'Scholastic Starter Supply Pack',
    supplyQuantity: '1 Fully Stocked Student Backpack',
    unitLabel: 'Student Learning Kit',
    icon: '🖥️',
    description: 'Provides a heavy-duty waterproof backpack filled with 12 exercise notebooks, pens, pencils, and an Oxford mathematical set for one student.',
    tag: 'Essential Learning',
    itemsIncluded: [
      '1 Reinforced School Backpack',
      '12 Ruled Exercise Notebooks',
      '1 Complete Mathematical Instrument Set',
      'Box of Blue & Black Ballpoint Pens',
      'Sharpeners, Erasers & Rulers',
    ],
  },
  {
    id: 'lunch',
    name: 'Classroom Nutrition & Meal Consignment',
    supplyQuantity: '1 Week Nutritious Food Supply',
    unitLabel: 'Classroom Food Hamper',
    icon: '🍲',
    description: 'Supplies bags of fortified maize flour, beans, and clean sugar to provide warm breakfast porridge and mid-day lunch for 30 pupils for an entire week.',
    tag: 'Zero Hunger',
    itemsIncluded: [
      '25kg Fortified Maize Flour (Posho)',
      '15kg Premium Dry Beans',
      '5kg Sugar & Enriched Milk Mix',
      'Clean Food Prep Containers',
    ],
  },
  {
    id: 'uniform',
    name: 'Uniform & Athletic Footwear Kit',
    supplyQuantity: '2 Pairs of Shoes & Tailored Uniforms',
    unitLabel: 'Student Dignity Kit',
    icon: '👟',
    description: 'Delivers two sets of school uniforms, sturdy regulation sports shoes, and athletic socks for two vulnerable children to restore dignity and team participation.',
    tag: 'Dignity & Sports',
    itemsIncluded: [
      '2 Tailored School Uniform Shirts & Shorts/Dresses',
      '2 Pairs of Durable Athletic Running Shoes',
      '4 Pairs of Cotton School Socks',
      'School Badge & Sports Bibs',
    ],
  },
  {
    id: 'stem',
    name: 'Digital STEM & Science Learning Kit',
    supplyQuantity: '1 Offline Science & Coding Box',
    unitLabel: 'Lab Discovery Kit',
    icon: '💻',
    description: 'Provides an offline educational tablet loaded with interactive mathematics software, physics simulations, and solar charging kit for partner school labs.',
    tag: 'Technology & STEM',
    itemsIncluded: [
      '1 Rugged Offline Educational Tablet',
      'Preloaded Khan Academy & Science Lab Library',
      'Compact Solar Power Bank Unit',
      'Protective Shockproof Carrying Case',
    ],
  },
];

export const INITIAL_SCHOOLS: SchoolLeaderboardEntry[] = [
  {
    id: 'peas-buloba',
    rank: 1,
    name: 'PEAS Onwards and Upwards Buloba (Interact Host)',
    level: 'Secondary / High School (Interact Host Campus)',
    location: 'Buloba, Kampala-Mityana Road, Wakiso District',
    district: 'Wakiso District',
    region: 'Central / Wakiso',
    progressPercent: 96,
    itemsPledgedCount: 480,
    targetCount: 633,
    metricLabel: 'Scholastic & STEM Learning Kits',
    studentsSupported: 620,
    coordinator: 'Patron David Semakula & PM Musembwa Calton',
    lat: 0.3346,
    lng: 32.4632,
    campusPhoto: '/assets/aistudio/onwards_e90da280.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 0,
      estimatedDriveTime: 'Host Campus / Outreach Headquarters',
      routeHighway: 'Kampala-Mityana Highway (A109) at Buloba Trading Centre',
      transportAccessibility: 'Directly on the main tarmac along Kampala-Mityana Rd; 25 mins by taxi/matatu from New Taxi Park Kampala.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=0.3345,32.4632',
      recommendedTransport: 'Express commuter taxi from Kampala New Taxi Park or School Outreach Bus',
    },
  },
  {
    id: 'peas-samling-nama',
    rank: 2,
    name: 'PEAS Samling Nama High School, Mpigi',
    level: 'Secondary / High School',
    location: 'Nama Trading Centre, Mpigi District',
    district: 'Mpigi District',
    region: 'Central / Mpigi',
    progressPercent: 88,
    itemsPledgedCount: 440,
    targetCount: 500,
    metricLabel: 'Student Backpacks & Science Supplies',
    studentsSupported: 540,
    coordinator: 'Tr. Agnes Namubiru & Field Lead Tr. Ronald',
    lat: 0.1780,
    lng: 32.3250,
    campusPhoto: '/assets/aistudio/Peas_Sampling_Nama_High_School_Visit_cce89195.png',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 36,
      estimatedDriveTime: '48 mins via Buloba - Mpigi Bypass / Masaka Hwy',
      routeHighway: 'Kampala - Masaka Highway to Mpigi Town, branch towards Nama',
      transportAccessibility: 'Smooth tarmac to Mpigi town, followed by 3.5km maintained marram feeder road directly to campus gate.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=0.1780,32.3250',
      recommendedTransport: 'School Van / Shared Coaster via Mpigi Bypass or taxi to Mpigi Town Stage',
    },
  },
  {
    id: 'peas-horizon-bombo',
    rank: 3,
    name: 'PEAS Horizon High School, Bombo Kalule',
    level: 'Secondary / High School',
    location: 'Bombo Kalule, Luweero District',
    district: 'Luweero District',
    region: 'Central / Luweero',
    progressPercent: 79,
    itemsPledgedCount: 395,
    targetCount: 500,
    metricLabel: 'Uniforms, Footwear & Athletics Kits',
    studentsSupported: 490,
    coordinator: 'Coach Marcus T. & Tr. Grace Nabukalu',
    lat: 0.5820,
    lng: 32.5400,
    campusPhoto: '/assets/aistudio/images__4__88a8e4c6.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 44,
      estimatedDriveTime: '1 hr 10 mins via Northern Bypass & Bombo-Gulu Hwy',
      routeHighway: 'Kampala - Gulu Highway (A104) to Kalule Trading Centre',
      transportAccessibility: 'Excellent national highway tarmac up to Kalule Stage; 600m level access road directly to school quadrangle.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=0.5820,32.5400',
      recommendedTransport: 'Luweero / Bombo bound Coasters from Bwaise or Kalerwe stage; drop at Kalule stage',
    },
  },
  {
    id: 'peas-pioneer',
    rank: 4,
    name: 'PEAS Pioneer High School',
    level: 'Secondary / High School',
    location: 'Kyegegwa / Mubende Road Corridor, Western Region',
    district: 'Kyegegwa District',
    region: 'Western Uganda',
    progressPercent: 68,
    itemsPledgedCount: 340,
    targetCount: 500,
    metricLabel: 'Science Lab Glassware & Math Sets',
    studentsSupported: 510,
    coordinator: 'Tr. Geoffrey Opondo',
    lat: 0.4850,
    lng: 31.0550,
    campusPhoto: '/assets/aistudio/images__2__74622b31.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 185,
      estimatedDriveTime: '3 hrs 15 mins via Kampala-Mityana-Mubende Highway (A109)',
      routeHighway: 'Mityana - Mubende - Kyegegwa Highway',
      transportAccessibility: 'Continuous first-class highway tarmac straight from Buloba junction through Mityana and Mubende to Kyegegwa town.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=0.4850,31.0550',
      recommendedTransport: 'Fort Portal express buses (Link / Kalita) departing daily along Mityana Road',
    },
  },
  {
    id: 'peas-sarah-ntiiro',
    rank: 5,
    name: 'PEAS Sarah Ntiiro High School',
    level: 'Secondary / High School',
    location: 'Mayuge District, Busoga Sub-Region',
    district: 'Mayuge District',
    region: 'Eastern Uganda',
    progressPercent: 62,
    itemsPledgedCount: 310,
    targetCount: 500,
    metricLabel: 'Girls Dignity Kits & Library Books',
    studentsSupported: 460,
    coordinator: 'Tr. Sarah Nabirye & Patron Brenda',
    lat: 0.4570,
    lng: 33.4800,
    campusPhoto: '/assets/aistudio/images__3__245ac07c.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 142,
      estimatedDriveTime: '2 hrs 45 mins via Jinja Expressway & Musita-Mayuge Rd',
      routeHighway: 'Kampala-Jinja Highway (A109) -> Source of Nile Bridge -> Mayuge',
      transportAccessibility: 'Tarmac highway through Jinja across the new cable-stayed bridge; paved access link right to Mayuge town centre.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=0.4570,33.4800',
      recommendedTransport: 'Eastern regional courier truck or Jinja-Iganga passenger coasters',
    },
  },
  {
    id: 'peas-noble',
    rank: 6,
    name: 'PEAS Noble High School',
    level: 'Secondary / High School',
    location: 'Kyegegwa District, Western Region',
    district: 'Kyegegwa District',
    region: 'Western Uganda',
    progressPercent: 57,
    itemsPledgedCount: 285,
    targetCount: 500,
    metricLabel: 'Boarding Mattresses & Bedding Consignments',
    studentsSupported: 430,
    coordinator: 'Tr. Moses Kintu',
    lat: 0.4780,
    lng: 31.0300,
    campusPhoto: '/assets/aistudio/images_ff349e97.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 182,
      estimatedDriveTime: '3 hrs 10 mins via Fort Portal Highway',
      routeHighway: 'Kampala - Mubende - Kyegegwa Highway',
      transportAccessibility: 'Paved highway trunk road with freight truck access and secure school delivery bay.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=0.4780,31.0300',
      recommendedTransport: 'Western transit coaches from Kampala or O&U supply convoy vehicle',
    },
  },
  {
    id: 'peas-aspire',
    rank: 7,
    name: 'PEAS Aspire High School, Ibanda',
    level: 'Secondary / High School',
    location: 'Ibanda District, Western Region',
    district: 'Ibanda District',
    region: 'Western Uganda',
    progressPercent: 52,
    itemsPledgedCount: 260,
    targetCount: 500,
    metricLabel: 'Nutritious Posho & Bean Hampers',
    studentsSupported: 520,
    coordinator: 'Sr. Beatrice Kyomugisha',
    lat: -0.1340,
    lng: 30.5010,
    campusPhoto: '/assets/aistudio/images__5__7e70cd76.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 295,
      estimatedDriveTime: '4 hrs 30 mins via Masaka-Mbarara Highway -> Ibanda branch',
      routeHighway: 'Kampala - Mbarara Highway (A109) -> Nyabuhikye - Ibanda Rd',
      transportAccessibility: 'Scenic tarmac corridor via the Equator crossing and Mbarara; supply delivery trucks run bi-weekly.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=-0.1340,30.5010',
      recommendedTransport: 'Western regional coaches via Mbarara or direct Ibanda courier van',
    },
  },
  {
    id: 'peas-lamwo-kuc',
    rank: 8,
    name: 'PEAS Lamwo Kuc High School',
    level: 'Secondary / High School',
    location: 'Padibe, Lamwo District, Northern Region',
    district: 'Lamwo District',
    region: 'Northern Uganda',
    progressPercent: 48,
    itemsPledgedCount: 240,
    targetCount: 500,
    metricLabel: 'Solar Study Lanterns & Examination Kits',
    studentsSupported: 380,
    coordinator: 'Tr. Denis Okello',
    lat: 3.5350,
    lng: 32.8050,
    campusPhoto: '/assets/aistudio/images__1__9b1711cc.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 440,
      estimatedDriveTime: '6 hrs 30 mins via Gulu Highway & Kitgum-Lamwo Rd',
      routeHighway: 'Kampala - Gulu Highway (A104) -> Gulu City -> Padibe / Lamwo',
      transportAccessibility: 'Paved national highway to Gulu and Kitgum; wide graded gravel corridor to Lamwo campus.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=3.5350,32.8050',
      recommendedTransport: 'Northern express bus to Kitgum/Padibe; drop at Lamwo Kuc junction',
    },
  },
  {
    id: 'peas-kazingo',
    rank: 9,
    name: 'PEAS Kazingo High School, Kabarole',
    level: 'Secondary / High School',
    location: 'Kabarole District, Fort Portal Sub-Region',
    district: 'Kabarole District',
    region: 'Western Uganda',
    progressPercent: 44,
    itemsPledgedCount: 220,
    targetCount: 500,
    metricLabel: 'Sports Footwear & Mathematics Sets',
    studentsSupported: 410,
    coordinator: 'Coach Ronald Walusimbi',
    lat: 0.6900,
    lng: 30.2700,
    campusPhoto: '/assets/aistudio/images__2__74622b31.jpg',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 290,
      estimatedDriveTime: '4 hrs 15 mins via Mubende - Fort Portal Scenic Highway',
      routeHighway: 'Kampala - Fort Portal Highway (A109) at the foot of Mt. Rwenzori',
      transportAccessibility: 'Spectacular tarmac highway through lush tea estates; local taxi stages available from Fort Portal city centre.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=0.6900,30.2700',
      recommendedTransport: 'Fort Portal express bus or O&U Interact sports supply outreach van',
    },
  },
  {
    id: 'peas-toroma',
    rank: 10,
    name: 'PEAS Toroma High School, Katakwi',
    level: 'Secondary / High School',
    location: 'Toroma, Katakwi District, Teso Sub-Region',
    district: 'Katakwi District',
    region: 'Eastern Uganda',
    progressPercent: 39,
    itemsPledgedCount: 195,
    targetCount: 500,
    metricLabel: 'Clean Water Storage & Chemistry Sets',
    studentsSupported: 470,
    coordinator: 'Tr. Emmanuel Olinga',
    lat: 1.7750,
    lng: 34.0200,
    campusPhoto: '/assets/aistudio/Screenshot_2026-11-04_120047_4b1e5d1b.png',
    lastUpdatedDate: '5th November 2026 (Term 3)',
    transportInfo: {
      distanceFromBulobaKm: 360,
      estimatedDriveTime: '5 hrs 45 mins via Jinja - Mbale - Soroti Highway',
      routeHighway: 'Kampala - Mbale - Soroti Highway -> Toroma access road',
      transportAccessibility: 'National highway via Mbale to Soroti; 25km wide graded gravel corridor connecting Soroti to Toroma.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=1.7750,34.0200',
      recommendedTransport: 'Eastern Soroti coaches from Qualicel / Kisenyi bus terminal; connecting taxi to Toroma',
    },
  },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    title: 'A simple pair of running shoes changed everything.',
    quote: 'Thanks to the PEAS network supply drive, our student-athletes at Horizon Bombo Kalule received proper footwear for district trials. Their confidence has skyrocketed.',
    author: 'Coach Marcus T.',
    role: 'Head Athletics Coach',
    school: 'PEAS Horizon High School, Bombo Kalule',
    impact: 'Equipped 45 track & soccer athletes with regulation shoes and safety socks.',
    image: '/assets/aistudio/images__1__9b1711cc.jpg',
    fullStory: 'Before our inter-school footwear drive, several talented runners at PEAS Horizon Bombo Kalule had to take turns sharing one worn pair of spikes or competed barefoot on gravel tracks. When the Interact Club of PEAS Onwards and Upwards Buloba mobilized alumni and community members, we delivered 45 pairs of professional trainers.\n\nAt the regional inter-school championships, two runners qualified for national secondary sports trials. Beyond trophies, their attendance rate in morning mathematics and physics classes jumped from 64% to 98% because their self-esteem and belonging were restored.',
  },
  {
    id: 'story-2',
    title: 'Hot lunches brought 120 girls back to class.',
    quote: 'When hunger gnaws at a student’s stomach by 11:00 AM, focusing on a chalkboard is impossible. Donating posho and beans turned empty desks into bustling classrooms.',
    author: 'Tr. Agnes Namubiru',
    role: 'Headmistress',
    school: 'PEAS Samling Nama High School, Mpigi',
    impact: 'Over 12,000 warm mid-day meals served this term.',
    image: '/assets/aistudio/images__4__88a8e4c6.jpg',
    fullStory: 'During the dry season, many households in Mpigi could only afford one family meal in the evening. Children were walking 4 kilometers to school without breakfast and frequently fainted during morning assemblies. The Classroom Lunch Fund bridged this urgent gap by collecting dry food items directly from generous community members to supply fortified maize, beans, and clean drinking water.',
  },
  {
    id: 'story-3',
    title: 'From zero textbooks to district coding champions.',
    quote: 'Our students had never touched a mathematical instrument set or an offline educational tablet until the PEAS Buloba consignment arrived.',
    author: 'Patron David Semakula',
    role: 'Interact Club Teacher Patron',
    school: 'PEAS Onwards and Upwards Buloba',
    impact: 'Distributed 1,200 geometry kits and 4 shared tablet stations.',
    image: '/assets/aistudio/images__3__245ac07c.jpg',
    fullStory: 'The students of PEAS Onwards and Upwards Buloba Interact Club took it upon themselves to mentor younger peers across our sister PEAS schools including Samling Nama and Pioneer High. The peer-to-peer bond made students feel loved, valued, and excited about school.',
  },
];

export const INITIAL_CLUB_CONTENT: ClubContentItem[] = [
  {
    id: 'proj-1',
    type: 'project',
    title: 'Scholastic Backpacks & Math Sets Drive',
    body: 'Supplying 4,500 exercise books, pens, and mathematical sets to students in partner PEAS schools who cannot afford examination stationery.',
    event_date: undefined,
    published: true,
    created_at: '2026-11-02T10:00:00Z',
  },
  {
    id: 'proj-2',
    type: 'project',
    title: 'Community Breakfast & Hot Porridge Outreach',
    body: 'O&U students volunteer weekly to prepare and distribute fortified porridge and bread for 150 children to prevent malnutrition.',
    event_date: undefined,
    published: true,
    created_at: '2026-11-03T08:30:00Z',
  },
  {
    id: 'proj-3',
    type: 'project',
    title: 'Footwear Dignity & Athlete Running Shoes',
    body: 'Providing 45 pairs of regulation trainers for junior student athletes at PEAS Horizon Bombo Kalule and Samling Nama.',
    event_date: undefined,
    published: true,
    created_at: '2026-11-01T14:15:00Z',
  },
  {
    id: 'event-1',
    type: 'event',
    title: 'Term 3 General Club Meeting & Assembly',
    body: 'All Interact members gather at PEAS Onwards & Upwards Buloba Main Hall to review Term 3 community outreach milestones. Guest speaker from Rotary Club.',
    event_date: '2026-11-06',
    published: true,
    created_at: '2026-11-04T09:00:00Z',
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Inter-Campus Visit to PEAS Samling Nama High School',
    body: 'Scholastic supply handover and peer mentoring visit to PEAS Samling Nama campus in Mpigi. Outreach convoy departs O&U Buloba at 8:00 AM.',
    event_date: '2026-11-14',
    published: true,
    created_at: '2026-11-04T11:00:00Z',
  },
  {
    id: 'event-3',
    type: 'event',
    title: 'Inter-School Sports Gala & Shoes Handover',
    body: 'Official ceremony handing over 45 pairs of sports shoes to PEAS Horizon Bombo Kalule and Samling Nama runners.',
    event_date: '2026-11-28',
    published: true,
    created_at: '2026-11-02T16:00:00Z',
  },
  {
    id: 'news-1',
    type: 'news',
    title: 'PEAS Uganda Interactive Transportation & Directions Hub Launched',
    body: 'New interactive geographic visualizer maps all 10 PEAS partner schools across Uganda with exact highway routes, distances from Buloba, and Google Maps directions.',
    event_date: undefined,
    published: true,
    created_at: '2026-11-05T08:00:00Z',
  },
  {
    id: 'news-2',
    type: 'news',
    title: 'PEAS Buloba & Samling Nama Lead Partner Network in Term 3 Supply Drive',
    body: 'Over 920 scholastic kits and nutrition packs have been pledged across PEAS Buloba and PEAS Samling Nama High School, achieving top ranks on the leaderboard.',
    event_date: undefined,
    published: true,
    created_at: '2026-11-04T15:30:00Z',
  },
  {
    id: 'news-3',
    type: 'news',
    title: 'Community Material Drop-off Points Open at School Office',
    body: 'Parents, alumni, and well-wishers can now drop off notebooks, pens, and dry food items directly at PEAS Onwards and Upwards Buloba Room B-12.',
    event_date: undefined,
    published: true,
    created_at: '2026-11-03T18:00:00Z',
  },
];

export const AD_CAMPAIGNS: AdCreative[] = [
  {
    id: 'ad-spotify-1',
    platform: 'spotify',
    platformName: 'Spotify Audio Ad',
    icon: '🎵',
    badgeColor: 'bg-emerald-600 text-white',
    format: '30-Second Audio Commercial + Companion Banner',
    headline: 'Every Child Deserves Tools to Learn · O&U Interact',
    targetAudience: 'Music & Podcast Listeners (Uganda & Global Diaspora, Ages 18-55, Education & Community interests)',
    scriptOrCopy: `[SFX: School bell rings softly, children laughing in a classroom background]

VOICEOVER (Warm, inspiring tone):
"Imagine walking into school with no notebook, no pen, and no shoes. For thousands of students right here in our community, that is today's reality.

At the Interact Club of Onwards and Upwards Secondary School, we believe small actions create massive change. Through our KidsConnect community initiative, we deliver backpacks, notebooks, and healthy school lunches directly to local classrooms.

No middlemen. Just students uplifting students.

Visit ouinteract.org right now. Pledge a backpack or volunteer this Saturday.
That's O-U-Interact-dot-org. Sponsored by Rotary Youth Services."

[SFX: Gentle acoustic guitar resolve]`,
    voiceoverOrVisualDirection: 'Vocal delivery should be compassionate, articulate, and trustworthy. Background music: Uplifting acoustic fingerpicking guitar (around 105 BPM). Companion banner: 640x640px showing bold typography "Small actions. Big impact." with "Visit ouinteract.org" button.',
    callToAction: 'Pledge Supplies at ouinteract.org',
    targetUrl: 'https://ouinteract.org',
    specs: 'Audio: 30s MP3/WAV (320kbps) · Companion Banner: 640x640px JPEG · Destination URL: ouinteract.org',
    accountLaunchUrl: 'https://ads.spotify.com/',
    connectedAccount: USER_ACCOUNT_EMAIL,
  },
  {
    id: 'ad-youtube-1',
    platform: 'youtube',
    platformName: 'YouTube In-Stream & Bumper Ad',
    icon: '▶️',
    badgeColor: 'bg-red-600 text-white',
    format: '15-Second Non-Skippable & 6-Second Bumper Video Script',
    headline: 'Turn Compassion into Action · O&U Interact School Fund',
    targetAudience: 'YouTube Viewers in Uganda & East Africa, Education channels, Rotary & Non-profit content viewers',
    scriptOrCopy: `[SCENE 1 - 0:00 - 0:04]
Visual: Close-up of a student neatly packing notebooks, a geometry set, and pencils into a sturdy backpack.
On-screen text: 4,500+ CHILDREN EQUIPPED
Voiceover: "What if one backpack could keep a child in school for an entire year?"

[SCENE 2 - 0:04 - 0:09]
Visual: Secondary school student volunteers from O&U High School smiling and handing breakfast hampers to primary pupils.
On-screen text: DIRECT TO CLASSROOMS · 100% TRANSPARENT
Voiceover: "The Interact Club of Onwards and Upwards Secondary School is on a mission to equip 18 local schools."

[SCENE 3 - 0:10 - 0:15 - END CARD]
Visual: Clean graphic card displaying O&U Interact crest, URL "ouinteract.org", and call to action.
On-screen text: PLEDGE SUPPLIES · VOLUNTEER TODAY · ouinteract.org
Voiceover: "Visit ouinteract.org and pledge supplies today. Service Above Self."`,
    voiceoverOrVisualDirection: 'Visual transitions: Fast, dynamic, high-energy cuts. Text overlays in high-contrast yellow (#ffcf45) and white. End screen clickable card linked to ouinteract.org channel.',
    callToAction: 'Pledge Supplies Now',
    targetUrl: 'https://ouinteract.org',
    specs: 'Video Resolution: 1080p Full HD (16:9 1920x1080) & Shorts (9:16 1080x1920) · Length: 15s · Target: YouTube Studio / Google Ads',
    accountLaunchUrl: 'https://studio.youtube.com/',
    connectedAccount: USER_ACCOUNT_EMAIL,
  },
  {
    id: 'ad-linkedin-1',
    platform: 'linkedin',
    platformName: 'LinkedIn Sponsored Ad & Post',
    icon: '💼',
    badgeColor: 'bg-blue-700 text-white',
    format: 'Sponsored Professional Post & Alumni Outreach Carousel',
    headline: 'Empowering the Next Generation of African Leaders Through Grassroots Service',
    targetAudience: 'O&U High School Alumni, Rotary Club Members, Corporate CSR Directors, Education Philanthropists in Uganda, Kenya & Global',
    scriptOrCopy: `🌟 Leadership in Action: How O&U Secondary Students Are Transforming Local Education

At Onwards and Upwards Secondary School, the Interact Club is redefining youth-led community service.

Under the leadership of Project Manager Musembwa Calton and Club President Hagenimana Rasul, our students have launched the KidsConnect Community Outreach Platform (ouinteract.org).

Key Accomplishments to Date:
🎒 4,500+ primary pupils equipped with examination scholastic materials
🍎 12,000+ nutritious hot lunches served in partnership with local cooperatives
🏫 18 partner schools enrolled across our regional School Zone
🤝 100% transparent community supply pipeline with direct teacher verification

Are you an O&U alumnus, a corporate partner, or a friend of Rotary?
We invite you to partner with our student leadership team. Whether by pledging scholastic kits, sponsoring classroom breakfast consignments, or mentoring our STEM students, your engagement creates measurable impact.

🔗 Read our official Administration Proposal and pledge supplies at: https://ouinteract.org

#YouthLeadership #InteractClub #RotaryInternational #ServiceAboveSelf #UgandaEducation #CSR #CommunityImpact #STEMEducation`,
    voiceoverOrVisualDirection: 'Include high-contrast branded carousel slides: Slide 1: Mission Statement, Slide 2: Scholastic Backpack Drive, Slide 3: School Leaderboard, Slide 4: Student Leadership Team, Slide 5: CTA to ouinteract.org.',
    callToAction: 'Partner with O&U Interact',
    targetUrl: 'https://ouinteract.org',
    specs: 'Single Image / Carousel: 1200x627px or 1080x1080px · Copy: 150-250 words · Target: LinkedIn Campaign Manager',
    accountLaunchUrl: 'https://www.linkedin.com/campaignmanager/',
    connectedAccount: USER_ACCOUNT_EMAIL,
  },
  {
    id: 'ad-netlify-1',
    platform: 'netlify',
    platformName: 'Netlify Web Promo & Embed Banner',
    icon: '🌐',
    badgeColor: 'bg-teal-700 text-white',
    format: 'Embeddable Web Badge & 728x90 Leaderboard / 300x250 Display Widget',
    headline: 'Fast, Accessible Community Giving Powered by O&U Interact on Netlify',
    targetAudience: 'Visitors across school partner portals, student blogs, community newsletters, and web partner sites',
    scriptOrCopy: `<!-- O&U Interact Official Community Web Badge -->
<div style="font-family:'DM Sans',sans-serif; background:#17223b; color:#fff; padding:20px; border-radius:16px; border:2px solid #ffcf45; max-width:400px; text-align:center;">
  <span style="background:#ffcf45; color:#15244a; font-weight:800; font-size:11px; padding:3px 8px; border-radius:6px; letter-spacing:1px;">O&U INTERACT</span>
  <h3 style="font-family:'Outfit',sans-serif; font-size:20px; margin:12px 0 6px; color:#fff;">Every Child Thrives When a Community Cares</h3>
  <p style="font-size:12px; color:#d8e3ff; line-height:1.6; margin-bottom:15px;">Pledge student backpacks, school meals, and athletic shoes directly to 18 partner schools.</p>
  <a href="https://ouinteract.org" style="display:inline-block; background:#ffcf45; color:#17223b; font-weight:800; text-decoration:none; padding:10px 20px; border-radius:24px; font-size:12px;">Pledge Supplies on ouinteract.org →</a>
</div>`,
    voiceoverOrVisualDirection: 'Lightweight, responsive HTML/CSS widget ready to be pasted on school portals, PTA email newsletters, or hosted via Netlify continuous deployment.',
    callToAction: 'Deploy & Embed Web Widget',
    targetUrl: 'https://ouinteract.org',
    specs: 'HTML/CSS responsive snippet · Iframe embed · 728x90px leaderboard & 300x250px rectangle · Hostable on Netlify',
    accountLaunchUrl: 'https://app.netlify.com/',
    connectedAccount: USER_ACCOUNT_EMAIL,
  },
  {
    id: 'ad-instagram-1',
    platform: 'instagram',
    platformName: 'Instagram & TikTok Short-Form Ad',
    icon: '📱',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    format: '9:16 Vertical Story & Reel Video Script',
    headline: 'Join the Movement · Small Actions, Big Impact',
    targetAudience: 'Youth, Students, Parents & Rotary Community on Instagram / TikTok (Ages 16-45)',
    scriptOrCopy: `[HOOK - 0:00 - 0:03]
Text on screen: "POV: You and your classmates decided to feed 600 kids this weekend."
[Audio: Trending energetic lofi beats]

[MIDDLE - 0:03 - 0:10]
Text on screen:
"🎒 4,500+ Backpacks delivered
🍎 12,000+ Hot school meals served
👟 45 Athletes equipped with running shoes"
Creator voiceover: "You don't need a million dollars to make a real difference in someone's life. You just need a willing heart and a dedicated team."

[CALL TO ACTION - 0:10 - 0:15]
Text on screen: "Link in bio to pledge school supplies or volunteer 👉 ouinteract.org"
Creator voiceover: "Head to our link in bio at ouinteract.org to join the O&U Interact movement today!"`,
    voiceoverOrVisualDirection: 'High energy, authentic, peer-to-peer student tone. Fast text animation matching the beat.',
    callToAction: 'Tap Link in Bio (ouinteract.org)',
    targetUrl: 'https://ouinteract.org',
    specs: 'Aspect Ratio: 9:16 (1080x1920) · Duration: 15-30s · Platforms: Instagram Reels, Stories & TikTok Ads',
    accountLaunchUrl: 'https://adsmanager.facebook.com/',
    connectedAccount: USER_ACCOUNT_EMAIL,
  },
];

export const FORMAL_PROPOSAL = {
  to: 'The Headteacher / School Administration',
  from: 'The Interact Club Project Manager',
  authors: [
    { name: 'MUSEMBWA CALTON', role: 'PROJECT MANAGER, INTERACT CLUB' },
    { name: 'HAGENIMANA RASUL', role: 'CLUB PRESIDENT' },
  ],
  date: '19TH/10/2026',
  subject: 'Proposal for the Interact Club Donation and Community Outreach Website',
  sections: [
    {
      number: '1',
      title: 'Executive Summary',
      content: 'The Interact Club seeks approval to develop and launch an official school-backed website dedicated to managing, tracking, and expanding our charity supply donation programs. This digital initiative will modernize our community service projects, increase transparency, and elevate our school\'s reputation as a tech-forward leader in humanitarian service.\n\nBy building this platform, we will transform our traditional donation drives into a seamless, highly organized digital experience that inspires students, parents, and alumni to contribute physical supplies and volunteer generously.',
    },
    {
      number: '2',
      title: 'Project Vision & Rationale',
      content: 'In the digital age, impact is driven by accessibility. While our physical donation drives are successful, they are limited by geographic reach and manual tracking. This website will serve as a centralized hub for all Interact Club charity initiatives, providing several key advantages:\n\n• Global Reach: Allows alumni, parents, and well-wishers to support our school\'s charitable causes from anywhere in the country and abroad.\n• Radical Transparency: Real-time progress bars and impact blogs will show donors exactly how their contributions are changing lives, building immense trust.\n• Skill Development: Our own students will assist in designing, writing content for, and managing the website, fostering valuable STEM and leadership skills.',
    },
    {
      number: '3',
      title: 'Key Features of the Website',
      content: 'The platform will be designed with a user-friendly, highly engaging interface featuring:\n\n• Active Campaigns Page: Dedicated sections for ongoing programmes (e.g., student supplies pledge, disaster relief, or community feeding programs).\n• The "Interact Stories" Blog: A gallery of photo and video essays showcasing our students actively volunteering in the community, providing excellent public relations for the school.\n• Frictionless Supply Pledging: Clear itemized supply hampers (backpacks, books, meals, sports footwear) with verifiable drop-off receipts.',
    },
    {
      number: '4',
      title: 'Alignment with School Values & Prestige',
      content: 'This project directly reflects our school’s mission to nurture compassionate, responsible global citizens.\n\n• Elevating the School\'s Brand: A modern, public-facing charity website positions our institution as a beacon of empathy, innovation, and social responsibility.\n• Strengthening Alumni Relations: It gives our alumni network a direct, meaningful way to stay connected and give back to their alma mater\'s legacy of service.',
    },
    {
      number: '5',
      title: 'Implementation & Safety Plan',
      content: 'We understand that security, privacy, and moderation are paramount. We will implement the following safeguards:\n\n• Administrative Oversight: No content, photo, or announcement will go live without prior review and written approval from the Interact Club Patron or a designated administrator.\n• Data Privacy: Strict adherence to data protection laws, ensuring student identities and volunteer information are fully secured.\n• Phased Rollout:\n  - Phase 1: Website design and internal testing (4 weeks).\n  - Phase 2: Administrative review and feedback integration (1 week).\n  - Phase 3: Official launch during a school assembly.',
    },
    {
      number: '6',
      title: 'Conclusion & Request for Approval',
      content: 'This website is more than just a digital tool—it is a launchpad for our students to create measurable change in the world while making our school community immensely proud. With your visionary leadership and support, we can take the Interact Club\'s legacy to unprecedented heights.\n\nWe respectfully request your approval to begin the design phase of this project under the supervision of our club patron.\n\nSincerely,\nMUSEMBWA CALTON — PROJECT MANAGER, INTERACT CLUB\nHAGENIMANA RASUL — CLUB PRESIDENT',
    },
  ],
};

export interface InteractBlogPost {
  id: string;
  title: string;
  category: 'Community Feeding' | 'Disaster Relief' | 'Student Outreach' | 'STEM & Skills';
  date: string;
  author: string;
  authorRole: string;
  summary: string;
  content: string;
  keyHighlight: string;
  imageUrl?: string;
}

export const INTERACT_BLOG_POSTS: InteractBlogPost[] = [
  {
    id: 'blog-1',
    title: 'Community Feeding Outreach: O&U Students Serve 600 Hot Porridge Cups in Katanga',
    category: 'Community Feeding',
    date: '28th October 2026',
    author: 'Musembwa Calton',
    authorRole: 'Project Manager, Interact Club',
    summary: 'Our student volunteers spent Saturday morning distributing nutritious hot breakfast and grain parcels to 150 families and primary pupils.',
    content: 'Leadership in action means getting our hands into community service. Early Saturday morning, 24 Interact Club members from O&U High School loaded posho bags, milk, and sugar into our school outreach van.\n\nWorking alongside community youth leaders, our team served over 600 warm cups of porridge to children who had not had a morning meal. Seeing our fellow secondary students cheerfully serving younger peers is the greatest testament to the Interact motto of Service Above Self.',
    keyHighlight: '150 families supported · 24 student volunteers mobilized',
    imageUrl: '/assets/aistudio/images__4__88a8e4c6.jpg',
  },
  {
    id: 'blog-2',
    title: 'Emergency Disaster Relief: Assisting Flash Flood Victims with Dry Scholastic Packs',
    category: 'Disaster Relief',
    date: '15th October 2026',
    author: 'Hagenimana Rasul',
    authorRole: 'Club President',
    summary: 'Following heavy seasonal downpours that inundated 3 primary schools, our club mobilized emergency replacement exercise books and dry uniforms.',
    content: 'When unexpected flash floods soaked classrooms and destroyed textbooks at two partner primary schools last week, the Interact Club convened an emergency planning meeting supervised by our Patron.\n\nWithin 72 hours, using our emergency disaster reserve fund, we dispatched waterproof supply containers with 800 exercise books, 200 mathematical sets, and replacement uniforms to ensure lessons continued without interruption.',
    keyHighlight: '800 exercise books replaced · 72-hour turnaround time',
    imageUrl: '/assets/aistudio/images__2__74622b31.jpg',
  },
  {
    id: 'blog-3',
    title: 'Student STEM & Web Design: How O&U High Students Built Our Giving Platform',
    category: 'STEM & Skills',
    date: '20th October 2026',
    author: 'Musembwa Calton & Tech Committee',
    authorRole: 'Interact Project & STEM Committee',
    summary: 'Applying computer studies lessons to real-world humanitarian software engineering, data privacy, and digital payment integrations.',
    content: 'As detailed in our proposal to the School Administration, this website serves as a practical STEM lab. Senior students handled UX wireframing, QR payment flow testing, and data validation rules under the mentorship of our computer science faculty.\n\nDeveloping real-world platforms empowers us with market-ready software engineering, financial accountability, and team management skills.',
    keyHighlight: '100% student-designed · Verified by Rotary Youth Advisors',
    imageUrl: '/assets/aistudio/images__3__245ac07c.jpg',
  },
];


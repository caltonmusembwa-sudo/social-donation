import { 
  SupplyPledgeTier, SchoolLeaderboardEntry, SuccessStory, 
  ClubContentItem, AdCreative, GalleryPhoto 
} from '../types/interactClub';

export const USER_ACCOUNT_EMAIL = 'caltonmusembwa@gmail.com';
export const CLUB_DOMAIN = 'ouinteract.org';
export const SCHOOL_LOGO_URL = '/assets/aistudio/onwards_e90da280.jpg';

export const COMMUNITY_GALLERY_IMAGES: GalleryPhoto[] = [
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
    icon: '🎒',
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
    icon: '🍎',
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
    id: 'school-1',
    rank: 1,
    name: 'Maplewood Primary (Elementary)',
    level: 'Primary School',
    location: 'Central District',
    progressPercent: 90,
    itemsPledgedCount: 450,
    targetCount: 500,
    metricLabel: 'Backpacks & Kits Pledged',
    studentsSupported: 420,
    coordinator: 'Tr. Agnes Namubiru',
    lat: 0.3476,
    lng: 32.5825,
  },
  {
    id: 'school-2',
    rank: 2,
    name: 'Riverdale Junior School (Middle)',
    level: 'Junior / Middle',
    location: 'East Valley Division',
    progressPercent: 72,
    itemsPledgedCount: 360,
    targetCount: 500,
    metricLabel: 'Shoes & Uniforms Pledged',
    studentsSupported: 365,
    coordinator: 'Coach Marcus T.',
    lat: 0.3325,
    lng: 32.6100,
  },
  {
    id: 'school-3',
    rank: 3,
    name: 'Oakridge High School',
    level: 'Secondary',
    location: 'North Hill Sector',
    progressPercent: 50,
    itemsPledgedCount: 250,
    targetCount: 500,
    metricLabel: 'Science & Math Kits Pledged',
    studentsSupported: 290,
    coordinator: 'Tr. Geoffrey Opondo',
    lat: 0.3680,
    lng: 32.5710,
  },
  {
    id: 'school-4',
    rank: 4,
    name: 'O&U High School (Interact Host)',
    level: 'High School',
    location: 'Main Campus',
    progressPercent: 42,
    itemsPledgedCount: 210,
    targetCount: 500,
    metricLabel: 'Community Supply Packs Pledged',
    studentsSupported: 215,
    coordinator: 'Patron David Semakula',
    lat: 0.3390,
    lng: 32.5650,
  },
  {
    id: 'school-5',
    rank: 5,
    name: 'St. Jude Community Academy',
    level: 'Primary & Nursery',
    location: 'Westside Settlement',
    progressPercent: 38,
    itemsPledgedCount: 190,
    targetCount: 500,
    metricLabel: 'Nutrition Rations Pledged',
    studentsSupported: 180,
    coordinator: 'Sr. Beatrice Kyomugisha',
    lat: 0.3180,
    lng: 32.5450,
  },
  {
    id: 'school-6',
    rank: 6,
    name: 'Katanga Community Feeder School',
    level: 'Primary School',
    location: 'Katanga Valley',
    progressPercent: 35,
    itemsPledgedCount: 175,
    targetCount: 500,
    metricLabel: 'Hot Porridge Bowls Pledged',
    studentsSupported: 160,
    coordinator: 'Tr. Moses Kintu',
    lat: 0.3340,
    lng: 32.5740,
  },
  {
    id: 'school-7',
    rank: 7,
    name: 'Bwaise Valley Day School',
    level: 'Primary School',
    location: 'Bwaise North',
    progressPercent: 30,
    itemsPledgedCount: 150,
    targetCount: 500,
    metricLabel: 'Flood Relief Book Packs Pledged',
    studentsSupported: 140,
    coordinator: 'Tr. Sarah Nabirye',
    lat: 0.3600,
    lng: 32.5600,
  },
  {
    id: 'school-8',
    rank: 8,
    name: 'Kasubi Youth Academy',
    level: 'Junior / Middle',
    location: 'Kasubi Hill',
    progressPercent: 28,
    itemsPledgedCount: 140,
    targetCount: 500,
    metricLabel: 'Uniform Kits Pledged',
    studentsSupported: 130,
    coordinator: 'Coach Ronald Walusimbi',
    lat: 0.3310,
    lng: 32.5510,
  },
  {
    id: 'school-9',
    rank: 9,
    name: 'Naguru Hillside Day School',
    level: 'Primary School',
    location: 'Naguru Sector',
    progressPercent: 25,
    itemsPledgedCount: 125,
    targetCount: 500,
    metricLabel: 'Stationery Sets Pledged',
    studentsSupported: 110,
    coordinator: 'Tr. Grace Akello',
    lat: 0.3450,
    lng: 32.6050,
  },
  {
    id: 'school-10',
    rank: 10,
    name: 'Kisenyi Hope Children Centre',
    level: 'Primary & Nursery',
    location: 'Kisenyi Division',
    progressPercent: 22,
    itemsPledgedCount: 110,
    targetCount: 500,
    metricLabel: 'Early Learning Kits Pledged',
    studentsSupported: 95,
    coordinator: 'Pastor Paul Mugisha',
    lat: 0.3090,
    lng: 32.5680,
  },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    title: 'A simple pair of shoes changed everything.',
    quote: 'Thanks to the KidsConnect supply drive, five of our student-athletes received proper footwear this term. For the first time, they feel like they truly belong on the team, and their confidence has skyrocketed.',
    author: 'Coach Marcus T.',
    role: 'Head Athletics Coach',
    school: 'Riverdale Middle / Junior School',
    impact: 'Equipped 45 track & soccer athletes with regulation shoes and safety socks.',
    image: '/assets/aistudio/images__1__9b1711cc.jpg',
    fullStory: 'Before the KidsConnect footwear drive, several talented middle school runners had to take turns sharing one worn pair of spikes or competed barefoot on gravel tracks. When the Interact Club of O&U High School mobilized alumni and local community members, we gathered 45 pairs of professional trainers.\n\nAt the regional inter-school championships last month, two of those five runners qualified for national secondary sports trials. Beyond trophies, their attendance rate in morning mathematics and physics classes jumped from 64% to 98% because their self-esteem and belonging were restored.',
  },
  {
    id: 'story-2',
    title: 'Hot lunches brought 120 girls back to class.',
    quote: 'When hunger gnaws at a child’s stomach by 11:00 AM, focusing on a chalkboard is impossible. Donating posho and beans turned empty desks into bustling classrooms.',
    author: 'Tr. Agnes Namubiru',
    role: 'Headmistress',
    school: 'Maplewood Primary',
    impact: 'Over 12,000 warm mid-day meals served this term.',
    image: '/assets/aistudio/images__4__88a8e4c6.jpg',
    fullStory: 'During the dry season, many households could only afford one family meal in the evening. Children were walking 4 kilometers to school without breakfast and frequently fainted during morning assemblies. The Classroom Lunch Fund bridged this urgent gap by collecting dry food items directly from generous community members to supply fortified maize, beans, and clean drinking water.',
  },
  {
    id: 'story-3',
    title: 'From zero textbooks to district coding champions.',
    quote: 'Our students had never touched a mathematical instrument set or a programmable circuit until the Interact Club scholastic consignment arrived.',
    author: 'Patron David Semakula',
    role: 'Interact Club Teacher Patron',
    school: 'O&U High School',
    impact: 'Distributed 1,200 geometry kits and 4 shared tablet stations.',
    image: '/assets/aistudio/images__3__245ac07c.jpg',
    fullStory: 'The students of O&U High School Interact Club took it upon themselves to mentor younger peers across three community feeder primary schools. The peer-to-peer bond made younger students feel loved, valued, and excited about school.',
  },
];

export const INITIAL_CLUB_CONTENT: ClubContentItem[] = [
  {
    id: 'proj-1',
    type: 'project',
    title: 'Scholastic Backpacks & Math Sets Drive',
    body: 'Supplying 4,500 exercise books, pens, and mathematical sets to students in partner primary schools who cannot afford examination stationery.',
    event_date: undefined,
    published: true,
    created_at: '2026-10-25T10:00:00Z',
  },
  {
    id: 'proj-2',
    type: 'project',
    title: 'Katanga Community Breakfast & Hot Porridge',
    body: 'O&U students volunteer weekly to prepare and distribute fortified porridge and bread for 150 children to prevent malnutrition.',
    event_date: undefined,
    published: true,
    created_at: '2026-10-22T08:30:00Z',
  },
  {
    id: 'proj-3',
    type: 'project',
    title: 'Footwear Dignity & Athlete Running Shoes',
    body: 'Providing 45 pairs of regulation trainers for junior student athletes competing in district championships.',
    event_date: undefined,
    published: true,
    created_at: '2026-10-18T14:15:00Z',
  },
  {
    id: 'event-1',
    type: 'event',
    title: 'Term 3 General Club Meeting & Assembly',
    body: 'All Interact members gather at O&U Main Hall to review Term 3 community outreach milestones. Guest speaker from Rotary Club.',
    event_date: '2026-11-06',
    published: true,
    created_at: '2026-10-29T09:00:00Z',
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Community Clean-up & Feeder School Visit',
    body: 'Tree planting and classroom repainting at St. Jude Community Academy. Transportation leaves O&U campus at 8:30 AM.',
    event_date: '2026-11-14',
    published: true,
    created_at: '2026-10-28T11:00:00Z',
  },
  {
    id: 'event-3',
    type: 'event',
    title: 'Inter-School Sports Gala & Shoes Handover',
    body: 'Official ceremony handing over 45 pairs of sports shoes to Riverdale and Maplewood runners.',
    event_date: '2026-11-28',
    published: true,
    created_at: '2026-10-26T16:00:00Z',
  },
  {
    id: 'news-1',
    type: 'news',
    title: 'Proposal Approved: Official Website & Supply Hub Launched',
    body: 'School administration endorsed the digital outreach proposal submitted by Project Manager Musembwa Calton and President Hagenimana Rasul.',
    event_date: undefined,
    published: true,
    created_at: '2026-10-30T12:00:00Z',
  },
  {
    id: 'news-2',
    type: 'news',
    title: 'Maplewood Leads School Zone with 90% Goal Pledged',
    body: 'Over 450 scholastic packs and breakfast supplies have been pledged for classroom kids, taking Maplewood to 1st place on the leaderboard.',
    event_date: undefined,
    published: true,
    created_at: '2026-10-27T15:30:00Z',
  },
  {
    id: 'news-3',
    type: 'news',
    title: 'Community Material Drop-off Points Open at School Office',
    body: 'Parents, alumni, and well-wishers can now drop off notebooks, pens, and dry food items directly at O&U High School Room B-12.',
    event_date: undefined,
    published: true,
    created_at: '2026-10-24T18:00:00Z',
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


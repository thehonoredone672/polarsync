// PolarSync Demo Data - Prototype/Sample Content

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  content_type: 'paper' | 'dataset' | 'report' | 'image' | 'video' | 'press_release' | 'story';
  region: string;
  author: string;
  organization: string;
  year: number;
  status: 'draft' | 'under_review' | 'approved' | 'published' | 'rejected';
  tags: string[];
  thumbnail: string;
  file_url?: string;
  file_size?: string;
  file_format?: string;
  views?: number;
  citations?: number;
  created_at: string;
  updated_at: string;
  abstract?: string;
  doi?: string;
  keywords?: string[];
}

export interface PolarLocation {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: 'station' | 'expedition' | 'dataset' | 'media' | 'event';
  region: string;
  established?: number;
  research_areas?: string[];
  image?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'video' | 'press_release';
  location: string;
  date: string;
  thumbnail: string;
  tags: string[];
  photographer?: string;
  duration?: string;
  image_count?: number;
}

export interface EducationItem {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'tour' | 'quiz' | 'kit';
  thumbnail: string;
  duration?: string;
  level?: string;
  questions?: number;
  tags: string[];
}

export interface Submission {
  id: string;
  title: string;
  content_type: string;
  submitted_by: string;
  organization: string;
  submitted_at: string;
  status: 'pending' | 'approved' | 'rejected';
  region: string;
  notes?: string;
}

// ─────────────────────────────────────────────
// REPOSITORY CONTENT
// ─────────────────────────────────────────────

export const repositoryItems: ContentItem[] = [
  {
    id: 'paper-001',
    title: 'Climate Change and Ice Shelf Dynamics in Antarctica',
    description: 'This study analyses the impact of climate change on ice shelf dynamics in Antarctica using satellite data and in-situ observations. The results show significant thinning in key regions.',
    abstract: 'This study analyses the impact of climate change on ice shelf dynamics in Antarctica using satellite and in-situ data observations. The results show significant thinning in key regions, with implications for sea level rise and global climate patterns. Indian stations Maitri and Bharati contributed observational data spanning 2018–2026.',
    content_type: 'paper',
    region: 'Antarctica',
    author: 'Dr. Priya Sharma',
    organization: 'National Centre for Polar and Ocean Research',
    year: 2026,
    status: 'published',
    tags: ['Climate Change', 'Ice Shelf', 'Glaciology', 'Antarctica'],
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    file_url: '/files/paper-001.pdf',
    file_size: '2.4 MB',
    file_format: 'PDF',
    views: 1248,
    citations: 34,
    created_at: '2026-03-12T09:00:00Z',
    updated_at: '2026-03-15T12:00:00Z',
    doi: '10.1234/polarsync.2026.001',
    keywords: ['Ice Shelf', 'Climate Change', 'Antarctica', 'Sea Level Rise', 'Glaciology'],
  },
  {
    id: 'dataset-001',
    title: 'Antarctic Sea Ice Extent Dataset (2010–2026)',
    description: 'Comprehensive satellite-derived dataset of Antarctic sea ice extent covering 2010–2026. Includes daily, weekly and monthly aggregates in CSV and GeoTIFF formats.',
    content_type: 'dataset',
    region: 'Antarctica',
    author: 'NCPOR Remote Sensing Team',
    organization: 'National Centre for Polar and Ocean Research',
    year: 2026,
    status: 'published',
    tags: ['Sea Ice', 'Remote Sensing', 'Dataset', 'Antarctica'],
    thumbnail: 'https://images.unsplash.com/photo-1551244072-5d12893278bc?w=800&q=80',
    file_url: '/files/dataset-001.zip',
    file_size: '1.2 GB',
    file_format: 'CSV / GeoTIFF',
    views: 892,
    citations: 21,
    created_at: '2026-01-10T09:00:00Z',
    updated_at: '2026-08-01T12:00:00Z',
    keywords: ['Sea Ice', 'Satellite Data', 'Antarctica', 'Climate'],
  },
  {
    id: 'report-001',
    title: 'Himalayan Cryosphere Report 2025',
    description: 'Annual assessment of Himalayan glaciers, snow cover and permafrost changes. Includes field surveys from 22 glaciers and comparison with 2020 baseline.',
    abstract: 'The Himalayan Cryosphere Report 2025 presents findings from extensive field surveys across the Himalayan, Karakoram and Hindu Kush ranges. Key findings indicate accelerated glacier retreat in the western Himalayas, with significant implications for freshwater resources across South Asia.',
    content_type: 'report',
    region: 'Himalayas',
    author: 'Dr. Rajesh Kumar',
    organization: 'Wadia Institute of Himalayan Geology',
    year: 2025,
    status: 'published',
    tags: ['Himalayas', 'Glacier', 'Cryosphere', 'Climate', 'Report'],
    thumbnail: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&q=80',
    file_url: '/files/report-001.pdf',
    file_size: '6.8 MB',
    file_format: 'PDF',
    views: 2103,
    citations: 57,
    created_at: '2025-12-10T09:00:00Z',
    updated_at: '2025-12-20T12:00:00Z',
    keywords: ['Himalayan Glaciers', 'Cryosphere', 'Snow Cover', 'Freshwater'],
  },
  {
    id: 'paper-002',
    title: 'Atmospheric Ozone Depletion Over the Antarctic Polar Vortex',
    description: 'Analysis of stratospheric ozone column data measured at Maitri Station over six Antarctic summers, revealing seasonal depletion patterns.',
    content_type: 'paper',
    region: 'Antarctica',
    author: 'Dr. Ananya Krishnan',
    organization: 'NCPOR / SPL, VSSC',
    year: 2025,
    status: 'published',
    tags: ['Ozone', 'Polar Vortex', 'Atmosphere', 'Maitri Station'],
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    file_url: '/files/paper-002.pdf',
    file_size: '3.1 MB',
    file_format: 'PDF',
    views: 743,
    citations: 19,
    created_at: '2025-09-05T09:00:00Z',
    updated_at: '2025-09-10T12:00:00Z',
    keywords: ['Ozone', 'Stratosphere', 'Polar Vortex', 'Antarctica'],
  },
  {
    id: 'dataset-002',
    title: 'Arctic Methane Flux Measurements – Ny-Ålesund 2023–2025',
    description: 'Continuous atmospheric methane flux measurements from Svalbard research station. High-resolution eddy covariance data at 10 Hz temporal resolution.',
    content_type: 'dataset',
    region: 'Arctic',
    author: 'Arctic Research Team',
    organization: 'NCPOR / Norwegian Polar Institute (collaborative)',
    year: 2025,
    status: 'published',
    tags: ['Methane', 'Arctic', 'Svalbard', 'Greenhouse Gas', 'Dataset'],
    thumbnail: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    file_url: '/files/dataset-002.zip',
    file_size: '458 MB',
    file_format: 'NetCDF / CSV',
    views: 531,
    citations: 11,
    created_at: '2025-11-20T09:00:00Z',
    updated_at: '2025-12-01T12:00:00Z',
    keywords: ['Methane', 'Eddy Covariance', 'Arctic', 'Climate'],
  },
  {
    id: 'report-002',
    title: 'Indian Antarctic Expedition 43 – Scientific Report',
    description: 'Comprehensive scientific report from India\'s 43rd Antarctic Expedition including biology, geology, atmospheric and glaciological observations.',
    content_type: 'report',
    region: 'Antarctica',
    author: 'Expedition 43 Science Team',
    organization: 'National Centre for Polar and Ocean Research',
    year: 2024,
    status: 'published',
    tags: ['Expedition', 'Antarctica', 'Biology', 'Geology', 'Glaciology'],
    thumbnail: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?w=800&q=80',
    file_url: '/files/report-002.pdf',
    file_size: '12.4 MB',
    file_format: 'PDF',
    views: 3420,
    citations: 89,
    created_at: '2024-08-15T09:00:00Z',
    updated_at: '2024-09-01T12:00:00Z',
    keywords: ['Antarctic Expedition', 'Field Science', 'Biology', 'Geology'],
  },
  {
    id: 'paper-003',
    title: 'Microplastic Distribution in Southern Ocean Surface Waters',
    description: 'First comprehensive survey of microplastic contamination in Southern Ocean waters conducted during Indian Antarctic Expedition 42.',
    content_type: 'paper',
    region: 'Southern Ocean',
    author: 'Dr. Meera Pillai',
    organization: 'NCPOR / CSIR-NIO',
    year: 2025,
    status: 'published',
    tags: ['Microplastics', 'Southern Ocean', 'Marine Pollution', 'Oceanography'],
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    file_url: '/files/paper-003.pdf',
    file_size: '4.2 MB',
    file_format: 'PDF',
    views: 2876,
    citations: 64,
    created_at: '2025-04-20T09:00:00Z',
    updated_at: '2025-04-25T12:00:00Z',
    keywords: ['Microplastics', 'Ocean Pollution', 'Southern Ocean'],
  },
  {
    id: 'dataset-003',
    title: 'Himalayan Glacier Mass Balance Dataset (1980–2025)',
    description: 'Long-term glacier mass balance measurements from 34 benchmark glaciers across the Indian Himalayas compiled from field and remote sensing data.',
    content_type: 'dataset',
    region: 'Himalayas',
    author: 'Cryosphere Research Group',
    organization: 'Wadia Institute of Himalayan Geology',
    year: 2025,
    status: 'published',
    tags: ['Glacier', 'Mass Balance', 'Himalayas', 'Long-term', 'Dataset'],
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    file_url: '/files/dataset-003.zip',
    file_size: '245 MB',
    file_format: 'Excel / NetCDF',
    views: 1654,
    citations: 42,
    created_at: '2025-07-15T09:00:00Z',
    updated_at: '2025-08-01T12:00:00Z',
    keywords: ['Mass Balance', 'Glaciers', 'Himalayas', 'Climate Change'],
  },
  {
    id: 'paper-004',
    title: 'Penguins as Bioindicators of Southern Ocean Health',
    description: 'Multi-year study tracking Adélie and Emperor penguin colonies near Indian research stations to assess ecosystem health and climate response.',
    content_type: 'paper',
    region: 'Antarctica',
    author: 'Dr. Sanjay Nair',
    organization: 'NCPOR / ZSI',
    year: 2026,
    status: 'published',
    tags: ['Penguins', 'Bioindicator', 'Ecology', 'Southern Ocean', 'Climate'],
    thumbnail: 'https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=800&q=80',
    file_url: '/files/paper-004.pdf',
    file_size: '5.1 MB',
    file_format: 'PDF',
    views: 4210,
    citations: 76,
    created_at: '2026-01-20T09:00:00Z',
    updated_at: '2026-02-01T12:00:00Z',
    keywords: ['Penguins', 'Ecology', 'Bioindicator', 'Southern Ocean'],
  },
  {
    id: 'report-003',
    title: 'Arctic Sea Ice Minimum 2025 – Assessment Report',
    description: 'Detailed assessment of the 2025 Arctic sea ice minimum extent, drivers and comparison with historical records. Includes contributions from Indian Arctic research team at Ny-Ålesund.',
    content_type: 'report',
    region: 'Arctic',
    author: 'Arctic Science Group',
    organization: 'NCPOR / NOAA (collaborative)',
    year: 2025,
    status: 'published',
    tags: ['Arctic', 'Sea Ice', 'Climate', 'Report', 'Minimum Extent'],
    thumbnail: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
    file_url: '/files/report-003.pdf',
    file_size: '8.9 MB',
    file_format: 'PDF',
    views: 3102,
    citations: 48,
    created_at: '2025-10-01T09:00:00Z',
    updated_at: '2025-10-10T12:00:00Z',
    keywords: ['Sea Ice Minimum', 'Arctic', 'Climate Change'],
  },
];

// ─────────────────────────────────────────────
// POLAR LOCATIONS
// ─────────────────────────────────────────────

export const polarLocations: PolarLocation[] = [
  {
    id: 'loc-001',
    name: 'Maitri Station',
    description: 'India\'s second permanent research station in Antarctica, located in the Schirmacher Oasis. Active year-round since 1989.',
    lat: -70.7669,
    lng: 11.7353,
    category: 'station',
    region: 'Antarctica',
    established: 1989,
    research_areas: ['Atmospheric Science', 'Glaciology', 'Geomagnetism', 'Biology'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
  },
  {
    id: 'loc-002',
    name: 'Dakshin Gangotri',
    description: 'India\'s first Antarctic research base, established in 1983. Now primarily used as a transit camp and cache station.',
    lat: -70.0833,
    lng: 12.0,
    category: 'station',
    region: 'Antarctica',
    established: 1983,
    research_areas: ['Historical Research', 'Logistics', 'Climate Records'],
    image: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?w=600&q=80',
  },
  {
    id: 'loc-003',
    name: 'Bharati Station',
    description: 'India\'s third and newest Antarctic research station, inaugurated in 2012. Located in East Antarctica near the Larsemann Hills.',
    lat: -69.4065,
    lng: 76.1903,
    category: 'station',
    region: 'Antarctica',
    established: 2012,
    research_areas: ['Geology', 'Marine Science', 'Atmospheric Research', 'Ecology'],
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278bc?w=600&q=80',
  },
  {
    id: 'loc-004',
    name: 'Himadri Station – Ny-Ålesund',
    description: 'India\'s Arctic research station in Svalbard, Norway. Operational since 2008, focusing on glaciology, atmospheric science and ecology.',
    lat: 78.9167,
    lng: 11.9333,
    category: 'station',
    region: 'Arctic',
    established: 2008,
    research_areas: ['Glaciology', 'Atmospheric Science', 'Marine Biology', 'Methane Studies'],
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80',
  },
  {
    id: 'loc-005',
    name: 'Gangotri Glacier Research Site',
    description: 'Primary Himalayan cryosphere research site monitoring one of the largest glaciers in the Indian Himalayas.',
    lat: 30.9265,
    lng: 79.0640,
    category: 'station',
    region: 'Himalayas',
    established: 1995,
    research_areas: ['Glacier Dynamics', 'Hydrology', 'Climate Change', 'Remote Sensing'],
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600&q=80',
  },
  {
    id: 'loc-006',
    name: 'IAE-43 Expedition Track',
    description: 'Route of India\'s 43rd Antarctic Expedition from Goa to Maitri Station via Cape Town.',
    lat: -55.0,
    lng: 20.0,
    category: 'expedition',
    region: 'Southern Ocean',
    research_areas: ['Oceanography', 'Marine Biology', 'Atmospheric Science'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  },
  {
    id: 'loc-007',
    name: 'Antarctic Sea Ice Monitoring Zone',
    description: 'Key monitoring zone for annual sea ice extent measurements used in the NCPOR Sea Ice Dataset.',
    lat: -65.0,
    lng: 50.0,
    category: 'dataset',
    region: 'Antarctica',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80',
  },
  {
    id: 'loc-008',
    name: 'Penguin Colony – Prydz Bay',
    description: 'Key Adélie and Emperor penguin colony monitored during IAE expeditions as part of the Southern Ocean ecology programme.',
    lat: -68.5,
    lng: 77.5,
    category: 'media',
    region: 'Antarctica',
    image: 'https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=600&q=80',
  },
];

// ─────────────────────────────────────────────
// MEDIA ITEMS
// ─────────────────────────────────────────────

export const mediaItems: MediaItem[] = [
  {
    id: 'media-001',
    title: 'Antarctic Expedition 2026 — Highlights',
    description: 'Visual highlights from India\'s 44th Antarctic Expedition covering the voyage, station activities and field research.',
    type: 'video',
    location: 'Maitri Station, Antarctica',
    date: '2026-03-15',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    tags: ['Expedition', 'Documentary', 'Antarctica'],
    duration: '12:34',
  },
  {
    id: 'media-002',
    title: 'Emperor Penguins — Prydz Bay',
    description: 'High-resolution photographs of Emperor penguin colonies captured during field surveys near Bharati Station.',
    type: 'photo',
    location: 'Prydz Bay, Antarctica',
    date: '2026-01-20',
    thumbnail: 'https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=800&q=80',
    tags: ['Penguins', 'Wildlife', 'Antarctica', 'Photography'],
    photographer: 'Dr. Sanjay Nair',
    image_count: 48,
  },
  {
    id: 'media-003',
    title: 'Aurora Borealis from Ny-Ålesund',
    description: 'Stunning time-lapse and still photographs of the Northern Lights captured from Himadri Station, Svalbard.',
    type: 'photo',
    location: 'Ny-Ålesund, Svalbard, Arctic',
    date: '2025-11-10',
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    tags: ['Aurora', 'Arctic', 'Photography', 'Himadri'],
    photographer: 'Dr. Vikram Mehta',
    image_count: 72,
  },
  {
    id: 'media-004',
    title: 'Research Vessel Sagarmatha – Southern Ocean',
    description: 'Aerial and on-deck footage of the Indian research vessel navigating the Southern Ocean during IAE-43.',
    type: 'video',
    location: 'Southern Ocean',
    date: '2025-12-05',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    tags: ['Research Vessel', 'Ocean', 'Expedition'],
    duration: '8:12',
  },
  {
    id: 'media-005',
    title: 'Gangotri Glacier Retreat — Time Series',
    description: 'Satellite and ground-based imagery documenting the retreat of Gangotri Glacier over the past decade.',
    type: 'photo',
    location: 'Uttarakhand, India (Himalayas)',
    date: '2025-09-15',
    thumbnail: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&q=80',
    tags: ['Glacier', 'Himalayas', 'Remote Sensing', 'Climate'],
    photographer: 'ISRO / NCPOR',
    image_count: 120,
  },
  {
    id: 'media-006',
    title: 'NCPOR Announces IAE-44 Departure',
    description: 'Official press release announcing the departure of India\'s 44th Antarctic Expedition from Goa Port.',
    type: 'press_release',
    location: 'Goa, India',
    date: '2025-11-28',
    thumbnail: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    tags: ['Press Release', 'Expedition', 'IAE-44', 'NCPOR'],
  },
  {
    id: 'media-007',
    title: 'Icebergs of the Weddell Sea',
    description: 'Award-winning photographs of tabular icebergs in the Weddell Sea captured during IAE-42.',
    type: 'photo',
    location: 'Weddell Sea, Antarctica',
    date: '2024-02-10',
    thumbnail: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?w=800&q=80',
    tags: ['Icebergs', 'Weddell Sea', 'Antarctica', 'Photography'],
    photographer: 'Expedition 42 Media Team',
    image_count: 95,
  },
  {
    id: 'media-008',
    title: 'India Joins Global Cryosphere Watch – MoU Signing',
    description: 'Press release and photographs from the MoU signing ceremony between NCPOR and WMO for Global Cryosphere Watch participation.',
    type: 'press_release',
    location: 'New Delhi, India',
    date: '2025-08-22',
    thumbnail: 'https://images.unsplash.com/photo-1551244072-5d12893278bc?w=800&q=80',
    tags: ['Press Release', 'International Collaboration', 'WMO', 'Cryosphere'],
  },
];

// ─────────────────────────────────────────────
// EDUCATION ITEMS
// ─────────────────────────────────────────────

export const educationItems: EducationItem[] = [
  {
    id: 'edu-001',
    title: 'How India Studies Antarctica',
    description: 'Discover the story of India\'s polar science journey — from the first Indian expedition in 1981 to today\'s cutting-edge research at Maitri and Bharati stations.',
    type: 'story',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    duration: '8 min read',
    level: 'General',
    tags: ['India', 'Antarctica', 'History', 'Science'],
  },
  {
    id: 'edu-002',
    title: 'Explore Maitri Research Station',
    description: 'Take a virtual tour of India\'s Maitri Antarctic research station — explore labs, living quarters and the surrounding Schirmacher Oasis.',
    type: 'tour',
    thumbnail: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?w=800&q=80',
    duration: '15 min',
    level: 'All Ages',
    tags: ['Maitri', 'Virtual Tour', 'Station', 'Antarctica'],
  },
  {
    id: 'edu-003',
    title: 'Polar Regions — Test Your Knowledge',
    description: 'How well do you know the Arctic and Antarctic? Take our 15-question interactive quiz covering geography, climate, wildlife and Indian polar research.',
    type: 'quiz',
    thumbnail: 'https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=800&q=80',
    duration: '10 min',
    level: 'Intermediate',
    questions: 15,
    tags: ['Quiz', 'Polar Regions', 'Education', 'Interactive'],
  },
  {
    id: 'edu-004',
    title: 'Polar Science Classroom Pack',
    description: 'Comprehensive educator kit including lesson plans, worksheets, data activities and presentations for teaching polar science to students aged 12–18.',
    type: 'kit',
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    duration: 'Multi-lesson',
    level: 'Secondary / Higher',
    tags: ['Educator', 'Classroom', 'Teaching', 'Resources'],
  },
  {
    id: 'edu-005',
    title: 'The Arctic Is Melting — What Does It Mean?',
    description: 'A data-driven science story exploring Arctic sea ice decline, its global consequences and what Indian researchers are discovering.',
    type: 'story',
    thumbnail: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
    duration: '6 min read',
    level: 'General',
    tags: ['Arctic', 'Climate Change', 'Sea Ice', 'Science Story'],
  },
];

// ─────────────────────────────────────────────
// PENDING SUBMISSIONS (Admin Review)
// ─────────────────────────────────────────────

export const pendingSubmissions: Submission[] = [
  {
    id: 'sub-001',
    title: 'Antarctic Ice Core Analysis — Isotope Records 2015–2024',
    content_type: 'Research Paper',
    submitted_by: 'Dr. Priya Sharma',
    organization: 'NCPOR',
    submitted_at: '2026-10-01T08:30:00Z',
    status: 'pending',
    region: 'Antarctica',
    notes: 'Ice core isotope analysis with implications for palaeoclimate reconstruction.',
  },
  {
    id: 'sub-002',
    title: 'Southern Ocean Phytoplankton Distribution Dataset',
    content_type: 'Dataset',
    submitted_by: 'Dr. Meera Pillai',
    organization: 'CSIR-NIO',
    submitted_at: '2026-09-28T11:15:00Z',
    status: 'pending',
    region: 'Southern Ocean',
    notes: 'HPLC-derived phytoplankton composition data from IAE-43 transect.',
  },
  {
    id: 'sub-003',
    title: 'Himalayan Snow Cover Trend Report 2020–2025',
    content_type: 'Report',
    submitted_by: 'Dr. Rajesh Kumar',
    organization: 'Wadia Institute',
    submitted_at: '2026-09-25T09:00:00Z',
    status: 'pending',
    region: 'Himalayas',
    notes: 'Annual report on snow cover trends derived from MODIS data.',
  },
  {
    id: 'sub-004',
    title: 'Bharati Station Wildlife Photography 2026',
    content_type: 'Image Collection',
    submitted_by: 'Lt. Cmdr. Arun Das',
    organization: 'IAE-44 Team',
    submitted_at: '2026-10-02T14:00:00Z',
    status: 'pending',
    region: 'Antarctica',
    notes: 'High-resolution wildlife and landscape photography from IAE-44.',
  },
];

// ─────────────────────────────────────────────
// USER DASHBOARD SUBMISSIONS
// ─────────────────────────────────────────────

export const userSubmissions: ContentItem[] = [
  {
    ...repositoryItems[0],
    id: 'usr-001',
    status: 'published',
  },
  {
    ...repositoryItems[1],
    id: 'usr-002',
    status: 'published',
  },
  {
    id: 'usr-003',
    title: 'Antarctic Ice Core Analysis — Isotope Records',
    description: 'Ice core isotope analysis with implications for palaeoclimate reconstruction.',
    content_type: 'paper',
    region: 'Antarctica',
    author: 'Dr. Alex Johnson',
    organization: 'NCPOR',
    year: 2026,
    status: 'under_review',
    tags: ['Ice Core', 'Palaeoclimate', 'Antarctica'],
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    created_at: '2026-10-01T08:30:00Z',
    updated_at: '2026-10-01T08:30:00Z',
  },
  {
    id: 'usr-004',
    title: 'Draft: Microplastics in Himalayan Rivers',
    description: 'Early-stage draft on microplastic contamination in river systems fed by Himalayan glaciers.',
    content_type: 'paper',
    region: 'Himalayas',
    author: 'Dr. Alex Johnson',
    organization: 'NCPOR',
    year: 2026,
    status: 'draft',
    tags: ['Microplastics', 'Himalayas', 'Rivers'],
    thumbnail: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&q=80',
    created_at: '2026-09-20T08:30:00Z',
    updated_at: '2026-09-22T08:30:00Z',
  },
  {
    id: 'usr-005',
    title: 'Atmospheric CO₂ Measurements at Maitri 2024',
    description: 'Continuous CO₂ monitoring data and analysis from Maitri Station.',
    content_type: 'dataset',
    region: 'Antarctica',
    author: 'Dr. Alex Johnson',
    organization: 'NCPOR',
    year: 2024,
    status: 'published',
    tags: ['CO2', 'Maitri', 'Atmosphere', 'Dataset'],
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    created_at: '2024-12-15T08:30:00Z',
    updated_at: '2024-12-20T08:30:00Z',
  },
];

export const contentTypeColors: Record<string, string> = {
  paper: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  dataset: 'bg-green-500/20 text-green-300 border-green-500/30',
  report: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  image: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  video: 'bg-red-500/20 text-red-300 border-red-500/30',
  press_release: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  story: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

export const regionColors: Record<string, string> = {
  Antarctica: 'bg-cyan-500/10 text-cyan-300',
  Arctic: 'bg-blue-500/10 text-blue-300',
  Himalayas: 'bg-emerald-500/10 text-emerald-300',
  'Southern Ocean': 'bg-indigo-500/10 text-indigo-300',
};

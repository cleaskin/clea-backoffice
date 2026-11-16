import type { Article, Story } from '@/types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Truth About Niacinamide: Why 5% is the Sweet Spot for Skin Barriers',
    slug: 'the-truth-about-niacinamide-5-percent',
    category: 'Ingredients 101',
    summary: 'Higher percentages are not always better. Discover how 2-5% Niacinamide calms inflammation, regulates sebum, and strengthens your lipid barrier without irritation.',
    contentHtml: `
      <h2>Why More Isn't Always Better</h2>
      <p>In modern skincare marketing, active ingredient percentages have become an arms race. Products boasting 10%, 15%, or even 20% Niacinamide flood shelf displays. However, clinical dermatological trials show that <strong>Niacinamide (Vitamin B3)</strong> delivers peak physiological efficacy between <strong>2% and 5%</strong>.</p>
      
      <blockquote>
        "At concentrations above 5%, the risk of contact dermatitis, facial flushing, and temporary capillary dilation significantly increases without providing additional barrier repair benefits." — Dr. Sarah Vance, Clea Advisory Board
      </blockquote>

      <h2>Key Clinical Benefits at 5% Concentration</h2>
      <ul>
        <li><strong>Ceramide Synthesis:</strong> Stimulates natural lipid production by up to 34% within 4 weeks.</li>
        <li><strong>Sebum Regulation:</strong> Normalizes overactive sebaceous glands without dehydrating the epidermis.</li>
        <li><strong>Hyperpigmentation Reduction:</strong> Inhibits melanosome transfer from melanocytes to keratinocytes.</li>
      </ul>

      <h2>How to Pair It in Your Routine</h2>
      <p>Niacinamide is remarkably stable and plays well with almost all other actives. You can layer it effortlessly alongside Hyaluronic Acid, Peptides, and gentle Retinoids. If applying with pure L-Ascorbic Acid (Vitamin C), allow a 5-minute absorption buffer to avoid transient flushing.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    readingTime: 4,
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Lead Dermatologist',
      avatar: 'https://images.unsplash.com/photo-1594824813639-95240c541783?q=80&w=200&auto=format&fit=crop',
    },
    status: 'published',
    publishedAt: '2026-11-10T10:00:00Z',
    createdAt: '2026-11-08T14:30:00Z',
    updatedAt: '2026-11-10T10:00:00Z',
    tags: ['Niacinamide', 'Barrier Repair', 'Sensitive Skin'],
    viewsCount: 2450,
    likesCount: 318,
    featured: true,
  },
  {
    id: 'art-2',
    title: 'Morning vs Evening Routine: Timing Your Actives for Maximum Absorption',
    slug: 'morning-vs-evening-routine-timing-actives',
    category: 'Daily Routine',
    summary: 'Your skin circadian rhythm shifts from defense mode during daytime to regeneration mode at night. Here is how to structure your active ingredients accordingly.',
    contentHtml: `
      <h2>The Circadian Rhythm of the Skin</h2>
      <p>Just like our internal organs, the skin operates on a precise 24-hour biological clock. During daylight hours, trans-epidermal water loss (TEWL) is lower, sebum production peaks, and the skin prioritizes <strong>antioxidant defense</strong> against UV radiation and free radicals.</p>

      <h2>Morning Protocol: Shield & Hydrate</h2>
      <ul>
        <li><strong>Gentle Water-based Cleanse:</strong> Avoid stripping the natural barrier.</li>
        <li><strong>Antioxidant Serum:</strong> Vitamin C or Green Tea extract to neutralize pollution.</li>
        <li><strong>Broad Spectrum SPF 50+:</strong> Non-negotiable daily defense.</li>
      </ul>

      <h2>Evening Protocol: Restore & Regenerate</h2>
      <p>At night, cellular turnover rate doubles. Blood flow to the skin increases, and permeability rises. This is the optimal window for corrective actives such as encapsulated Retinol, Glycolic Acid, and rich barrier ceramides.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    readingTime: 5,
    author: {
      name: 'Olesya Partyka',
      role: 'Skincare Formulator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    status: 'published',
    publishedAt: '2026-11-12T08:00:00Z',
    createdAt: '2026-11-11T16:00:00Z',
    updatedAt: '2026-11-12T08:00:00Z',
    tags: ['Routines', 'Antioxidants', 'Retinoids', 'SPF'],
    viewsCount: 1890,
    likesCount: 241,
    featured: false,
  },
  {
    id: 'art-3',
    title: 'Decoding Mineral vs Chemical Sunscreens: What Really Fits Your Skin Type',
    slug: 'mineral-vs-chemical-sunscreens-guide',
    category: 'Sun Protection',
    summary: 'Zinc Oxide or Tinosorb? Understand the actual mechanism of UV filters, white cast solutions, and how to choose the right formula for reactive or acne-prone skin.',
    contentHtml: `
      <h2>Physical Blockers vs Organic Filters</h2>
      <p>For years, a common misconception claimed that mineral sunscreens act as literal mirrors reflecting 100% of rays, while chemical sunscreens absorb them into heat. Modern spectroscopy reveals that both primarily absorb UV energy, converting it into harmless thermal radiation.</p>
      
      <h2>When to Choose Mineral (Zinc Oxide / Titanium Dioxide)</h2>
      <p>Zinc Oxide has natural antimicrobial and anti-inflammatory properties, making it the gold standard for rosacea, active inflamed acne, and post-procedure skin.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop',
    readingTime: 3,
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Lead Dermatologist',
      avatar: 'https://images.unsplash.com/photo-1594824813639-95240c541783?q=80&w=200&auto=format&fit=crop',
    },
    status: 'published',
    publishedAt: '2026-11-14T09:30:00Z',
    createdAt: '2026-11-13T11:00:00Z',
    updatedAt: '2026-11-14T09:30:00Z',
    tags: ['SPF', 'Mineral Sunscreen', 'Sensitive Skin'],
    viewsCount: 940,
    likesCount: 112,
    featured: false,
  },
  {
    id: 'art-4',
    title: 'Post-Scan Recovery: 72-Hour Protocol for Redness and Peeling',
    slug: 'post-scan-recovery-protocol',
    category: 'Acne Care',
    summary: 'Draft guide on soothing sensitive skin after active exfoliation or environmental stress.',
    contentHtml: `
      <h2>Step 1: Eliminate All Exfoliating Acids</h2>
      <p>When the acid mantle is compromised, pause all AHAs, BHAs, and retinoids immediately for 72 hours.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1512290900672-1f41d916e788?q=80&w=1200&auto=format&fit=crop',
    readingTime: 2,
    author: {
      name: 'Clea Editorial Team',
      role: 'Content Desk',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    },
    status: 'draft',
    createdAt: '2026-11-15T18:00:00Z',
    updatedAt: '2026-11-15T18:00:00Z',
    tags: ['Skin Recovery', 'Redness'],
    viewsCount: 0,
    likesCount: 0,
    featured: false,
  },
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    title: '3-Angle Skin Diagnostics',
    category: 'Diagnostics',
    coverImage: 'https://images.unsplash.com/photo-1512290900672-1f41d916e788?q=80&w=600&auto=format&fit=crop',
    status: 'active',
    order: 1,
    viewsCount: 3840,
    completionRate: 86,
    createdAt: '2026-11-10T12:00:00Z',
    updatedAt: '2026-11-14T08:00:00Z',
    slides: [
      {
        id: 'slide-1-1',
        mediaUrl: 'https://images.unsplash.com/photo-1512290900672-1f41d916e788?q=80&w=800&auto=format&fit=crop',
        mediaType: 'image',
        duration: 5,
        badge: 'NEW FEATURE',
        title: 'Deep AI Facial Scan',
        subtitle: 'Our multi-angle vision model maps texture, redness, and pore congestion in under 10 seconds.',
        textColor: 'white',
        overlayOpacity: 45,
      },
      {
        id: 'slide-1-2',
        mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        mediaType: 'image',
        duration: 5,
        badge: '3 ANGLES',
        title: 'Left, Center & Right',
        subtitle: 'Accurate profiling from temple to jawline to identify underlying barrier fatigue.',
        textColor: 'white',
        overlayOpacity: 40,
      },
      {
        id: 'slide-1-3',
        mediaUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
        mediaType: 'image',
        duration: 6,
        badge: 'GET STARTED',
        title: 'Ready for Your Analysis?',
        subtitle: 'Hold phone at eye level in natural lighting for maximum diagnostic precision.',
        ctaText: 'Start Face Scan',
        ctaAction: 'scan',
        textColor: 'white',
        overlayOpacity: 50,
      },
    ],
  },
  {
    id: 'story-2',
    title: 'Shelf Safety Checker',
    category: 'Product Guide',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    status: 'active',
    order: 2,
    viewsCount: 2910,
    completionRate: 78,
    createdAt: '2026-11-11T14:00:00Z',
    updatedAt: '2026-11-14T09:00:00Z',
    slides: [
      {
        id: 'slide-2-1',
        mediaUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
        mediaType: 'image',
        duration: 5,
        badge: 'COMPATIBILITY',
        title: 'Conflicting Actives?',
        subtitle: 'Never mix high-strength BHA with pure Retinol in the same routine again.',
        textColor: 'white',
        overlayOpacity: 40,
      },
      {
        id: 'slide-2-2',
        mediaUrl: 'https://images.unsplash.com/photo-1608248597359-009139268f74?q=80&w=800&auto=format&fit=crop',
        mediaType: 'image',
        duration: 5,
        badge: 'SMART SHELF',
        title: 'Scan Any Barcode',
        subtitle: 'Clea instantly cross-checks your shelf against your skin profile and allergen triggers.',
        ctaText: 'Scan Barcode Now',
        ctaAction: 'product',
        textColor: 'white',
        overlayOpacity: 45,
      },
    ],
  },
  {
    id: 'story-3',
    title: 'Winter Hydration Reset',
    category: 'Seasonal Care',
    coverImage: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=600&auto=format&fit=crop',
    status: 'scheduled',
    order: 3,
    viewsCount: 0,
    completionRate: 0,
    createdAt: '2026-11-15T10:00:00Z',
    updatedAt: '2026-11-15T10:00:00Z',
    startDate: '2026-12-01T00:00:00Z',
    slides: [
      {
        id: 'slide-3-1',
        mediaUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop',
        mediaType: 'image',
        duration: 5,
        badge: 'COMING SOON',
        title: 'Locking Moisture Indoors',
        subtitle: 'Central heating drops indoor humidity below 30%. Protect your barrier with occlusives.',
        textColor: 'white',
        overlayOpacity: 35,
      },
    ],
  },
];

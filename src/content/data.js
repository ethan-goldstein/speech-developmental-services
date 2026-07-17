// All site copy, sourced from the Speech Developmental Services intake PDF.

export const site = {
  name: 'Speech Developmental Services',
  shortName: 'SDS',
  founder: 'Shana Kilcawley',
  title: 'Founder, Speech Language Pathologist',
  credentials: 'CCC-SLP',
  email: 'Shana@speechds.com',
  phone: '(850) 529-6518',
  phoneHref: 'tel:+18505296518',
  base: 'Arlington County, Virginia',
  telehealthStates: 'Virginia, Maryland, Washington, D.C., and Florida',
}

export const socials = [
  {
    label: 'Instagram',
    handle: '@shanaslp',
    url: 'https://www.instagram.com/shanaslp',
    icon: 'instagram',
  },
  {
    label: 'LinkedIn',
    handle: 'Speech Developmental Services',
    url: 'https://www.linkedin.com/company/speech-developmental-services/',
    icon: 'linkedin',
  },
  {
    label: 'Facebook',
    handle: 'Speech Developmental Services',
    url: 'https://www.facebook.com/photo/?fbid=122104270688883148&set=a.122104267766883148',
    icon: 'facebook',
  },
]

export const about = {
  intro:
    'Hello! My name is Shana, and I am a licensed and board-certified Speech Language Pathologist (CCC-SLP) in Northern Virginia. I received both my bachelor’s degree and master’s degree from Boston University, where I gained hands-on experience in diverse clinical settings.',
  why:
    'I was initially drawn to this field seeing it was an opportunity to use my creativity and personal experience with neurodiverse individuals to help others. I stay in this field because of the children and families I meet. Nothing brings me more joy than getting to celebrate the wins with you!',
  connection:
    'Above all, I prioritize building strong, trusting relationships, as I believe connection is the foundation for growth.',
  personal:
    'In my free time, I enjoy reading, knitting, and dancing. I also love exploring new restaurants and trying out new recipes with my partner!',
}

export const pillars = [
  {
    title: 'Individualized',
    text: 'Tailored to your child’s unique strengths and needs.',
  },
  {
    title: 'Functional',
    text: 'Focused on supporting your child in their everyday environment.',
  },
  {
    title: 'Neurodiversity-Affirming',
    text: 'Honoring and celebrating your child’s differences.',
  },
]

export const services = [
  {
    title: 'Receptive & Expressive Language',
    text: 'Building understanding and use of language, from first words to full conversations.',
    icon: 'chat',
  },
  {
    title: 'Social-Pragmatic Language',
    text: 'Supporting connection, play, and communication with peers and family.',
    icon: 'people',
  },
  {
    title: 'Articulation',
    text: 'Helping speech sounds develop so your child can be clearly understood.',
    icon: 'sound',
  },
  {
    title: 'Stuttering',
    text: 'Compassionate, confidence-building support for fluency.',
    icon: 'wave',
  },
  {
    title: 'AAC',
    text: 'Augmentative & Alternative Communication: finding every child’s voice, in every form it takes.',
    icon: 'tablet',
  },
  {
    title: 'Gestalt Language Processing',
    text: 'A specialization in supporting children who learn language in chunks and scripts.',
    icon: 'puzzle',
  },
  {
    title: 'Virtual Parent Coaching',
    text: 'Practical, personalized guidance for supporting communication at home.',
    icon: 'video',
  },
]

export const steps = [
  {
    n: '01',
    title: 'Schedule a Free Consultation',
    text: 'Start with a complimentary 15-minute consultation to discuss your concerns, ask questions, and determine whether speech therapy is the right fit for your child and family.',
  },
  {
    n: '02',
    title: 'Complete a Comprehensive Evaluation',
    text: 'A thorough speech and language evaluation will identify your child’s strengths and areas for growth. Based on the results, we’ll develop a personalized therapy plan with goals tailored to your child’s unique needs.',
  },
  {
    n: '03',
    title: 'Begin Speech Therapy!',
    text: 'Sessions are 45 minutes long and are scheduled based on your child’s needs: once a week, twice a week, every other week, or monthly.',
  },
]

export const settings = [
  {
    title: 'In the Clinic',
    text: 'Based in Arlington County, Virginia.',
    icon: 'building',
  },
  {
    title: 'In the Community',
    text: 'Care in the settings where your child lives, learns, and plays.',
    icon: 'tree',
  },
  {
    title: 'Secure Telehealth',
    text: 'Available in Virginia, Maryland, Washington, D.C., and Florida.',
    icon: 'laptop',
  },
]

export const insurers = [
  { name: 'Anthem Blue Cross Blue Shield', color: '#0079C2' },
  { name: 'Anthem HealthKeepers Plus', color: '#00609A' },
  { name: 'Cigna', color: '#F68B1F' },
  { name: 'Kaiser Permanente', color: '#0078B3' },
  { name: 'Tricare', color: '#1B3E6F' },
  { name: 'United Healthcare', color: '#002677' },
  { name: 'UHC Community Plan', color: '#00BED5' },
]

// Options for the booking form (questions mirror the reference flow).
export const bookingOptions = {
  services: ['Speech therapy', 'Virtual parent coaching'],
  who: ['My child', 'Myself', 'Someone else'],
  states: ['Virginia', 'Maryland', 'Washington, D.C.', 'Florida', 'Other'],
  insurance: [...insurers.map((i) => i.name), 'Private pay / Self-pay', 'Other'],
}

export const legal = {
  goodFaith:
    'You have the right to receive a Good Faith Estimate of what your services may cost.',
  noSurprisesUrl: 'https://www.cms.gov/nosurprises',
  conflictOfInterest:
    'The views and opinions expressed on this website are solely my own and do not necessarily reflect those of any organization, employer, client, or institution with which I am affiliated.',
}

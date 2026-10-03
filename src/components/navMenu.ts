import servicesData from '../content/services.json';

// Sub-menus shown when hovering the main navigation. Lists that depend on
// content (project categories, blog posts, FAQ categories...) are built from
// the CMS files, so new entries appear in the menu automatically.

export interface NavSubLink {
  name: string;
  to: string;
}

export interface NavItem {
  name: string;
  path: string;
  children: NavSubLink[];
}

const load = (modules: Record<string, unknown>) =>
  Object.values(modules)
    .map((m: any) => m.default || m)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

const projects = load(import.meta.glob('/src/content/projects/*.json', { eager: true }));
const gallery = load(import.meta.glob('/src/content/gallery/*.json', { eager: true }));
const faqs = load(import.meta.glob('/src/content/faqs/*.json', { eager: true }));
const blogPosts = load(import.meta.glob('/src/content/blog/*.json', { eager: true })).sort(
  (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime() || (a.order ?? 0) - (b.order ?? 0)
);

const unique = (values: string[]) => Array.from(new Set(values.filter(Boolean)));
const withParam = (path: string, key: string, value: string) =>
  `${path}?${key}=${encodeURIComponent(value)}`;

export const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/',
    children: [
      { name: 'Who We Are', to: '/#who-we-are' },
      { name: 'Our Services', to: '/#services' },
      { name: 'Featured Projects', to: '/#featured-projects' },
      { name: 'Why Choose Us', to: '/#why-choose-us' },
      { name: 'Client Testimonials', to: '/#testimonials' },
      { name: 'FAQs', to: '/#faqs' },
    ],
  },
  {
    name: 'Services',
    path: '/services',
    children: (['architecture', 'interior', 'bim', 'training'] as const).map((key) => ({
      name: servicesData[key].title,
      to: withParam('/services', 'tab', key),
    })),
  },
  {
    name: 'Projects',
    path: '/projects',
    children: [
      { name: 'All Projects', to: '/projects' },
      ...unique(projects.map((p: any) => p.category)).map((category) => ({
        name: category,
        to: withParam('/projects', 'category', category),
      })),
    ],
  },
  {
    name: 'Gallery',
    path: '/gallery',
    children: [
      { name: 'All Images', to: '/gallery' },
      ...unique(gallery.map((g: any) => g.category))
        .filter((category) => category !== 'All')
        .map((category) => ({ name: category, to: withParam('/gallery', 'category', category) })),
    ],
  },
  {
    name: 'Blog',
    path: '/blog',
    children: [
      ...blogPosts.slice(0, 5).map((post: any) => ({
        name: post.title,
        to: withParam('/blog', 'post', post.slug),
      })),
      { name: 'View All Articles', to: '/blog' },
    ],
  },
  {
    name: 'About',
    path: '/about',
    children: [
      { name: 'About Us', to: '/about#about-us' },
      { name: 'Vision & Mission', to: '/about#vision-mission' },
      { name: 'Core Values', to: '/about#core-values' },
      { name: 'Our Journey', to: '/about#our-journey' },
      { name: 'Certifications', to: '/about#certifications' },
      { name: 'Our Clients', to: '/about#clients' },
    ],
  },
  {
    name: 'Testimonials',
    path: '/testimonials',
    children: [
      { name: 'Client Reviews', to: '/testimonials#reviews' },
      { name: 'Share Your Review', to: '/testimonials?write=1' },
    ],
  },
  {
    name: 'FAQ',
    path: '/faq',
    children: [
      { name: 'All Questions', to: '/faq' },
      ...unique(faqs.map((f: any) => f.category)).map((category) => ({
        name: category,
        to: withParam('/faq', 'category', category),
      })),
    ],
  },
  {
    name: 'Contact',
    path: '/contact',
    children: [
      { name: 'Contact Details', to: '/contact#contact-details' },
      { name: 'Send a Message', to: '/contact#contact-form' },
      { name: 'Office Location', to: '/contact#office-location' },
      { name: 'Book a Consultation', to: '/booking' },
    ],
  },
];

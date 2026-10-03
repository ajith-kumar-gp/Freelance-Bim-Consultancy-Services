import settingsData from '../content/settings.json';

// Pages can be switched on/off from the CMS (Website Settings → Show / Hide Pages).
// A hidden page is removed from the menus and footer, and its URL redirects home.
// Home and Booking are always available.

type PageKey = keyof typeof settingsData.visiblePages;

const pathToKey: Record<string, PageKey> = {
  '/services': 'services',
  '/projects': 'projects',
  '/gallery': 'gallery',
  '/blog': 'blog',
  '/about': 'about',
  '/testimonials': 'testimonials',
  '/faq': 'faq',
  '/contact': 'contact',
};

export function isPageVisible(path: string): boolean {
  const key = pathToKey[path.split(/[?#]/)[0]];
  // Pages without a switch (home, booking, legal) are always visible;
  // a missing setting also counts as visible so new pages aren't hidden by accident
  return key ? settingsData.visiblePages?.[key] !== false : true;
}

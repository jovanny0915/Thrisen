/**
 * Phase 4.1: Social Hub — links to Instagram, Strava, etc. with icons and hover states.
 */
const links = [
  { label: "Instagram", href: "https://instagram.com", icon: "📷" },
  { label: "Strava", href: "https://strava.com", icon: "🏃" },
  { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
];

export default function SocialHub() {
  return (
    <section className="mb-14" aria-labelledby="social-heading">
      <h2 id="social-heading" className="text-2xl font-bold text-stone-800 mb-4">
        Social
      </h2>
      <ul className="flex flex-wrap gap-4">
        {links.map(({ label, href, icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/70 border border-amber-100 hover:border-amber-300 hover:bg-amber-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span aria-hidden>{icon}</span>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

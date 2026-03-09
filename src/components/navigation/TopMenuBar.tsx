import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "About", to: "/professional#about" },
  { label: "Contact", to: "/professional#contact" },
  { label: "Clients", to: "/professional#clients" },
];

/**
 * Top-level menu inspired by the split-screen concept art.
 */
export default function TopMenuBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 px-4 py-5 sm:px-8 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-end">
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-4 sm:gap-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className="text-[14px] sm:text-[16px] font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow-[0_1px_2px_rgba(2,6,23,0.9)] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

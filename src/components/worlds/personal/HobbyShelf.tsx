import { useState } from "react";

type HobbyItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const hobbyItems: HobbyItem[] = [
  { id: "camera", icon: "📷", title: "Street Photography", description: "Collecting light and stories on long walks." },
  { id: "shoe", icon: "👟", title: "Distance Running", description: "Training blocks that keep me grounded and focused." },
  { id: "book", icon: "📚", title: "Reading Sprints", description: "Alternating tech books with fiction every week." },
  { id: "coffee", icon: "☕", title: "Coffee Ritual", description: "Slow mornings before shipping code." },
];

export default function HobbyShelf() {
  const [active, setActive] = useState<HobbyItem | null>(null);

  return (
    <section className="mb-14" aria-labelledby="hobby-shelf-heading">
      <h2 id="hobby-shelf-heading" className="text-2xl font-bold text-stone-800 mb-4">
        Hobby Shelf
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {hobbyItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(item)}
              onFocus={() => setActive(item)}
              onClick={() => setActive(item)}
              className="w-full rounded-lg border border-amber-200 bg-white/75 p-4 text-left transition hover:border-amber-300 hover:bg-amber-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span className="text-2xl" aria-hidden>
                {item.icon}
              </span>
              <p className="mt-2 font-semibold text-stone-800">{item.title}</p>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 min-h-6 text-stone-600">{active ? active.description : "Hover a prop to preview a story."}</p>
    </section>
  );
}

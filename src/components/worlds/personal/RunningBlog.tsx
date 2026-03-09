import type { Post } from "@/data/posts";

type RunningBlogProps = { posts: Post[] };

/**
 * Personal micro-blog feed with tags and mood markers.
 */
export default function RunningBlog({ posts }: RunningBlogProps) {
  return (
    <section className="mb-14" aria-labelledby="blog-heading">
      <h2 id="blog-heading" className="text-2xl font-bold text-stone-800 mb-4">
        Micro-Blog Feed
      </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <article className="p-4 rounded-lg bg-white/70 shadow-sm border border-amber-100 hover:border-amber-200 transition-colors">
              <h3 className="font-semibold text-stone-800">{post.title}</h3>
              <time dateTime={post.date} className="text-sm text-stone-500">
                {post.date}
              </time>
              <p className="mt-1 text-stone-600">{post.excerpt}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-amber-700/80">
                  {post.mood}
                </span>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

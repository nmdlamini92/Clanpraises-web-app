export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="hidden md:block">
        <div className="h-16 w-full bg-stone-300/50 animate-pulse" />
      </div>
      <div className="md:hidden">
        <div className="h-14 w-full bg-stone-300/50 animate-pulse" />
      </div>

      {/* Main */}
      <div className="flex flex-col mt-8 flex-grow">

        {/* Search bar */}
        <div className="flex justify-center px-2">
          <div className="h-12 w-full max-w-2xl rounded-md bg-stone-200/70 animate-pulse" />
        </div>

        {/* Results line */}
        <div className="flex justify-center mt-10">
          <div className="h-4 w-64 bg-stone-300/60 animate-pulse rounded" />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center items-center mt-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <PostPoemCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div className="hidden sm:flex justify-center gap-6 mt-6">
        <div className="h-10 w-44 rounded-md bg-stone-300/60 animate-pulse" />
      </div>

      {/* Footer */}
      <div className="mt-8 md:mt-12 lg:mt-8">
        <div className="h-24 w-full bg-stone-300/50 animate-pulse" />
      </div>

    </div>
  );
}

/* ----------------------------- */
/* Card Skeleton (IN SAME FILE)  */
/* ----------------------------- */

function PostPoemCardSkeleton() {
  return (
    <div
      className="border border-[#ccc] rounded-lg shadow-md overflow-hidden m-4 pt-1
                 w-[200px] h-[200px]
                 sm:w-[240px] sm:h-[240px]
                 md:w-[260px] md:h-[260px]
                 lg:w-[290px] lg:h-[290px]
                 bg-white/20 animate-pulse"
    >
      {/* Location */}
      <div className="flex items-center px-2 mt-1">
        <div className="h-2 w-24 bg-stone-300/70 rounded" />
      </div>

      {/* Title */}
      <div className="flex justify-center mt-2">
        <div className="h-6 w-32 bg-stone-400/70 rounded" />
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-2">
        <div className="h-3 w-10 bg-stone-300/70 rounded" />
        <div className="h-3 w-10 bg-stone-300/70 rounded" />
      </div>

      {/* Poem lines */}
      <div className="flex flex-col items-center justify-center mt-3 px-2 space-y-1">
        <PoemLine width="w-32" />
        <PoemLine width="w-40" />
        <PoemLine width="w-36" />
        <PoemLine width="w-28" />
        <PoemLine width="w-44" />
      </div>
    </div>
  );
}

function PoemLine({ width }: { width: string }) {
  return <div className={`h-3 ${width} bg-stone-300/70 rounded`} />;
}

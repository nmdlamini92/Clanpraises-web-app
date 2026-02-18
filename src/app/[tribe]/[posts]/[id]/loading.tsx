export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="hidden md:block h-16 bg-stone-300/60 animate-pulse" />
      <div className="md:hidden h-14 bg-stone-300/60 animate-pulse" />

      {/* Main */}
      <div className="flex flex-col flex-grow mb-6">

        {/* Search */}
        <div className="mt-8 flex justify-center px-4">
          <div className="h-12 w-full max-w-2xl rounded-md bg-stone-200/70 animate-pulse" />
        </div>

        {/* Post card */}
        <div className="mt-16 flex justify-center">
          <PostSkeleton />
        </div>

        {/* Feedback */}
        <div className="flex justify-center mt-10 sm:mt-14">
          <div className="h-10 w-40 bg-stone-300/60 rounded animate-pulse" />
        </div>
      </div>

      {/* Footer */}
      <div className="h-24 bg-stone-300/60 animate-pulse" />
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="w-[90%] max-w-[700px] rounded-lg shadow-md border border-[#9a9393] bg-white/10 animate-pulse">

      {/* Clan praise + share */}
      <div className="flex justify-between px-2 pt-3">
        <div className="h-4 w-24 bg-stone-300/70 rounded" />
        <div className="flex gap-2">
          <IconCircle />
          <IconCircle />
          <IconCircle />
        </div>
      </div>

      {/* Location */}
      <div className="px-4 mt-3">
        <div className="h-3 w-32 bg-stone-300/60 rounded" />
      </div>

      {/* Title */}
      <div className="flex justify-center mt-4">
        <div className="h-8 w-44 bg-stone-400/70 rounded" />
      </div>

      {/* Views + notes */}
      <div className="flex justify-center gap-20 mt-4">
        <div className="h-4 w-10 bg-stone-300/60 rounded" />
        <div className="h-4 w-20 bg-stone-300/60 rounded" />
      </div>

      {/* Poem */}
      <div className="flex justify-center mt-6 px-4">
        <PoemSkeleton />
      </div>

      {/* Source */}
      <div className="flex justify-between px-2 py-3 mt-6">
        <div className="h-3 w-52 bg-stone-300/60 rounded" />
        <div className="h-5 w-5 bg-stone-300/60 rounded" />
      </div>

      {/* Bottom border */}
      <div className="h-2 bg-white/10 border-b border-[#9a9393] rounded-b-lg" />
    </div>
  );
}

function PoemSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 w-fit min-w-[200px] max-w-[500px]">
      <PoemLine w="w-40" />
      <PoemLine w="w-52" />
      <PoemLine w="w-48" />
      <PoemLine w="w-60" />
      <PoemLine w="w-44" />
      <PoemLine w="w-56" />
      <PoemLine w="w-36" />
    </div>
  );
}

function PoemLine({ w }: { w: string }) {
  return (
    <div className={`h-4 ${w} bg-stone-300/70 rounded`} />
  );
}

function IconCircle() {
  return (
    <div className="h-6 w-6 rounded bg-stone-300/60" />
  );
}


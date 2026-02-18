export default function Loading() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="hidden md:block">
        <div className="h-16 w-full bg-gray-200 animate-pulse" />
      </div>
      <div className="md:hidden">
        <div className="h-14 w-full bg-gray-200 animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex flex-col justify-center gap-4 p-2 mt-8 max-w-2xl w-full">

          {/* Add & Search Bar Skeleton */}
          <div className="h-12 w-full rounded-md bg-gray-200 animate-pulse" />

          {/* Featured Literature Heading */}
          <div className="mt-8 mb-4">
            <div className="h-4 w-40 bg-gray-200 animate-pulse" />
          </div>

          {/* Featured Literature Cards */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">

            {/* Book Card Skeleton */}
            <div className="flex flex-col items-center gap-3 bg-white/30 p-2 rounded-md w-full md:w-auto">
              {/* Title */}
              <div className="h-4 w-48 bg-gray-200 animate-pulse" />

              {/* Cover Image */}
              <div className="w-[280px] sm:w-[300px] h-[400px] sm:h-[430px] rounded-md bg-gray-300 animate-pulse border-2 border-amber-300/30" />
            </div>

            {/* Optional second card skeleton (if you re-enable later) */}
            {/* 
            <div className="flex flex-col items-center gap-3 bg-white/30 p-2 rounded-md w-full md:w-auto">
              <div className="h-4 w-56 bg-gray-200 animate-pulse" />
              <div className="w-[280px] sm:w-[300px] h-[400px] sm:h-[430px] rounded-md bg-gray-300 animate-pulse border-2 border-amber-300/30" />
            </div>
            */}
          </div>

          {/* Feedback Button Skeleton */}
          <div className="mt-6 flex justify-center">
            <div className="h-10 w-40 rounded-md bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="mt-8 md:mt-12">
        <div className="h-24 w-full bg-gray-200 animate-pulse" />
      </div>
    </>
  );
}

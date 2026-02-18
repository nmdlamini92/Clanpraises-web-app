export default function Loading() {
  return (
    <>
      <div className="flex flex-col min-h-screen">

        {/* Header */}
        <div className="hidden md:block">
          <div className="h-16 w-full bg-gray-200 animate-pulse" />
        </div>
        <div className="md:hidden">
          <div className="h-14 w-full bg-gray-200 animate-pulse" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col mt-8 items-center flex-grow">

          {/* Search Bar */}
          <div className="w-full max-w-2xl px-2">
            <div className="h-12 w-full rounded-md bg-gray-200 animate-pulse" />
          </div>

          {/* Tribe Title */}
          <div className="mt-6">
            <div className="h-8 sm:h-9 md:h-10 lg:h-11 w-56 sm:w-64 md:w-72 lg:w-80 bg-gray-300 animate-pulse rounded-md" />
          </div>

          {/* Clan List Skeleton */}
          <div className="flex flex-col mt-8 items-center flex-grow">
          <div className="flex-col justify-center items-center w-full">
            <div className="flex justify-center flex-wrap mt-4 lg:mt-5 lg:max-w-2xl md:max-w-2xl max-auto p-1">

              {/* Generate column skeletons */}
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="flex flex-col items-center min-w-[135px] p-1.5 gap-2"
                >
                  {Array.from({ length: 14 }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="h-4 md:h-5 w-24 md:w-28 bg-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              ))}

            </div>
            </div>

            {/* Feedback – large screens */}
            <div className="hidden lg:block">
              <div className="flex flex-col items-center mt-6">
                <div className="h-10 w-40 rounded-md bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Feedback – small screens */}
          <div className="sm:hidden mt-4">
            <div className="h-10 w-40 rounded-md bg-gray-200 animate-pulse mx-auto" />
          </div>

          {/* Feedback – medium screens */}
          <div className="hidden sm:flex lg:hidden gap-5 mt-6 md:mt-8">
            <div className="h-10 w-40 rounded-md bg-gray-200 animate-pulse" />
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-12 lg:mt-8">
          <div className="h-24 w-full bg-gray-200 animate-pulse" />
        </div>

      </div>
    </>
  );
}


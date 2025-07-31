export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center h-[46px] rounded-full overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white px-4 focus-within:ring-2 border-2 border-yellow-300 focus-within:ring-yellow-600 transition-shadow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 30 30"
        fill="#9CA3AF"
        className="mr-2"
      >
        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
      </svg>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="w-full h-full outline-none text-gray-700 bg-transparent placeholder-gray-400 text-sm"
      />

      {/* Clear Button - only shows when there's text */}
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 hover:text-gray-600"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}

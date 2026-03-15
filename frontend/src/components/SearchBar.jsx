import React from 'react';

const SearchBar = ({ query, setQuery, handleSearch, loading }) => {
  return (
    <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2 mb-10">
      <input 
        type="text" 
        placeholder="Name or Phone Number..."
        className="flex-grow p-4 rounded-xl border-none shadow-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        type="submit"
        disabled={loading}
        className="bg-emerald-600 text-white px-6 rounded-xl font-bold hover:bg-emerald-700 shadow-lg disabled:opacity-50 transition-colors"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
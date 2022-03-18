import React from 'react'

interface SearchBarProps {
  className: string
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <div className={className}>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <input
          className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Input product url..."
          type="text"
          name="url"
        />
      </label>
    </div>
  )
}

export default SearchBar

//    style="enable-background:new 0 0 56.966 56.966;"

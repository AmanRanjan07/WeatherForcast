import React from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const SearchInput = ({
  value,
  onChange,
  onSearch,
  onLocationClick,
  loading,
  className,
  ...props
}) => {
  return (
    <div className={cn('relative flex w-full max-w-md gap-2', className)}>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white shadow-sm"
          placeholder="Search location..."
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          {...props}
        />
      </div>
      <button
        onClick={onSearch}
        disabled={loading}
        className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Search'
        )}
      </button>
      <button
        onClick={onLocationClick}
        className="p-2 rounded-full border border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
        title="Use current location"
      >
        <MapPin className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};

export default SearchInput; 
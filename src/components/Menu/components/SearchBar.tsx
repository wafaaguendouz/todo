import React from 'react';
import { Delete } from 'lucide-react';
import Input from '../../common/Input';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="menu-section" role="search">
      <div className="search-container">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <div onClick={() => onSearchChange('')} className="clear-search">
            <Delete size={20} color="var(--text-muted)" />
          </div>
        )}
      </div>
      <span id="search-instructions" className="sr-only">
        Type to search for tasks, lists, or tags.
      </span>
    </div>
  );
};

export default SearchBar;

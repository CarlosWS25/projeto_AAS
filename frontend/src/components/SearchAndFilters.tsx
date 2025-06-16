
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (category: string) => void;
  onClearFilters: () => void;
  categories: string[];
  activeFilter: string;
}

const SearchAndFilters = ({ 
  onSearch, 
  onFilterChange, 
  onClearFilters, 
  categories, 
  activeFilter 
}: SearchAndFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="bg-blue-800/30 border border-blue-400 rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
          <Input
            placeholder="Pesquisar vídeos..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-blue-700/50 border-blue-400 text-white placeholder:text-blue-200"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={activeFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-48 bg-blue-700/50 border-blue-400 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent className="bg-blue-800 border-blue-400">
              <SelectItem value="all" className="text-white hover:bg-blue-700">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-blue-700">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {(searchQuery || activeFilter !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                onSearch("");
                onClearFilters();
              }}
              className="text-white border-blue-400 hover:bg-blue-700"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;

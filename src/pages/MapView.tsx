import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { mockIssues } from '@/lib/mockData';
import { MapPin, Calendar, User, Building2, Search, Loader2, X } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

const MapView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, display_name: string} | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredIssues = mockIssues.filter(issue => {
    const categoryMatch = selectedCategory === 'all' || issue.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || issue.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const categories = [...new Set(mockIssues.map(issue => issue.category))];
  const statuses = [...new Set(mockIssues.map(issue => issue.status))];

  // Geocoding function using Nominatim API
  const searchLocation = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation({
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
      display_name: location.display_name
    });
    setSearchQuery(location.display_name);
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedLocation(null);
  };

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length > 2) {
      searchTimeoutRef.current = setTimeout(() => {
        searchLocation(searchQuery);
      }, 500);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title="Interactive Map" 
        subtitle="Geographic view of all reported issues"
      />

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Map Filters</span>
              </CardTitle>
              <CardDescription>
                Filter issues by category and status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location Search */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Search Location
                </label>
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Enter location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      {isSearching && (
                        <Loader2 className="text-muted-foreground w-4 h-4 animate-spin" />
                      )}
                      {searchQuery && !isSearching && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={clearSearch}
                          className="h-6 w-6 p-0 hover:bg-accent"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Search Results Dropdown */}
                  {searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-accent cursor-pointer text-sm border-b border-border last:border-b-0"
                          onClick={() => handleLocationSelect(result)}
                        >
                          <div className="font-medium truncate">{result.display_name}</div>
                          <div className="text-xs text-muted-foreground">
                            {result.lat}, {result.lon}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Status
                </label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-xs text-muted-foreground">Resolved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <span className="text-xs text-muted-foreground">In Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <span className="text-xs text-muted-foreground">Acknowledged</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span className="text-xs text-muted-foreground">Urgent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                    <span className="text-xs text-muted-foreground">Submitted</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-sm font-medium text-foreground mb-2">
                  Showing {filteredIssues.length} of {mockIssues.length} issues
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Map */}
          <Card className="lg:col-span-3">
            <CardContent className="p-6">
              <div className="h-[600px] rounded-lg overflow-hidden border border-border">
                <LeafletMap issues={filteredIssues} selectedLocation={selectedLocation} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;

type IssueType = typeof mockIssues[number];

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function FitToBounds({ issues }: { issues: IssueType[] }) {
  const map = useMap();
  const bounds = useMemo(() => {
    if (issues.length === 0) return null;
    const latLngs = issues.map(i => [i.lat, i.lng]) as [number, number][];
    return L.latLngBounds(latLngs);
  }, [issues]);
  useEffect(() => {
    if (!bounds) return;
    // Add a small padding so markers are not at the very edge
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [bounds, map]);
  return null;
}

function NavigateToLocation({ selectedLocation }: { selectedLocation: {lat: number, lng: number, display_name: string} | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.lat, selectedLocation.lng], 15);
    }
  }, [selectedLocation, map]);
  
  return null;
}

function LeafletMap({ issues, selectedLocation }: { issues: IssueType[], selectedLocation: {lat: number, lng: number, display_name: string} | null }) {
  const center = useMemo(() => {
    return issues.length
      ? [issues[0].lat, issues[0].lng] as [number, number]
      : [40.7589, -73.9851] as [number, number];
  }, [issues]);

  return (
    <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToBounds issues={issues} />
      <NavigateToLocation selectedLocation={selectedLocation} />
      {issues.map(issue => (
        <Marker key={issue.id} position={[issue.lat, issue.lng]} icon={defaultIcon}>
          <Popup>
            <div className="space-y-1">
              <div className="font-medium">{issue.title}</div>
              <div className="text-xs text-muted-foreground capitalize">{issue.category}</div>
              <div className="text-xs">{new Date(issue.created_at).toLocaleDateString()}</div>
            </div>
          </Popup>
        </Marker>
      ))}
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={defaultIcon}>
          <Popup>
            <div className="space-y-1">
              <div className="font-medium">Searched Location</div>
              <div className="text-xs text-muted-foreground">{selectedLocation.display_name}</div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
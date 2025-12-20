"use client";

interface TabFiltersProps {
    activeTab: 'residents' | 'facilities';
    onTabChange: (tab: 'residents' | 'facilities') => void;
    activeFilter: 'all' | 'images' | 'videos';
    onFilterChange: (filter: 'all' | 'images' | 'videos') => void;
}

export default function TabFilters({ activeTab, onTabChange, activeFilter, onFilterChange }: TabFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-full">
                <button
                    onClick={() => onTabChange('residents')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'residents'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                >
                    Happy Residents
                </button>
                <button
                    onClick={() => onTabChange('facilities')}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'facilities'
                            ? 'bg-primary text-white shadow-md'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                >
                    Facilities & Rooms
                </button>
            </div>

            {/* Type Filters */}
            <div className="flex gap-3">
                {(['all', 'images', 'videos'] as const).map(filter => (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${activeFilter === filter
                                ? 'bg-primary/10 text-primary border-2 border-primary'
                                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-primary/30'
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

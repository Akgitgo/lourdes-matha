"use client";

interface TabFiltersProps {
    activeTab: 'facilities' | 'moments' | 'environment';
    onTabChange: (tab: 'facilities' | 'moments' | 'environment') => void;
    activeFilter: 'all' | 'images' | 'videos';
    onFilterChange: (filter: 'all' | 'images' | 'videos') => void;
}

export default function TabFilters({ activeTab, onTabChange, activeFilter, onFilterChange }: TabFiltersProps) {
    const tabs: { id: 'facilities' | 'moments' | 'environment'; label: string }[] = [
        { id: 'facilities', label: 'Facilities' },
        { id: 'moments', label: 'Moments of Joy' },
        { id: 'environment', label: 'Environment' }
    ];

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 bg-slate-100 p-1 rounded-2xl md:rounded-full">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === tab.id
                            ? 'bg-primary text-white shadow-md'
                            : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
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

import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { filterType } from "@/lib/data";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
    filter,
    setFilter,
    completedTaskCount = 0,
    activeTaskCount = 0,
}) => {
    return (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
            {/* phần thống kê */}
            <div className="flex gap-3">
                <Badge
                    variant="secondary"
                    className="bg-white/50 text-accent-foreground border-info/20"
                >
                    {activeTaskCount} {filterType.active}
                </Badge>
                <Badge
                    variant="success"
                    className="bg-white/50 text-success border-success/20"
                >
                    {completedTaskCount} {filterType.completed}
                </Badge>
            </div>

            {/* phần filter */}
            <div className="flex gap-2 flex-wrap">
                {Object.keys(filterType).map((type) => (
                    <Button
                        key={type}
                        variant={filter === type ? "gradient" : "ghost"}
                        size="sm"
                        className="capitalize"
                        onClick={() => setFilter(type)}
                    >
                        <Filter className="size-4" />
                        {filterType[type]}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default StatsAndFilters;

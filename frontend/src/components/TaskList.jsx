import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({ filteredTasks, filter, handleUpdated }) => {
    if (!filteredTasks || filteredTasks.length === 0) {
        return <TaskEmptyState filter={filter}></TaskEmptyState>;
    }
    return (
        <div className="space-y-3">
            {filteredTasks.map((task, index) => {
                return (
                    <TaskCard
                        key={task._id ?? index}
                        task={task}
                        index={index}
                        handleUpdated={handleUpdated}
                    ></TaskCard>
                );
            })}
        </div>
    );
};

export default TaskList;

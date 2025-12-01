import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { limitDataTaskList } from "@/lib/data";
import { backgroundColor as backgroundColorList } from "@/lib/backgroundColor";
import { Divide } from "lucide-react";
import ChangeBackgroundColor from "@/components/ChangeBackgroundColor";
const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completedTaskCount, setCompletedTaskCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [filterDate, setFilterDate] = useState("all");
    const [page, setPage] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState(
        backgroundColorList[0].value
    );

    useEffect(() => {
        fetchTasks();
    }, [filterDate]);

    useEffect(() => {
        setPage(1);
    }, [filter, filterDate]);

    const fetchTasks = async () => {
        try {
            const res = await api.get(
                `/tasks${filterDate ? `?filter=${filterDate}` : ""}`
            );
            setTaskBuffer(res.data.data);
            setActiveTaskCount(res.data.activeTaskCount);
            setCompletedTaskCount(res.data.completedTaskCount);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            toast.error("Failed to fetch tasks. Please try again later.");
        }
    };

    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active"; // Chỉ hiển thị task đang hoạt động
            case "completed":
                return task.status === "completed"; // Chỉ hiển thị task đã hoàn thành
            case "all":
                return true; // Hiển thị tất cả các task
            default:
                return true;
        }
    });

    const visibleTask = filteredTasks.slice(
        (page - 1) * limitDataTaskList,
        page * limitDataTaskList
    );

    const totalPage = Math.ceil(filteredTasks.length / limitDataTaskList);

    const handleTasksChanged = () => {
        fetchTasks();
    };

    const handleNext = () => {
        if (page < totalPage) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (visibleTask.length === 0) {
        handlePrev();
    }

    return (
        <div className="min-h-screen min-w-sm w-full bg-white relative">
            {/* background color */}
            <div className="absolute inset-0 z-0" style={backgroundColor} />
            {/* Your Content/Components */}
            <div className="relative z-10 ">
                <div className="fixed right-2 top-2">
                    <ChangeBackgroundColor
                        setBackgroundColor={setBackgroundColor}
                        backgroundColor={backgroundColor}
                    />
                </div>
                <div className="container pt-8 px-1 md:px-auto">
                    <div className="w-full max-w-2xl p-6 mx-auto space-y-6 ">
                        {/* header */}
                        <Header />
                        {/* Tạo nhiệm vụ */}
                        <AddTask handleNewTaskAdded={handleTasksChanged} />
                        {/* Thống kê & Bộ lọc */}
                        <StatsAndFilters
                            filter={filter}
                            setFilter={setFilter}
                            activeTaskCount={activeTaskCount}
                            completedTaskCount={completedTaskCount}
                        />
                        {/* Danh sách nhiệm vụ */}
                        <TaskList
                            filteredTasks={visibleTask}
                            filter={filter}
                            handleUpdated={handleTasksChanged}
                        />
                        {/* phân trang và lọc theo date */}
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <TaskListPagination
                                handleNext={handleNext}
                                handlePrev={handlePrev}
                                handlePageChange={handlePageChange}
                                page={page}
                                totalPage={totalPage}
                            />
                            <DateTimeFilter
                                filterDate={filterDate}
                                setFilterDate={setFilterDate}
                            />
                        </div>
                        {/* footer */}
                        <Footer
                            completedTaskCount={completedTaskCount}
                            activeTaskCount={activeTaskCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

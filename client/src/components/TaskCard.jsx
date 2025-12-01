import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
    Calendar,
    CheckCircle2,
    Circle,
    SquarePen,
    Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";

const TaskCard = ({ task, index, handleUpdated }) => {
    const [editedTitle, setEditedTitle] = useState(task.title || "");
    const [isEditing, setIsEditing] = useState(false);
    const formatDate = (date) => {
        // định dạng ngày giờ theo dạng DD/MM/YYYY HH:MM
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const time = date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${day}/${month}/${year} ${time}`;
    };
    const deleteCard = async (taskId) => {
        try {
            await api.delete(`/tasks/delete/${taskId}`);
            handleUpdated();
            toast.success("Xóa nhiệm vụ thành công!");
        } catch (e) {
            toast.error("Lỗi khi xóa nhiệm vụ!");
            console.log("Lỗi khi xóa nhiệm vụ:", e);
        }
    };

    const updateTask = async (taskTitle) => {
        try {
            await api.put(`/tasks/update/${task._id}`, {
                title: taskTitle,
            });
            toast.success("Update thành công!");
            handleUpdated();
        } catch (e) {
            toast.error("Thất bại khi update title!");
            console.log("Thất bại khi update title: ", e);
        }
    };

    const updateStatus = async () => {
        try {
            await api.put(`/tasks/update/${task._id}`, {
                status: task.status === "completed" ? "active" : "completed",
            });
            toast.success(`Nhiệm vụ: ${task.title}`, {
                description: `Cập nhật status ${
                    task.status === "completed"
                        ? "chưa hoàn thành!"
                        : "đã hoàn thành!"
                }`,
            });
            handleUpdated();
        } catch (e) {
            toast.error("Thất bại khi cập nhật trạng thái!");
            console.log("Thất bại khi cập nhật trạng thái: ", e);
        }
    };

    return (
        <Card
            className={cn(
                "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
                task.status === "completed" && "opacity-75"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="flex items-center gap-4">
                {/* nút tròn */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "completed"
                            ? "text-success hover:text-success/80"
                            : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={() => updateStatus()}
                >
                    {task.status === "completed" ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>

                {/* nội dung nhiệm vụ */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <Input
                            type="input"
                            placeholder="Cần phải làm gì?"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    updateTask(editedTitle);
                                    setIsEditing(false);
                                }
                            }}
                            autoFocus
                            onBlur={() => setIsEditing(false)}
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/50"
                        ></Input>
                    ) : (
                        <p
                            className={cn(
                                "text-base transition-all duration-200",
                                task.status === "completed"
                                    ? "line-through text-muted-foreground"
                                    : "text-foreground"
                            )}
                            onClick={() => setIsEditing(true)}
                        >
                            {task.title}
                        </p>
                    )}
                    {/* Ngày tạo */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {formatDate(new Date(task.createdAt))}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground">
                                    -
                                </span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(new Date(task.completedAt))}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* nút chỉnh sửa và xóa */}
                <div
                    className={cn(
                        "hidden gap-2 group-hover:inline-flex animate-slide-up ",
                        isEditing ? "inline-flex" : "hidden"
                    )}
                >
                    {/* nút chỉnh sửa */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => setIsEditing(true)}
                    >
                        <SquarePen className="size-4" />
                    </Button>
                    {/* nút xóa */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteCard(task._id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;

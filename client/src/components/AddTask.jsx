import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post("/tasks/add", {
                    title: newTaskTitle,
                });
                toast.success(`Thêm nhiệm vụ "${newTaskTitle}" thành công!`);
                handleNewTaskAdded();
            } catch (e) {
                toast.error("Lỗi khi thêm task mới!");
                console.log(e);
            }

            setNewTaskTitle("");
        } else {
            toast.error("Bạn cần nhập nội dung nhiệm vụ!");
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };
    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="sm:flex-row flex gap-3 items-center">
                <Input
                    type="input"
                    placeholder="todo here!"
                    className="h-12 sm:flex-1 bg-slate-50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                        setNewTaskTitle(e.target.value);
                    }}
                ></Input>
                <Button
                    variant="gradient"
                    size="xl"
                    className="px-6"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5" />
                    Thêm
                </Button>
            </div>
        </Card>
    );
};

export default AddTask;

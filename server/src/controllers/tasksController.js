import { Task } from "../models/Task.js";
import mongoose from "mongoose";
export const getAllTask = async (req, res) => {
    const { filter } = req.query;
    console.log("filter: ", filter);
    const now = new Date(); //trả về ngày hôm nay
    let startDate;
    switch (filter) {
        case "today": {
            startDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );
            console.log("start date:", startDate);
            break;
        }
        case "week": {
            const mondayDate =
                now.getDate() -
                (now.getDay() - 1) -
                (now.getDay() === 0 ? 7 : 0);
            //lấy ra thứ 2 trong tuần dựa vào ngày hiện tại.
            //now.getDate lấy ra ngày trong tháng/ ví dụ tháng này có 30 ngày => trả về 30
            //now.getDay trả về thứ trong tuần (0,1,2,3,4,5,6) 0: là chủ nhật 1->6 từ thứ 2 đến thứ 7
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            console.log("start date:", startDate);
            console.log("monday date:", mondayDate);
            break;
        }
        case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            console.log("start date:", startDate);
            break;
        }
        default:
            startDate = "";
            console.log("start date:", startDate);
            break;
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {}; //$gte = greater than or equal (≥) trong MongoDB.
    try {
        // Sử dụng aggregation để lấy cả danh sách task và đếm số lượng task theo trạng thái
        const data = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    // pipeline riêng biệt để lấy dữ liệu khác nhau trong một lần gọi
                    tasks: [{ $sort: { createdAt: -1 } }], // Sắp xếp theo createdAt giảm dần
                    activeTaskCount: [
                        { $match: { status: "active" } }, // Lọc các task có trạng thái "active" sau đó count
                        { $count: "count" },
                    ],
                    completedTaskCount: [
                        { $match: { status: "completed" } }, // Lọc các task có trạng thái "completed" sau đó count
                        { $count: "count" },
                    ],
                },
            },
        ]);
        const result = data[0].tasks;
        const activeTaskCount = data[0].activeTaskCount[0]?.count || 0;
        const completedTaskCount = data[0].completedTaskCount[0]?.count || 0;
        res.status(200).json({
            message: "Get all tasks successfully",
            completedTaskCount: completedTaskCount,
            activeTaskCount: activeTaskCount,
            data: result,
        });
    } catch (e) {
        console.log("Lỗi khi gọi getAllTask:", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res
                .status(400)
                .json({ message: "Title and description are required" });
        }
        const task = new Task({ title, description });
        const savedTask = await task.save();
        res.status(200).json({
            message: "Task added successfully",
            data: savedTask,
        });
    } catch (e) {
        console.log("Lỗi khi gọi addTask:", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const { title, description, status } = req.body;

        const updatedData = { title, description, status };
        if (status === "completed") {
            updatedData.completedAt = new Date();
        } else {
            updatedData.completedAt = null;
        }

        const updatedTask = await Task.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
        });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (e) {
        console.log("Lỗi khi gọi updateTask:", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (e) {
        console.log("Lỗi khi gọi deleteTask:", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

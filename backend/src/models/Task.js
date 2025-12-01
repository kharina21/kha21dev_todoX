import mongoose from "mongoose";

// trim : nếu có khoảng trắng ở đầu hoặc cuối thì sẽ tự động xóa đi
// enum : chỉ cho phép nhập các giá trị trong mảng

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        status: {
            type: String,
            enum: ["active", "complteted"],
            default: "active",
        },
        completedAt: { type: Date, default: null },
    },

    {
        // mongoose sẽ tự động thêm createdAt và updatedAt
        timestamps: true,
    }
);
export const Task = mongoose.model("Task", taskSchema);

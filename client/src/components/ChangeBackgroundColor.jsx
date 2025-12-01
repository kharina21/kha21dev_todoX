import React, { useState, useRef, useEffect } from "react";
import { backgroundColor as backgroundColorList } from "@/lib/backgroundColor";
import { cn } from "@/lib/utils";

const ChangeBackgroundColor = ({ setBackgroundColor, backgroundColor }) => {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef(null);

    // Đóng popover khi click ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleChangeBackgroundColor = (bg) => {
        setBackgroundColor(bg.value);
        setOpen(false);
    };

    // Lấy màu active đề làm button chính
    const currentColorObj =
        backgroundColorList.find(
            (bg) => JSON.stringify(bg.value) === JSON.stringify(backgroundColor)
        ) || backgroundColorList[0];

    return (
        <div ref={popoverRef} className="relative inline-block">
            {/* Nút chính: hiện màu đã chọn */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                style={currentColorObj.value}
                className={cn(
                    "rounded-full w-10 h-10 border-2 border-gray-400 shadow transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                )}
                title="Đổi nền trang"
            ></button>

            {/* Popover lựa chọn màu */}
            {open && (
                <div className="absolute right-0  mt-2 px-2 py-2 bg-white rounded-xl shadow-lg flex flex-col justify-center items-center gap-2 z-20">
                    {backgroundColorList.map((bg, idx) => (
                        <button
                            key={idx}
                            style={bg.value}
                            className={cn(
                                "rounded-full w-7 h-7 border border-gray-300 cursor-pointer outline-none transition-transform",
                                JSON.stringify(bg.value) ===
                                    JSON.stringify(backgroundColor)
                                    ? "ring-2 ring-blue-400 scale-110"
                                    : "hover:scale-110"
                            )}
                            title={bg.name}
                            onClick={() => handleChangeBackgroundColor(bg)}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChangeBackgroundColor;

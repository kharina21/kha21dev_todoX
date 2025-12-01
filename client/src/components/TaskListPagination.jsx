import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TaskListPagination = ({
    handleNext,
    handlePrev,
    handlePageChange,
    page,
    totalPage,
}) => {
    // Sửa generatePages cho đúng
    const generatePages = () => {
        const pages = [];
        if (totalPage < 5) {
            // Hiển thị tất cả các trang nếu số trang <= 5
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            // Số trang > 5
            if (page <= 3) {
                // Trang hiện tại thuộc 3 trang đầu
                pages.push(1, 2, 3, "...", totalPage);
            } else if (page >= totalPage - 1) {
                // Trang hiện tại thuộc 3 trang cuối
                pages.push(
                    1,
                    "...",

                    totalPage - 2,
                    totalPage - 1,
                    totalPage
                );
            } else {
                // Ở giữa
                pages.push(
                    1,
                    "...",
                    page - 1,
                    page,
                    page + 1,
                    "...",
                    totalPage
                );
            }
        }
        return pages;
    };
    const pagesToShow = generatePages();
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    {/* trước */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={page === 1 ? undefined : handlePrev}
                            className={cn(
                                "cursor-pointer",
                                page === 1 && "pointer-events-none opacity-50"
                            )}
                        />
                    </PaginationItem>

                    {pagesToShow.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => {
                                        if (p !== page) handlePageChange(p);
                                    }}
                                    className={cn("cursor-pointer")}
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* next */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={
                                page === totalPage ? undefined : handleNext
                            }
                            className={cn(
                                "cursor-pointer",
                                page === totalPage &&
                                    "pointer-events-none opacity-50"
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default TaskListPagination;

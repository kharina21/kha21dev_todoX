import React from "react";

const Footer = ({ completedTaskCount = 1, activeTaskCount = 0 }) => {
    return (
        <>
            {completedTaskCount + activeTaskCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground flex text-center items-center justify-center w-full">
                        {completedTaskCount > 0 && (
                            <>
                                🎉 Tuyệt vời bạn đã hoàn thành{" "}
                                {completedTaskCount} việc rồi!{" "}
                                {activeTaskCount > 0
                                    ? `Còn ${activeTaskCount} việc đang chờ bạn hoàn thành.`
                                    : "Bạn đã hoàn thành tất cả nhiệm vụ rồi! Nghỉ ngơi thôi nào! "}
                            </>
                        )}
                        {completedTaskCount === 0 && activeTaskCount > 0 && (
                            <>
                                Bạn còn {activeTaskCount} việc cần hoàn thành.
                                Cố lên nhé! 🚀
                            </>
                        )}
                    </p>
                </div>
            )}
        </>
    );
};

export default Footer;

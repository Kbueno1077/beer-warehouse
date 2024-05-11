import React from "react";
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowUp,
    MdOutlineKeyboardDoubleArrowDown,
    MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";

interface ImpressionIconsProps {
    initial_impression: string;
}

function ImpressionIcons({ initial_impression }: ImpressionIconsProps) {
    return (
        <>
            {initial_impression === "Excellent" && (
                <div className="">
                    <MdOutlineKeyboardArrowUp
                        style={{
                            color: "green",
                            fontSize: 18,
                            translate: "0 4px",
                        }}
                    />
                    <MdOutlineKeyboardDoubleArrowUp
                        style={{
                            color: "green",
                            fontSize: 18,
                            translate: "0 -5.5px",
                        }}
                    />
                </div>
            )}
            {initial_impression === "Amazing" && (
                <MdOutlineKeyboardDoubleArrowUp
                    style={{ color: "green", fontSize: 18 }}
                />
            )}

            {initial_impression === "Good" && (
                <MdOutlineKeyboardArrowUp
                    style={{ color: "green", fontSize: 18 }}
                />
            )}

            {initial_impression === "Average" && (
                <MdOutlineKeyboardArrowRight
                    style={{ color: "gray", fontSize: 18 }}
                />
            )}
            {initial_impression === "Bad" && (
                <MdOutlineKeyboardArrowDown
                    style={{ color: "red", fontSize: 18 }}
                />
            )}
            {initial_impression === "Awful" && (
                <MdOutlineKeyboardDoubleArrowDown
                    style={{ color: "red", fontSize: 18 }}
                />
            )}
            {initial_impression === "Horrible" && (
                <div>
                    <MdOutlineKeyboardArrowDown
                        style={{
                            color: "red",
                            fontSize: 18,
                            translate: "0 4px",
                        }}
                    />
                    <MdOutlineKeyboardDoubleArrowDown
                        style={{
                            color: "red",
                            fontSize: 18,
                            translate: "0 -5.5px",
                        }}
                    />
                </div>
            )}
        </>
    );
}

export default ImpressionIcons;

import React from "react";

export default function Idle({ message }: { message: string }) {
    return (
        <div className="w-full h-full p-9">
            <p className="text-gray-300"><i>{ message }</i></p>
        </div>
    )
}
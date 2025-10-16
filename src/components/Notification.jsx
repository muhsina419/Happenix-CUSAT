import React from 'react';

const Notification = ({ message, type, onDismiss }) => {
    if (!message) return null;

    const baseClasses = "p-4 rounded-md mb-4 text-sm flex justify-between items-center shadow-lg";
    const typeClasses = {
        success: "bg-green-100 border border-green-400 text-green-700",
        error: "bg-red-100 border border-red-400 text-red-700",
        info: "bg-blue-100 border border-blue-400 text-blue-700",
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-4 font-bold text-lg">&times;</button>
        </div>
    );
};

export default Notification;
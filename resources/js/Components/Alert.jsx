import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react"; // pakai icon lucide-react biar modern

export default function Alert({ type = "success", message, duration = 4000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!message || !visible) return null;

    const styles = {
        success: "bg-green-100 text-green-800 border-green-300",
        error: "bg-red-100 text-red-800 border-red-300",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
        info: "bg-blue-100 text-blue-800 border-blue-300",
    };

    return (
        <div
            className={`relative mb-4 p-3 rounded-lg border text-sm font-medium flex justify-between items-center ${styles[type]}`}
        >
            <span>{message}</span>
            <button
                onClick={() => setVisible(false)}
                className="ml-2 text-slate-500 hover:text-slate-700"
            >
                <X size={16} />
            </button>
        </div>
    );
}

Alert.propTypes = {
    type: PropTypes.oneOf(["success", "error", "warning", "info"]),
    message: PropTypes.string,
    duration: PropTypes.number,
};

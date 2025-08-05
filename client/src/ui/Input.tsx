import type { InputHTMLAttributes } from "react"
import type React from "react"
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    label?: string,
    name: string,
    type: string,
    value: string
    placeholder: string
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    name,
    type,
    value,
    placeholder
}) => {
    const inputId = id || `input-${name}`;
    return(
        <motion.div
            className="mb-4"
        >
            <label 
                htmlFor={inputId}
                className="relative font-semibold text-sm text-text_color_secondary"
            >
                {label}
            </label>
            <input 
                id={inputId} 
                type={type} 
                value={value}
                placeholder={placeholder}
                className="w-full border-0 border-gray-300 bg-white rounded-[13px] px-6 py-4 font-family-sans shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] text-sm font-medium"
            />
        </motion.div>
    )
};
export default Input;
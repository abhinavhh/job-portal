import type { InputHTMLAttributes } from "react"
import type React from "react"
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    name,
    type,
    value,
    placeholder,
    onChange
}) => {
    const inputId = id || `input-${name}`;
    return(
        <motion.div
            whileFocus={{scale: 1.2}}
            className="mb-4 flex flex-col"
        >
            <label 
                htmlFor={inputId}
                className="relative font-semibold text-sm text-text_color_secondary left-1.5 bottom-0.3"
            >
                {label}
            </label>
            <input 
                id={inputId} 
                name={name}
                type={type} 
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-[316px] h-[45px] border-0 border-gray-300 bg-white rounded-[13px] px-6 py-3 font-family-sans shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] text-sm font-medium"
            />
        </motion.div>
    )
};
export default Input;
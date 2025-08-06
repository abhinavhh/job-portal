import type { InputHTMLAttributes } from "react"
import type React from "react"
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    name: string;
    type: string;
    value: string | number;
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
            className="mb-4 flex flex-col"
        >
            <motion.label 
                htmlFor={inputId}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.9}}
                className="relative font-semibold text-sm text-text_color_secondary left-1.5 bottom-0.3"
            >
                {label}
            </motion.label>
            <motion.input 
                whileHover={{scale: 1.02}}
                initial={{y: 5, x: -5, opacity: 0}}
                animate={{y: 0, x:0,opacity: 1}}
                transition={{duration: 0.6}}
                id={inputId} 
                name={name}
                type={type} 
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-[316px] h-[45px] border-0 border-gray-300 bg-white rounded-[13px] px-6 py-3 font-family-sans shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] text-sm font-medium"
                required
            />
        </motion.div>
    )
};
export default Input;
import type { InputHTMLAttributes } from "react"
import type React from "react"
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    label?: string,
    name: string,
    type: string,
    value: string
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    name,
    type,
    value
}) => {
    const inputId = id || `input-${name}`;
    return(
        <motion.div
            className="mb-4"
        >
            <label 
                htmlFor={inputId}
            >
                {label}
            </label>
            <input 
                id={inputId} 
                type={type} 
                value={value} 
            />

        </motion.div>
    )
};
export default Input;
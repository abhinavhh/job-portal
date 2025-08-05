import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';

interface FormData {
    email: string,
    password: string,
}
const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section id= "login" className='min-h-screen flex'>

            {/* Right side section */}
            <div
                className='hidden md:block w-full md:max-w-1/2 bg-bg_color relative'
            >
                
                <h1 
                    className='font-family-sans text-text_color font-extrabold text-4xl absolute top-[283px] left-1/2 transform -translate-x-1/2'
                >
                    Welcome
                </h1>
            </div>

            {/* left side section */}
            <div 
                className='w-full md:max-w-1/2 flex justify-center items-center'
            >
                <motion.div
                    className='opacity-100 bg-bg_secondary shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl px-12 py-16'
                >
                    <h1 className='font-bold font-family-sans text-center py-8 '>Login</h1>

                    <motion.div
                        className='flex justify-center font-family-sans font-medium text-sm'
                    >
                        <p>Don't have no account ?{" "}
                            <Link
                                to="/register"
                                className='underline underline-offset-2'
                            >
                                Create Account
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default LoginForm
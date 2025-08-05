import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';

interface FormData {
    email: string,
    password: string,
}
const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const result: any = await fetch('/auth/login',{
                method: "POST",
                headers: {
                    'ContentType': 'application/json'
                },
                body:  JSON.stringify(formData)
            });
            if(!result.ok) {
                const err = await result.json();
                throw new Error(err.message ||'Login Failed');
            }
            alert('Login Successfull');
            navigate('/profile');

        }
        catch ( err: any ) {
            setError(err.message);
        }
    }

    return (
        <motion.div
            className='opacity-100 bg-bg_secondary shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl px-12 py-14'
        >
            <h1 className='font-bold font-family-sans text-center py-6 text-base'>Login</h1>
            {error && <p>{error}</p>}

            <motion.form 
                onSubmit={handleSubmit}
            >
                <Input id="email" label='Email :' type='email' value={formData.email} name='email' placeholder='Enter Your Email'/>
                <Input id="password" label="Password :" type='password' value={formData.password} name="password" placeholder="Enter Your Password"/>

                <Link 
                    to="/forgotPass"
                    className='relative bottom-4 left-48 font-family-sans font-normal text-[12px] underline underline-offset-3 hover:text-blue-500'
                >
                    Forget Password
                </Link>
            </motion.form>

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
    );
}

export default LoginForm
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

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
        console.log(formData);
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
                className='flex flex-col items-center justify-center gap-y-1'
            >
                <Input id="email" label='Email :' type='email' value={formData.email} name='email' placeholder='Enter Your Email' onChange={handleChange}/>
                <Input id="password" label="Password :" type='password' value={formData.password} name="password" placeholder="Enter Your Password" onChange={handleChange}/>

                <Link 
                    to="/forgotPass"
                    className='relative bottom-4 left-26 font-family-sans font-normal text-[12px] underline underline-offset-3 hover:text-blue-600 mb-4'
                >
                    Forget Password
                </Link>
                 <Button variant='primary' size='md' isLoading={false} children="Login" />
                <motion.div
                    className='text-center bg-white font-family-sans font-normal rounded-lg w-[194px]'
                >
                    <p>Login with google</p>
                </motion.div>
            </motion.form>
           

            
            <motion.div
                className='flex justify-center font-family-sans font-medium text-sm my-12'
            >
                <p>Don't have no account ?{" "}
                    <Link
                        to="/register"
                        className='underline underline-offset-2 hover:text-blue-600'
                    >
                        Create Account
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
}

export default LoginForm
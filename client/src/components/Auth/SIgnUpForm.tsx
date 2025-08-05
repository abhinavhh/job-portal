import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

interface FormData {
    username: string,
    email: string,
    phone: number,
    password: string,
}
const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phone: 0,
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
            const result: any = await fetch('/api/register',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify(formData)
            });
            if(!result.ok) {
                const err = await result.json();
                throw new Error(err.message ||'Login Failed');
            }
            const message = await result.json();
            alert(`${message}`);
            navigate('/login');

        }
        catch ( err: any ) {
            setError(err.message);
        }
    }

    return (
        <motion.div
            className='opacity-100 bg-bg_secondary shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl px-12 max-w-[432px]'
        >
            <h1 className='font-bold font-family-sans text-center py-6 text-base mt-4'>Sign UP</h1>
            {error && <motion.p 
                initial={{y:-20}}
                animate={{y:0}}
            className='text-center text-red-700 mb-2 p-2 rounded-lg border-1 font-family-sans font-bold  border-red-300 '>{error}</motion.p>}

            <motion.form 
                onSubmit={handleSubmit}
                className='flex flex-col items-center justify-center gap-y-1'
            >
                <Input id="username" label='User Name :' type='text' value={formData.username} name='username' placeholder='Enter Your Name' onChange={handleChange}/>
                <Input id="email" label="Email :" type='email' value={formData.email} name="email" placeholder="Enter Your Email" onChange={handleChange}/>
                <Input id="phone" label="Phone Number :" type='tel' value={formData.phone} name="phone" placeholder="Enter Your PhoneNumber" onChange={handleChange}/>
                <Input id="password" label="Password :" type='password' value={formData.password} name="password" placeholder="Enter Your Password" onChange={handleChange}/>

                 <Button variant='primary' size='md' isLoading={false} children="Sign Up" />
                <motion.div
                    className='text-center bg-white font-family-sans font-normal rounded-lg w-[194px]'
                >
                    <p>Login with google</p>
                </motion.div>
            </motion.form>
           

            
            <motion.div
                className='flex justify-center font-family-sans font-medium text-sm mb-12 mt-8'
            >
                <p>Already have account ?{" "}
                    <Link
                        to="/login"
                        className='underline underline-offset-2 hover:text-blue-600'
                    >
                        Login
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
}

export default SignUpForm;
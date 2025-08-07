import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../../ui/Input';
import Button from '../../ui/Button';
import googleIcon from '../../assets/icons8-google-36.png';

interface FormData {
    username: string;
    email: string;
    phone: number | string;
    password: string;
    userRole: string;
}

// Client-side password strength check (same rules as backend)
const isStrongPassword = (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongPasswordRegex.test(password);
};

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phone: '',
        password: '',
        userRole: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate fields
        const { username, email, phone, password, userRole } = formData;

        if (!username || !email || !phone || !password || !userRole) {
            toast.error('All fields are required');
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Registration failed');
                return;
            }

            toast.success('User Registration Successful');
            navigate('/login');
        } catch {
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <motion.div className='opacity-100 bg-bg_secondary shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl px-12 max-w-[432px]'>
            <h1 className='font-bold font-family-sans text-center py-6 text-base mt-4'>Sign UP</h1>

            <motion.form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-y-1'>
                <Input
                    id='username'
                    label='User Name :'
                    type='text'
                    value={formData.username}
                    name='username'
                    placeholder='Enter Your Name'
                    onChange={handleChange}
                />
                <Input
                    id='email'
                    label='Email :'
                    type='email'
                    value={formData.email}
                    name='email'
                    placeholder='Enter Your Email'
                    onChange={handleChange}
                />
                <Input
                    id='phone'
                    label='Phone Number :'
                    type='tel'
                    value={formData.phone}
                    name='phone'
                    placeholder='Enter Your PhoneNumber'
                    onChange={handleChange}
                />
                <Input
                    id='password'
                    label='Password :'
                    type='password'
                    value={formData.password}
                    name='password'
                    placeholder='Enter Your Password'
                    onChange={handleChange}
                />
                <motion.div className='mb-4 flex flex-col'>
                    <label htmlFor='userRole' className='relative font-semibold text-sm text-text_color_secondary left-1.5 bottom-0.3'>
                        User Role :
                    </label>
                    <select
                        name='userRole'
                        id='userRole'
                        className='w-[316px] h-[45px] border-0 border-gray-300 bg-white rounded-[13px] px-6 py-3 font-family-sans shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] text-sm font-medium'
                        value={formData.userRole}
                        onChange={handleChange}
                    >
                        <option value=''>Select a role</option>
                        <option value='Job Seeker'>Job Seeker</option>
                        <option value='Employer'>Employer</option>
                        <option value='Admin'>Admin</option>
                    </select>
                </motion.div>

                <Button variant='primary' size='md' isLoading={false}>
                    Sign Up
                </Button>

                <motion.div className='text-center bg-white font-family-sans font-normal rounded-lg w-[194px] mt-3'>
                    <p className='flex items-center gap-2'>
                        <img src={googleIcon} alt='googleIcon' />
                        Login with google
                    </p>
                </motion.div>
            </motion.form>

            <motion.div className='flex justify-center font-family-sans font-medium text-sm mb-12 mt-8'>
                <p>
                    Already have an account?{' '}
                    <Link to='/login' className='underline underline-offset-2 hover:text-blue-600'>
                        Login
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default SignUpForm;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import googleIcon from '../../assets/icons8-google-36.png';

interface FormData {
    username: string;
    email: string;
    phone: number | string; // Changed to allow string for empty initial value
    password: string;
    userRole: string;
}

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phone: '', // Changed initial value to empty string
        password: '',
        userRole: '', // Initial state for userRole - important for select
    });
    const [error, setError] = useState<string>('');

    // Update handleChange to also accept ChangeEvent for HTMLSelectElement
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation for userRole
        if (!formData.userRole) {
            setError('Please select a user role.');
            return;
        }

        try {
            const result: any = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!result.ok) {
                const err = await result.json();
                throw new Error(err.message || 'Registration Failed');
            }
            const message = await result.json();
            alert(`${message}`);
            navigate('/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <motion.div className='opacity-100 bg-bg_secondary shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl px-12 max-w-[432px]'>
            <h1 className='font-bold font-family-sans text-center py-6 text-base mt-4'>Sign UP</h1>
            {error && (
                <motion.p
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className='text-center text-red-700 mb-2 p-2 rounded-lg border-1 font-family-sans font-bold  border-red-300 '
                >
                    {error}
                </motion.p>
            )}

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
                        value={formData.userRole} // Bind the select's value to the state
                        onChange={handleChange}    // Handle changes using the same handler
                    >
                        <option value=''>Select a role</option> {/* Added a default/placeholder option */}
                        <option value='Job Seeker'>Job Seeker</option>
                        <option value='Employer'>Employer</option>
                        <option value='Admin'>Admin</option>
                    </select>
                </motion.div>

                <Button variant='primary' size='md' isLoading={false} children='Sign Up' />
                <motion.div className='text-center bg-white font-family-sans font-normal rounded-lg w-[194px]'>
                    <p className='flex items-center gap-2'>
                        <img src={googleIcon} alt='googleIcon' />
                        Login with google
                    </p>
                </motion.div>
            </motion.form>

            <motion.div className='flex justify-center font-family-sans font-medium text-sm mb-12 mt-8'>
                <p>
                    Already have account ?{' '}
                    <Link to='/login' className='underline underline-offset-2 hover:text-blue-600'>
                        Login
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default SignUpForm;

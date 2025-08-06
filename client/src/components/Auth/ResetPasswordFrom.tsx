import Input from '../../ui/Input';
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../hooks/resetPassword';

interface ChildProps {
    email: string;
    onSuccess: () => void,
}
interface FormDTO {
    password: string;
    confirmPassword: string;
}
const ResetPasswordFrom = ({email, onSuccess}: ChildProps) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const [formData, setFormData] = useState<FormDTO>({
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        if(formData.password != formData.confirmPassword){
            setError('Password do not match');
            return;
        }
        try {
            const response = await fetch('/api/reset-password', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password: formData.password, email: email}),
            })
            if(response.ok){
                alert('Password Reset Success');
                onSuccess();
            }
            else{
                alert('Error');
            }
        }
        catch ( err: any ) {
            setError(err);
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    return (
        <>
            <h1 className="font-bold font-family-sans text-center py-6 text-base">Reset Password</h1>

            {error && (
            <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-center text-red-700 mb-2 p-2 rounded-lg border-1 font-family-sans font-bold border-red-300"
            >
                {error}
            </motion.p>
            )}
            <motion.form 
                onSubmit={handleSubmit}
                className='flex flex-col items-center justify-center gap-y-1'
            >
                    <>
                        <Input id="password" name="password" type="password" placeholder="Enter New Password" value={formData.password} label="Password :" onChange={handleChange}/>
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} label="Confirm Password :" onChange={handleChange}/>
                        <Button type="submit" children="Reset Password"/>
                    </>
            </motion.form>

        </>
    )
}

export default ResetPasswordFrom
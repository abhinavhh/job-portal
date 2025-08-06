import { motion } from "framer-motion";
import React, { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ResetPasswordFrom from "./ResetPasswordFrom";

const ForgetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [resetPassword, setResetPassword] = useState<boolean>(false);
    const [verify, toggleVerify ] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>('');

    const handleEmailSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch('/api/forget-password', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({email}),
            });
            const data = await response.json();
            if(response.ok){
                alert('Otp Send');
                toggleVerify(true);
            }
            else{
                setError(data.error);
            }
        }
        catch (err: any) {
            console.log(err);
        }
    }

    const handleOtpSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/verify-otp',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({otp, email})
            });
            const data = await response.json();
            if(response.ok) {
                alert('OTP verification successfull');
                toggleVerify(false);
                setResetPassword(true);
            }
            else{
                alert('Verification Failed');
                setError(data.error);
            }
        }
        catch ( err: any) {
            setError(err);
        }
    }
    return(
        <>
            {resetPassword? (
                <ResetPasswordFrom  email={email}/>
            ):
            (
                <>
                    <h1 className='font-bold font-family-sans text-center py-6 text-base'>Forget Password</h1>
                    {error && <motion.p 
                        initial={{y:-20}}
                        animate={{y:0}}
                        className='text-center text-red-700 mb-2 p-2 rounded-lg border-1 font-family-sans font-bold  border-red-300 '>{error}
                    </motion.p>}

                    {verify? (
                        <motion.form 
                            onSubmit={handleOtpSubmit}
                            className='flex flex-col items-center justify-center gap-y-1'
                        >
                                <>
                                    <Input id="otp" name="otp" type="text" placeholder="Enter The OTP" value={otp} label="OTP :" onChange={(e) => setOtp(e.target.value)}/>
                                    <Button type="submit" children="Verify OTP"/>
                                </>
                        </motion.form>
                        
                    ): (
                        <motion.form 
                            onSubmit={handleEmailSubmit}
                            className='flex flex-col items-center justify-center gap-y-1'
                        >
                                <>
                                    <Input id="email" name="email" type="email" placeholder="Enter Your Email" value={email} label="Email :" onChange={(e) => setEmail(e.target.value)}/>
                                    <Button type="submit" children="Generate OTP"/>
                                </>
                        </motion.form>
                    )}       
                </>
            )} 
        </>
    )
}
export default ForgetPasswordForm;
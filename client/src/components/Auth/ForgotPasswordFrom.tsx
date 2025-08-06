import { motion } from "framer-motion";
import React, { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ResetPasswordFrom from "./ResetPasswordFrom";

const ForgetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [resetPassword, setResetPassword] = useState<boolean>(false);

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch('/api/forget-password', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(email),
            });
            const data = await response.json();
            if(response.ok){
                setResetPassword(true);
            }
            else{
                setError(data.error);
            }
        }
        catch (err: any) {
            console.log(err);
        }
    }

    return(
        <>
            {resetPassword? (
                <ResetPasswordFrom />
            ):
            (
                <>
                    <h1 className='font-bold font-family-sans text-center py-6 text-base'>Forget Password</h1>
                    {error && <motion.p 
                        initial={{y:-20}}
                        animate={{y:0}}
                        className='text-center text-red-700 mb-2 p-2 rounded-lg border-1 font-family-sans font-bold  border-red-300 '>{error}
                    </motion.p>}  
                    <motion.form 
                        onSubmit={handleSubmit}
                        className='flex flex-col items-center justify-center gap-y-1'
                    >
                        <Input id="email" name="email" type="email" placeholder="Enter Your Email" value={email} label="Email :" onChange={(e) => setEmail(e.target.value)}/>
                        <Button type="submit" children="Get OTP"/>
                    </motion.form>
                </>
            )}
            
        </>
    )
}
export default ForgetPasswordForm;
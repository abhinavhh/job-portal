import Input from '../../ui/Input';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Button from '../../ui/Button';
import { toast } from 'react-toastify';

interface ChildProps {
  email: string;
  onSuccess: () => void;
}
interface FormDTO {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = ({ email, onSuccess }: ChildProps) => {
  const [formData, setFormData] = useState<FormDTO>({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: formData.password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Password reset successfully');
        onSuccess();
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 className="font-bold font-family-sans text-center py-6 text-base">Reset Password</h1>

      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-y-1"
      >
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter New Password"
          value={formData.password}
          label="Password :"
          onChange={handleChange}
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          label="Confirm Password :"
          onChange={handleChange}
        />
        <Button type="submit" children="Reset Password" />
      </motion.form>
    </>
  );
};

export default ResetPasswordForm;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import googleIcon from '../../assets/icons8-google-36.png';
import ForgetPasswordForm from './ForgotPasswordFrom';
import { Bounce, Slide, toast } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [toggleForget, setToggleForget] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/profile');
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Both email and password are required.', {
        position: 'top-center',
        autoClose: 3000,
        transition: Slide,
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.', {
        position: 'top-center',
        autoClose: 3000,
        transition: Slide,
      });
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || 'Login failed. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          transition: Slide,
        });
        return;
      }

      toast.success(data?.message || 'Login Successful', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'light',
        transition: Bounce,
      });

      localStorage.setItem('userId', data.id);
      localStorage.setItem('token', data.token);

      navigate('/profile');
    } catch (err) {
      toast.error('Something went wrong. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        transition: Slide,
      });
    }
  };

  return (
    <motion.div className="opacity-100 bg-bg_secondary shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-3xl px-12 py-14">
      {toggleForget ? (
        <ForgetPasswordForm
          onSuccess={() => {
            setToggleForget(false);
            navigate('/login', { replace: true });
          }}
        />
      ) : (
        <>
          <h1 className="font-bold font-family-sans text-center py-6 text-base">Login</h1>

          <motion.form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-y-1">
            <Input
              id="email"
              label="Email :"
              type="email"
              value={formData.email}
              name="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
            />

            <Input
              id="password"
              label="Password :"
              type="password"
              value={formData.password}
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setToggleForget(true)}
              className="relative bottom-4 left-[6.5rem] font-family-sans font-normal text-[12px] underline underline-offset-3 hover:text-blue-600 mb-4"
            >
              Forgot Password?
            </button>

            <Button variant="primary" size="md" isLoading={false}>
              Login
            </Button>

            <motion.div className="text-center bg-white font-family-sans font-normal rounded-lg w-[194px] mt-3">
              <p className="flex items-center gap-2 justify-center py-2">
                <img src={googleIcon} alt="googleIcon" />
                Login with Google
              </p>
            </motion.div>
          </motion.form>

          <motion.div className="flex justify-center font-family-sans font-medium text-sm my-12">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="underline underline-offset-2 hover:text-blue-600">
                Create Account
              </Link>
            </p>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default LoginForm;

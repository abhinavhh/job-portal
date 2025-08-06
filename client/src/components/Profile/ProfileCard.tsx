import { motion } from 'framer-motion';
import profileImage from '../../assets/eb25ecae5527abd630d85ffa7f99f2fdd42589c5.jpg';
import editpenImage from '../../assets/285100becb670a4cbd2e0b54cba28a41e0aab5ff.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  username: string;
  // lastName: string;
  email: string;
  phone: string;
  portfolioLink: string;
  socialLink: string;
}

const ProfileCard = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        alert('You must be logged in to view profile details.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('/api/profile/details',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUser(result.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        alert('Failed to fetch user details. Please login again.');
        localStorage.removeItem('userId');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <motion.div 
      className="shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] w-full max-w-[310px] flex flex-col gap-16 rounded-lg p-4 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        y: -2
      }}
    >
      {/* Profile Info */}
      <motion.div 
        className="flex flex-col items-center gap-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.button 
          className="absolute top-2 right-2"
          whileHover={{ 
            scale: 1.1,
            rotate: 15
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={editpenImage} alt="edit button" width={25} height={23} />
        </motion.button>
        
        <motion.img
          src={profileImage}
          alt="profileImage"
          width={120}
          height={120}
          className="rounded-full"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        />
        
        <motion.div 
          className="text-center font-semibold text-xl flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {user ? `${user.username}` : 'Loading...'}
          </motion.h1>
          <motion.a 
            href={`mailto:${user?.email || ''}`} 
            className="block text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            whileHover={{ 
              color: "#32589E",
              transition: { duration: 0.2 }
            }}
          >
            {user?.email}
          </motion.a>
          <motion.p 
            className="text-sm"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            {user?.phone}
          </motion.p>
          <motion.a 
            href={user?.portfolioLink || '#'} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
            whileHover={{ 
              color: "#32589E",
              transition: { duration: 0.2 }
            }}
          >
            Portfolio
          </motion.a>
          <motion.a 
            href={user?.socialLink || '#'} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            whileHover={{ 
              color: "#32589E",
              transition: { duration: 0.2 }
            }}
          >
            Social
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex flex-col gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.button 
          className="bg-[#32589E52] w-full py-2 font-medium text-[16px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "rgba(50, 88, 158, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          Application Status
        </motion.button>
        
        <motion.button 
          className="bg-[#32589E52] w-full py-2 font-medium text-[16px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "rgba(50, 88, 158, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          Saved Jobs
        </motion.button>
        
        <motion.button 
          className="bg-[#FF0808] rounded-3xl py-2 text-white font-normal text-xs w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "#e60707",
            boxShadow: "0 4px 12px rgba(255, 8, 8, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            alert('Log Out Successfull')
            navigate('/login');
          }}
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;

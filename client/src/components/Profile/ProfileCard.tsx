import { motion } from 'framer-motion';
import profileImage from '../../assets/eb25ecae5527abd630d85ffa7f99f2fdd42589c5.jpg';
import editpenImage from '../../assets/285100becb670a4cbd2e0b54cba28a41e0aab5ff.png';

const ProfileCard = () => {
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
          className="text-center font-semibold text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            John Doe
          </motion.h1>
          <motion.a 
            href="#" 
            className="block text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            whileHover={{ 
              color: "#32589E",
              transition: { duration: 0.2 }
            }}
          >
            johndoe@gmail.com
          </motion.a>
          <motion.p 
            className="text-sm"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            999999999
          </motion.p>
          <motion.a 
            href="#" 
            className="text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
            whileHover={{ 
              color: "#32589E",
              transition: { duration: 0.2 }
            }}
          >
            portfolio link
          </motion.a>
          <motion.a 
            href="#" 
            className="text-sm"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            whileHover={{ 
              color: "#32589E",
              transition: { duration: 0.2 }
            }}
          >
            social link
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
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
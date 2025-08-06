import { motion, type Variants } from "framer-motion";
import editpenImage from '../../assets/285100becb670a4cbd2e0b54cba28a41e0aab5ff.png';

const ProfileDetails = () => {
  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Section animation variants
  const sectionVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Content animation variants
  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-6 w-full px-2 py-6 font-family-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Edit Button */}
      <motion.button 
        className="flex items-center gap-2 self-end pr-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.p 
          className="font-semibold text-xl"
          whileHover={{ color: "#32589E" }}
        >
          Edit Profile Details
        </motion.p>
        <motion.img 
          src={editpenImage} 
          alt="editPenImage" 
          width={25}
          whileHover={{ 
            rotate: 15,
            scale: 1.1
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.button>

      {/* Education Section */}
      <motion.div
        className="bg-[#D9D9D9] w-full p-4 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        variants={sectionVariants}
        whileHover={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          y: -2
        }}
      >
        <motion.h1 
          className="font-semibold text-xl mb-4"
          variants={contentVariants}
        >
          Education
        </motion.h1>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-between font-medium text-xl gap-4 md:mb-4"
          variants={contentVariants}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h2
              whileHover={{ color: "#32589E", x: 5 }}
            >
              College Name
            </motion.h2>
            <motion.div 
              className="pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Subjects
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                Achievements
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div 
            className="text-right md:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Year - Year
          </motion.div>
        </motion.div>
        <motion.div 
          className="flex flex-col md:flex-row justify-between font-medium text-xl gap-4"
          variants={contentVariants}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h2 
              whileHover={{ color: "#32589E", x: 5 }}
            >
              College Name
            </motion.h2>
            <motion.div 
              className="pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Subjects
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                Achievements
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div 
            className="text-right md:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Year - Year
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        className="bg-[#D9D9D9] w-full p-4 text-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        variants={sectionVariants}
        whileHover={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          y: -2
        }}
      >
        <motion.h1 
          className="font-semibold text-xl mb-4"
          variants={contentVariants}
        >
          Experience
        </motion.h1>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-between font-medium gap-4"
          variants={contentVariants}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.h2 
              whileHover={{ color: "#32589E", x: 5 }}
            >
              Company Name
            </motion.h2>
            <motion.div 
              className="pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                Position
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                Achievements
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div 
            className="text-right md:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Year - Year
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="bg-[#D9D9D9] w-full p-4 text-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        variants={sectionVariants}
        whileHover={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          y: -2
        }}
      >
        <motion.h1 
          className="font-semibold text-xl mb-4"
          variants={contentVariants}
        >
          Skills
        </motion.h1>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-between font-medium gap-4"
          variants={contentVariants}
        >
          {/* Left */}
          <motion.div 
            className="flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {["java", ", javascript", ", reactJs"].map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + (index * 0.1), 
                  duration: 0.3 
                }}
                whileHover={{ 
                  color: "#32589E", 
                  scale: 1.05,
                  y: -2
                }}
              >
                {item}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileDetails;
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import editpenImage from '../../assets/285100becb670a4cbd2e0b54cba28a41e0aab5ff.png';

interface Education {
  collegeName: string;
  subjects: string;
  achievements: string;
  fromYear: string;
  toYear: string;
}

interface Experience {
  companyName: string;
  position: string;
  achievements: string;
  fromYear: string;
  toYear: string;
}

interface ProfileData {
  education: Education[];
  experience: Experience[];
  skills: string[];
}

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    education: [],
    experience: [],
    skills: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/update-profile-details')}
      >
        <motion.p className="font-semibold text-xl" whileHover={{ color: "#32589E" }}>
          Edit Profile Details
        </motion.p>
        <motion.img 
          src={editpenImage} 
          alt="editPenImage" 
          width={25}
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.button>

      {/* Education Section */}
      <motion.div
        className="bg-[#D9D9D9] w-full p-4 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        variants={sectionVariants}
        whileHover={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)", y: -2 }}
      >
        <motion.h1 className="font-semibold text-xl mb-4" variants={contentVariants}>
          Education
        </motion.h1>
        {profileData.education.map((edu, i) => (
          <motion.div key={i} className="flex flex-col md:flex-row justify-between font-medium text-xl gap-4 md:mb-4" variants={contentVariants}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}>
              <motion.h2 whileHover={{ color: "#32589E", x: 5 }}>{edu.collegeName}</motion.h2>
              <motion.div className="pl-4">
                <motion.p>{edu.subjects}</motion.p>
                <motion.p>{edu.achievements}</motion.p>
              </motion.div>
            </motion.div>
            <motion.div className="text-right md:text-left" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}>
              {edu.fromYear} - {edu.toYear}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Experience Section */}
      <motion.div
        className="bg-[#D9D9D9] w-full p-4 text-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        variants={sectionVariants}
        whileHover={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)", y: -2 }}
      >
        <motion.h1 className="font-semibold text-xl mb-4" variants={contentVariants}>
          Experience
        </motion.h1>
        {profileData.experience.map((exp, i) => (
          <motion.div key={i} className="flex flex-col md:flex-row justify-between font-medium gap-4" variants={contentVariants}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}>
              <motion.h2 whileHover={{ color: "#32589E", x: 5 }}>{exp.companyName}</motion.h2>
              <motion.div className="pl-4">
                <motion.p>{exp.position}</motion.p>
                <motion.p>{exp.achievements}</motion.p>
              </motion.div>
            </motion.div>
            <motion.div className="text-right md:text-left" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}>
              {exp.fromYear} - {exp.toYear}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="bg-[#D9D9D9] w-full p-4 text-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
        variants={sectionVariants}
        whileHover={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)", y: -2 }}
      >
        <motion.h1 className="font-semibold text-xl mb-4" variants={contentVariants}>
          Skills
        </motion.h1>
        <motion.div className="flex flex-col md:flex-row justify-between font-medium gap-4" variants={contentVariants}>
          <motion.div className="flex flex-wrap gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
            {profileData.skills.map((skill, i) => (
              <motion.p key={i} whileHover={{ color: "#32589E", scale: 1.05, y: -2 }}>
                {skill}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileDetails;

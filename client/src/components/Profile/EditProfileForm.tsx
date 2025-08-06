import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import addImg from '../../assets/024ccbf4e92ce6e3ac48c4faec7c028e0f3d2677.png'
type Education = {
  college: string;
  from: number;
  to: number;
  achievements: string;
  subjects: string;
};

type Experience = {
  company: string;
  from: number;
  to: number;
  achievements: string;
  position: string;
};

const ProfileUpdateForm: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([
    { college: '', from: 0, to: 0, achievements: '', subjects: '' },
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    { company: '', from: 0, to: 0, achievements: '', position: '' },
  ]);

  const [skills, setSkills] = useState<string[]>(['']);

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string | number
  ) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string | number
  ) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addEducation = () => {
    setEducation([...education, { college: '', from: 0, to: 0, achievements: '', subjects: '' }]);
  };

  const addExperience = () => {
    setExperience([...experience, { company: '', from: 0, to: 0, achievements: '', position: '' }]);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No token found, please log in.');
      return;
    }

    try {
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          education,
          experience,
          skills: skills.filter(skill => skill.trim() !== ''),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6 font-family-sans font-normal text-2xl">
      {/* Education Section */}
      <div className="bg-[#D9D9D9] rounded-lg p-6">
        <h2>
          Education
        </h2>
        
        {education.map((edu, index) => (
          <div key={index} className="mb-6 text-[16px] font-medium ">
            {/* Name and Year - Flex Row */}
            <div className="flex gap-4 mb-4">
              {/* Left side - College Name */}
              <div className="flex-1">
                <label className="block mb-2">College Name</label>
                <input
                  type="text"
                  placeholder="College Name"
                  value={edu.college}
                  onChange={(e) => handleEducationChange(index, 'college', e.target.value)}
                  className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Right side - Years */}
              <div className="flex gap-2">
                <div>
                  <label className="block mb-2">From</label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    value={edu.from}
                    onChange={(e) => handleEducationChange(index, 'from', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2">To</label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    value={edu.to}
                    onChange={(e) => handleEducationChange(index, 'to', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Remaining fields below */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">Subjects</label>
                <input
                  type="text"
                  placeholder="Comma separated subjects"
                  value={edu.subjects}
                  onChange={(e) => handleEducationChange(index, 'subjects', e.target.value)}
                  className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Achievements</label>
                <input
                  type="text"
                  placeholder="Achievements"
                  value={edu.achievements}
                  onChange={(e) => handleEducationChange(index, 'achievements', e.target.value)}
                  className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-center font-medium text-[16px]">
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-white hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <img src={addImg} alt="addImg" width={25}/>
            Add Education
          </button>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-[#D9D9D9] rounded-lg p-6 font-normal text-2xl">
        <h2>
          Experience
        </h2>
        
        {experience.map((exp, index) => (
          <div key={index} className="mb-6 text-[16px] font-medium">
            {/* Company and Year - Flex Row */}
            <div className="flex gap-4 mb-4">
              {/* Left side - Company Name */}
              <div className="flex-1">
                <label className="block mb-2">Company Name</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Right side - Years */}
              <div className="flex gap-2">
                <div>
                  <label className="block mb-2">From</label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    value={exp.from}
                    onChange={(e) => handleExperienceChange(index, 'from', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2">To</label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    value={exp.to}
                    onChange={(e) => handleExperienceChange(index, 'to', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Remaining fields below */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">Position</label>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Achievements</label>
                <input
                  type="text"
                  placeholder="Achievements"
                  value={exp.achievements}
                  onChange={(e) => handleExperienceChange(index, 'achievements', e.target.value)}
                  className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-center font-medium text-[16px]">
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-white hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <img src={addImg} alt="addImg" width={25}/>
            Add Experience
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-[#D9D9D9] rounded-lg p-6">
        <h2>
          Skills
        </h2>
        
        {skills.map((skill, index) => (
          <div key={index} className="mb-4 text-[16px] font-medium">
            <div className="flex-1 max-w-md">
              <label className="block mb-2">Skill {index + 1}</label>
              <input
                type="text"
                placeholder="Enter skill"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-center font-medium text-[16px]">
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-white hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <img src={addImg} alt="addImg" width={25}/>
            Add Skill
          </button>
        </div>
      </div>

      {/* Update Profile Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="hover:opacity-90 transition-opacity bg-[#32589E] p-2 md:p-4 rounded-xl font-bold md:text-xl text-text_color_primary"
        >
          Update Profile Details
        </button>
      </div>
    </div></>
  );
};

export default ProfileUpdateForm;
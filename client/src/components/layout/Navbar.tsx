import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import logoImage from '../../assets/9756455b49a2c1e44c02cff2091cb354bb3936be.png';
import searchImg from '../../assets/a05bd508d6985084c6282bc5096b45f2cf361948.png';
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section id="navbar" className="w-full">
      <nav className="bg-bg_color w-full flex justify-between items-center px-6 h-[130px] font-family-sans relative">
        
        {/* Left Placeholder Icon */}
        <motion.div>
          <img src="" alt="icon" />
        </motion.div>

        {/* Desktop Nav Links + Search */}
        <motion.div className="flex items-center space-x-10 lg:space-x-50">
          <motion.div className="hidden md:flex items-center gap-10 lg:gap-36">
            {/* Nav Links */}
            <div className="flex items-center space-x-10">
              {["Home", "Jobs"].map((item) => (
                <motion.button
                  key={item}
                  className="text-center font-semibold text-2xl text-text_color_primary"
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <img
                src={searchImg}
                alt="search"
                width={20}
                height={20}
                className="absolute top-1/2 left-2 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-2 text-sm text-gray-700 bg-[#D9D9D9] rounded-[7px] w-[192px] h-[35px] outline-none"
              />
            </div>
          </motion.div>

          {/* Right Logo */}
          <motion.div>
            <img
              src={logoImage}
              alt="logo"
              width={45}
              height={37}
            />
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(prev => !prev)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-bg_color px-6 py-4 flex flex-col gap-4 md:hidden z-40"
            >
              {["Home", "Jobs"].map((item) => (
                <button
                  key={item}
                  className="text-left text-xl font-medium text-text_color_primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </button>
              ))}

              {/* Search bar in mobile */}
              <div className="relative mt-2">
                <img
                  src={searchImg}
                  alt="search"
                  width={20}
                  height={20}
                  className="absolute top-1/2 left-2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-8 pr-2 text-sm text-gray-700 bg-[#D9D9D9] rounded-[7px] w-full h-[35px] outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </section>
  );
};

export default Navbar;

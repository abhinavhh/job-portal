import { motion } from "framer-motion"
import logoImage from '../../assets/9756455b49a2c1e44c02cff2091cb354bb3936be.png'
const Navbar = () => {
  return (
    <section id="navbar">
        <nav
            className='bg-bg_color w-full flex justify-between items-center p-4 h-[130px] font-family-sans'
        >
          <motion.div
            className=""
          >
            <img src="" alt="icon" />
            
          </motion.div>

        
          <motion.div
            className="flex justify-between items-center gap-6"
          >

            {/* nav link items */}
            <motion.div
              className="flex items-center space-x-6"
            >
              {["Home", "Jobs"].map((item) => (
                <motion.button
                  key={item}
                  className="text-center font-semibold text-2xl text-text_color_primary"
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>

            {/* search field */}
            <motion.div>
              sdfsdfd
            </motion.div>

          </motion.div>

          {/* logo field */}
            <motion.div>
              <img 
                src={logoImage} 
                alt="logo"
                width={45}
                height={37}
              />
            </motion.div>
        </nav>

    </section>
  )
}

export default Navbar
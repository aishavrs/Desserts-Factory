import {React, useState, useContext} from 'react'
import {Link} from "react-router"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import {motion, AnimatePresence} from "framer-motion"
import { AuthContext } from '../Context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] =useState(false)
  const {user, logout} = useContext(AuthContext)
  const toggleMenu =()=>{
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <header className="bg-rose-100 py-5 w-full">
        <nav className="container mx-auto flex justify-between items-center px-9">
            <Link to="/">
            <span className="font-bold text-3xl hover:text-red-900">Desserts</span>
            </Link>

             <div className="md:hidden">
              {user? (<div className='flex gap-1'>
                <img className='w-10 h-10 rounded-full' src={user?.image || "https://img.freepik.com/premium-vector/simple-profile-icon-user-silhouette_1199645-37523.jpg?semt=ais_incoming&w=740&q=80"} alt="" />
                <button onClick={logout} className='font-medium bg-red-900 text-white px-3 py-2 rounded-sm'>
                  Logout
                </button>
              </div>) : (
                <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <IoCloseSharp size={30} /> : <GiHamburgerMenu size={30} /> }
             </button>
              )}
             </div>

{/* for large screen */}
        <div className='hidden md:flex'>
              {user? (<div className='flex gap-1'>
                <img className='w-10 h-10 rounded-full' src={user?.image || "https://img.freepik.com/premium-vector/simple-profile-icon-user-silhouette_1199645-37523.jpg?semt=ais_incoming&w=740&q=80"} alt="" />
                <button onClick={logout} className='font-medium bg-red-900 text-white px-3 py-2 rounded-sm'>
                  Logout
                </button>
              </div>) :<div className="flex gap-5">
              {
              [{
                content:"Sign In",
                path: "/sign-in"
              },
              {
                content:"Sign Up",
                path: "/sign-up"
              }].map((link, index)=>{
                return <motion.div key={link.content}
                initial={{opacity: 0,y:-10}}
                animate={{opacity:1, y:0}}
                transition={{delay: index * 0.1}}
                whileHover={{scale: 1.1}}>
                  <Link className="bg-red-500 py-2 px-3 rounded-md text-white hover:bg-red-900" to={link.path}>
                  {link.content}
                  </Link>
                </motion.div>
              })
              }
            </div>
}
        </div>
{/* mobile menu tab */}
           <AnimatePresence>
  {isMenuOpen && (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full max-h-[70vh] bg-rose-600 py-6 px-6 bg-opacity-95 md:hidden z-50"
    >
      <div className="flex justify-end mb-4">
        <button onClick={toggleMenu} className="text-white">
          <IoCloseSharp size={30} />
        </button>
      </div>
      <nav className="flex flex-col gap-4">
        {[
          { content: "Sign In", path: "/sign-in" },
          { content: "Sign Up", path: "/sign-up" }
        ].map((link, index) => (
          <motion.div
            key={link.content}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to={link.path}
              onClick={toggleMenu}
              className="block bg-red-500 py-3 px-4 rounded-md text-white text-center hover:bg-red-900"
            >
              {link.content}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  )}
</AnimatePresence>

        </nav>
    </header>
  )
}
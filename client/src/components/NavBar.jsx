import { useState } from 'react'
import logo from './../assets/blogoo.png'
import RightArrow from './../assets/icons/rightArrow.svg'
import { LayoutDashboard, BarChart2, Map } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const navLinks = [
    {
        name: 'Dashboard',
        icons: LayoutDashboard,
        link: '/'
    },
    {
        name: 'Geographical Heat Map',
        icons: Map,
        link: '/geoHeatMap'
    },
    {
        name: 'Bar charts',
        icons: BarChart2,
        link: '/barchart'
    }
]
const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "5%" }
}
const NavBar = () => {
    const [activeNav, setActiveNav] = useState(0)
    const [isExpanded, setIsExpanded] = useState(true)
    return (

        <motion.div
            animate={
                isExpanded ? 'expanded' : 'nonExpanded'
            }
            variants={variants}
            className={` ${isExpanded ? 'px-10' : 'px-4'} h-screen relative bg-[#223E9C] text-white `}

        >

            <div className="logo-div flex flex-col space-x-1 items-center  pt-12">
                <img src={logo} alt="logo" />
                <br />
                <span className={`${isExpanded ? 'block' : 'hidden'} text-xl font-bold relative top-[-45px] `}>BlackCoffer</span>
            </div>
            <hr />

            <div onClick={() => setIsExpanded(!isExpanded)} className="w-7 h-7 bg-[#0f162e] rounded-full absolute -right-[10.5px] top-20 flex items-center justify-center">
                <img src={RightArrow} alt="icon" className='w-[5px]' />
            </div>

            <div className="mt-10 flex flex-col space-y-8 cursor-pointer">
                {navLinks.map((link, index) => (

                    <Link to={link.link} key={index} className={`flex space-x-3 p-2 rounded ${activeNav === index ? "bg-[#183188] text-white  font-semibold " : ""} hover:bg-[#183188]`} onClick={() => setActiveNav(index)}>
                        <link.icons />
                        <span className={`${isExpanded ? 'block' : 'hidden'}`} >{link.name}</span>
                    </Link>
                ))}
            </div>
        </motion.div >

    )
}

export default NavBar
import { navLists } from "../constants"
import { appleImg, bagImg, searchImg } from "../utils/index.js"
{ }
const NavBar = () => {
    return (
        <header className="w-full py-10 sm:px-10 px-5 flex justify-between items-center">
            <nav className="flex  w-full  screen-max-width">
                <img src={appleImg} alt="Apple" width={14} height={18} />
                <div className="flex flex-1 justify-center  max-sm:hidden "  >
                    {navLists.map(nav => (
                        <div className="px-5 text-sm text-gray-500 hover:text-white cursor-pointer transition-all" key={nav}>
                            {nav}
                        </div>
                    ))}
                </div>
                <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
                    <img src={searchImg} alt="Search" width={18} height={18} />
                    <img src={bagImg} alt="Bag" width={18} height={18} />
                </div>
            </nav>
        </header>
    )
}

export default NavBar
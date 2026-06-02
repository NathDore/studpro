import { NavLink } from 'react-router-dom';
import { CalendarIcon } from '../icons/CalendarIcon';
import { CheckIcon } from '../icons/CheckIcon';

export const NavBar = () => {
    return (
        <div className="flex flex-row items-center justify-between w-full px-8 py-2 border-b border-gray-300">
            <p className="font-bold text-[15px] text-[#2C2C2A] select-none cursor-default">
                StudPro
            </p>
            <div className="flex flex-row gap-4">
                <NavLink
                    className={({ isActive }) =>
                        `flex flex-row items-center justify-center gap-1 px-[15px] pt-[2px] cursor-pointer text-[#2C2C2A] select-none
                        ${isActive ? 'bg-[#2C2C2A] text-white rounded-[10px]' : ''}`
                    }
                    to="/"
                >
                    <CalendarIcon className="relative top-[-0.3px] w-5 h-5 stroke-2" />
                    <p className="text-[15px] font-medium cursor-pointer hidden sm:block">Calendar</p>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `flex flex-row items-center justify-center gap-1 px-[15px] pt-[2px] cursor-pointer text-[#2C2C2A] select-none
                        ${isActive ? 'bg-[#2C2C2A] text-white rounded-[10px]' : ''}`
                    }
                    to="/todo"
                >
                    <CheckIcon className="relative top-[-0.3px] w-5 h-5 stroke-2" />
                    <div className="text-[15px] font-medium cursor-pointer hidden sm:block">Todo</div>
                </NavLink>
            </div>
        </div>
    );
};
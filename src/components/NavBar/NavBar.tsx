import { NavLink } from 'react-router-dom';
import { CalendarIcon } from '../icons/CalendarIcon';
import { CheckIcon } from '../icons/CheckIcon';
import './NavBar.css';

interface NavBarProps { }

export const NavBar = ({ }: NavBarProps) => {

    return (
        <div className='container navbar'>
            <p className='text app-title user-select-none'>
                StudPro
            </p>
            <div className='container nav-link-container'>
                <NavLink className={({ isActive }) => isActive ? 'container nav-link nav-link--active' : 'container nav-link'} to='/'>

                    <CalendarIcon className='icon' />
                    <p className='text nav-link-text user-select-none'>Calendar</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? 'container nav-link nav-link--active' : 'container nav-link'} to='/todo'>
                    <CheckIcon className='icon' />
                    <div className='text nav-link-text user-select-none'>Todo</div>
                </NavLink>
            </div>
        </div >
    )
}

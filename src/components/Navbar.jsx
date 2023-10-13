import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import '../../src/styles.css'
import { userContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(userContext)

    return (
        <nav>
            <div className='logo'>

            </div>
            <ul>
                <li className="">
                    <NavLink className="Link" to='/home'>Home</NavLink>
                </li>
                <li className="">
                    <NavLink className="Link" to='/about'>About</NavLink>
                </li>
                <li className="">
                    <NavLink className="Link" to='/contact'>Contact</NavLink>
                </li>
            </ul>
            <div className="nav-btn">
                {state ? <NavLink className="Link" to="/logout">
                    <button className="button-31 bg-logout" >Logout</button>
                </NavLink> : <>
                    <NavLink className="Link" to="/register">
                        <button className="button-31 bg-register" >Register</button>
                    </NavLink>
                    <NavLink className="Link" to="/login">
                        <button className="button-31 bg-login" >Login</button>
                    </NavLink> </>
                }
                {console.log(state)}



            </div>


        </nav>
    );
};

export default Navbar;
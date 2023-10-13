import React, { useContext, useEffect, useState } from 'react';
import '../../src/styles.css'
import { useNavigate, NavLink } from 'react-router-dom';
import { userContext } from '../App';

const Register = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        cpassword: ''
    })
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
        console.log(user)
    }
    const postData = async (e) => {
        e.preventDefault();
        if (!user.name || !user.email || !user.phone || !user.password || !user.cpassword) {
            window.alert("Please fill all the fields.");
            return; // Stop further execution if fields are empty
        }
        const { name, email, phone, password, cpassword } = user;
        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, password, cpassword
            })

        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            setErrorMessage("Invalid Registration");
            console.log("invalid registration")

        } else {
            window.alert("Successful registration");
            console.log("Successful registration")
            navigate("/login");

        }

    }
    return (
        <form className="form-container" type="POST">
            <h2>Register</h2>

            <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" name="name" required
                    value={user.name}
                    onChange={handleInputs}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required
                    value={user.email}
                    onChange={handleInputs}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required
                    value={user.phone}
                    onChange={handleInputs}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required
                    value={user.password}
                    onChange={handleInputs}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cpassword">Confirm Password:</label>
                <input type="password" id="cpassword" name="cpassword" required
                    value={user.cpassword}
                    onChange={handleInputs}
                />
            </div>
            <button className="form-btn" id="submitBtn" onClick={postData}>Register</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="form-switch-btn">
                <p>Already have an account? <NavLink to='/login'>Login</NavLink></p>
            </div>
        </form>
    );
};



const Login = () => {
    const { state, dispatch } = useContext(userContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            window.alert("Please fill all the fields.");
            return; // Stop further execution if fields are empty
        }
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })

        });
        const data = await res.json();
        console.log(data); // Log the response data
        console.log(res.status); // Log the status code


        if (res.status === 400 || !data) {
            setErrorMessage("Invalid Login");
        } else {
            dispatch({ type: 'USER', payload: true })
            setErrorMessage(""); // Clear the error message if there was any previous error
            navigate("/home");
        }

    }
    return (
        <form className="form-container" type="POST">
            <h2>Login</h2>


            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="form-btn" id="submitBtn" onClick={loginUser}>Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="form-switch-btn">
                <p>Don't have an account? <NavLink to='/register'>Register</NavLink></p>
            </div>

        </form>
    );
};


const Logout = () => {
    const { state, dispatch } = useContext(userContext)

    const navigate = useNavigate()
    useEffect(() => {
        fetch('/logout', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => {
            dispatch({ type: 'USER', payload: false })
            navigate('/login', { replace: true })
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    return (
        <></>
    )
}

export { Register, Login, Logout };
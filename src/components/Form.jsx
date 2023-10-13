// import React, { useState } from 'react';
// import '../../src/styles.css'
// import { useNavigate } from 'react-router-dom';
// const Form = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         cpassword: ''
//     })
//     let name, value;
//     const handleInputs = (e) => {
//         name = e.target.name;
//         value = e.target.value;
//         setUser({ ...user, [name]: value })
//         console.log(user)
//     }
//     const postData = async (e) => {
//         e.preventDefault();
//         const { name, email, phone, password, cpassword } = user;
//         const res = await fetch('/register', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 name, email, phone, password, cpassword
//             })

//         })
//         const data = await res.json();
//         if (data.status === 422 || !data) {
//             window.alert("invalid registration");
//             console.log("invalid registration")

//         } else {
//             window.alert("Successful registration");
//             console.log("Successful registration")
//             navigate("/about");

//         }

//     }
//     return (
//         <form className="form-container" type="POST">
//             <h2>Register / Login</h2>
//             <div className="form-group">
//                 <label htmlFor="name">Full Name:</label>
//                 <input type="text" id="name" name="name" required
//                     value={user.name}
//                     onChange={handleInputs}
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="email">Email:</label>
//                 <input type="email" id="email" name="email" required
//                     value={user.email}
//                     onChange={handleInputs}
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="phone">Phone:</label>
//                 <input type="tel" id="phone" name="phone" required
//                     value={user.phone}
//                     onChange={handleInputs}
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <input type="password" id="password" name="password" required
//                     value={user.password}
//                     onChange={handleInputs}
//                 />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="cpassword">Confirm Password:</label>
//                 <input type="password" id="cpassword" name="cpassword" required
//                     value={user.cpassword}
//                     onChange={handleInputs}
//                 />
//             </div>
//             <button className="form-btn" id="submitBtn" onClick={postData}>Register</button>
//             <div className="form-switch-btn">
//                 <p>Already have an account? <a href="/" id="loginLink">Login</a></p>
//             </div>
//         </form>
//     );
// };

// export default Form;

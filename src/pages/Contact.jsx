import React, { useEffect, useState } from 'react';
import '../../src/styles.css';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" })
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message
    const [count, setCount] = useState(0)

    const callContactPage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone })

            if (!res.status === 200) {
                const error = new Error(data.error || "Server Error");
                throw error;
            }

        } catch (err) {
            console.log(err);
            navigate("/login");

        }
    }

    useEffect(() => {
        callContactPage()

    }, [])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }
    console.log(userData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;
        if (!name.trim() || !email.trim() || !phone || !message.trim()) {

            setErrorMessage("All fields are required");
            setCount(count + 1)
            return;
        }

        // Clear error message if there was a previous error
        setErrorMessage("");
        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, message })
        });
        const data = await res.json();
        if (!data) {
            console.log("message not sent")
        } else {
            alert("message sent");
            setUserData({ ...userData, message: '' })
        }


    }

    return (
        <form className="contact-container" method='POST'>
            <h2>Get in Touch</h2>
            <div className="card-box">
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="message-group">
                <label>Message</label>
                <textarea
                    name="message"
                    value={userData.message}
                    onChange={handleChange}
                    rows="8"
                    required
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage} {count}</p>}

            <button
                onClick={handleSubmit}
            >Send Message</button>
        </form>
    );
}

export default Contact;

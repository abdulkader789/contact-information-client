import React, { useEffect, useState } from 'react';
import '../../src/styles.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUser(data)

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
        callAboutPage()

    }, [])

    return (
        <form className="about-card" method='GET'>
            <h2>Welcome {user.name}</h2>
            <div className="card">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
            </div>
        </form>
    );
};

export default About;

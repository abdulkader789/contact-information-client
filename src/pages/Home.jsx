import React, { useEffect, useState } from 'react';
import '../../src/styles.css';

const Home = () => {
    const [username, setUsername] = useState('')
    const [show, setShow] = useState(false)
    const callHomePage = async () => {
        try {
            const res = await fetch('/getData', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            setUsername(data.name)
            setShow(!show)

            if (!res.status === 200) {
                const error = new Error(data.error || "Server Error");
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callHomePage()

    }, [])


    return (
        <div className="home-container">
            <div className='description-section'>
                <h1> {show ? <span>Hello, {username}<br /></span> : ''}
                    Welcome to Our Secure Platform!</h1>
                <p className="home-description">
                    Explore a secure and user-friendly space where you can and connect with a diverse community of individuals. Access public profiles, delve into
                    insightful blog posts, manage your contacts, and update essential information such as your blood
                    group. Stay connected with your peers, stay informed through our informative blog posts, and
                    make meaningful connections that can inspire and empower you.
                </p>
            </div>
            <div className="home-sections">
                <div className="section">
                    <h2>Discover</h2>
                    <p>Explore a vast array of public profiles and connect with people who share your interests.</p>
                    <button className="btn-primary">Explore Now</button>
                </div>
                <div className="section">
                    <h2>Learn from Blogs</h2>
                    <p>Dive into our rich collection of blog posts covering various topics and gain valuable insights.</p>
                    <button className="btn-primary">Read Blogs</button>
                </div>
                <div className="section">
                    <h2>Manage Contacts</h2>
                    <p>Organize and keep track of your important contacts for seamless communication.</p>
                    <button className="btn-primary">Manage Contacts</button>
                </div>
            </div>
        </div>
    );
};

export default Home;

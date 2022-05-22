import React from "react";
import teamImage from "../assets/media/team-pic.jpg";

// TODO: Contact Form
// TODO: Style

/**
 * Renders an about page (route "/about") within the website.
 * @returns {JSX.Element} The about page component.
 */
const About = () => {
    return (
        <article className="about-cover">
            <div className="container-fl">
                <h1 className="text-center display-4">What is Revisto?</h1>
                <p className="about-lead">
                    Revisto is a public, anonymous journaling website.
                </p>

                <p className="about-p">
                    Our goal is for anyone to be able to post anything, anytime,
                    about their lives from around the world! We want to create a
                    social media app that does not use addictive tactics or feel
                    like a popularity contest!
                </p>
                <p className="about-p">
                    The site is currently being developed and maintained as part
                    of an ongoing project by CS Journeys.
                </p>
                <br />
            </div>

            <div>
                <h2 className="">Motivation</h2>
                <p className="about-p">
                    CS Journeys is a student group dedicated to taking on new
                    projects and developing working applications. We love what
                    we do and want to share our progress with the world!
                </p>
            </div>

            <div>
                <div className="">
                    <img src={teamImage} className="w-25" alt="The Team" />
                </div>
                <br/>
            </div>
            <div>
                <h2 className="">Contact Us</h2>
                <p className="about-p">
                    We would appreciate any and all feedback you have about the
                    site! Email us at revisto.live@gmail.com
                </p>
            </div>
        </article>
    );
};

export default About;

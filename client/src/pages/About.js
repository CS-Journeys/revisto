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
        <article className="about-cover text-center">
            <div className="container-fl">
                <h1>What is Revisto?</h1>
                <p className="lead">
                    Revisto is a public, anonymous journaling website.
                </p>

                <p>
                    Our goal is for anyone to be able to post anything, anytime,
                    about their lives from around the world! We want to create a social media app that
                    does not use addictive tactics or feel like a popularity contest!
                </p>
                <p>
                    The site is currently being developed and maintained as part
                    of an ongoing project by CS Journeys.
                </p>
                <br />
            </div>

            <div>
                <h2>Motivation</h2>
                <p>
                    CS Journeys is a student group dedicated to taking on new
                    projects and developing working applications. We love what
                    we do and want to share our progress with the world!
                </p>
            </div>

            <div>
                <img
                    src={teamImage}
                    className="w-25"
                    alt="The Team"
                />
                <p>
                We would appreciate any and all feedback you have about the
                site!
            </p>
            </div>
        </article>
    );
};

export default About;

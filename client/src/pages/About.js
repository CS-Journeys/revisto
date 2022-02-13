import React from "react";
import { Link } from "react-router-dom";
import teamImage from "./static/media/sample-team-pic.jpg";

// TODO: Contact Form
// TODO: Style

/**
 * Renders an about page (route "/about") within the website.
 * @returns {JSX.Element} The about page component.
 */
const About = () => {
    return (
        <article>
            <div className="container-fl">
                <h1>What is Revisto?</h1>
                <p className="lead">
                    Revisto is a public, anonymous journaling website.
                </p>

                <p>
                    Our goal is for anyone to be able to post anything, anytime,
                    about their lives - without the over-emphasis on popularity
                    that is commonplace among many social media venues.
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
                <br />
            </div>

            <div>
                <h2>The Team</h2>
                <img
                    src={teamImage}
                    className="w-50 img-thumbnail"
                    alt="Team picture!"
                />
            </div>
            <p>
                We would appreciate any and all feedback you have about the
                site!
            </p>
            <Link className="about-link" to="/">
                <h4 className="display-5">Contact Us (WIP)</h4>
            </Link>
        </article>
    );
};

export default About;

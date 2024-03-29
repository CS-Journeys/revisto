import React from "react";
import { Link } from "react-router-dom";
import cat from "../assets/media/sad-cat.jpg";

// TODO: Contact Form
// TODO: Style

/**
 * Renders a 404 page for when things mess up (route /whatever) within the website.
 * @returns {JSX.Element} The 404 page.
 */
const About = () => {
    return (
        <article className="d-flex flex-column justify-content-center">
            <img
                className="img-fluid"
                src={cat}
                alt="Sad cat for your troubles. ;-;"
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "50%",
                }}
            />
            <div className="align-items">
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>
                            Sorry for the inconvenience, but we cannot find the
                            page you're looking for.
                        </p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        The Revisto Team
                    </figcaption>
                    <br />
                    <Link to="/">
                        <h4 className="about-link">Return to Home</h4>
                    </Link>
                </figure>
            </div>
            <br />
        </article>
    );
};

export default About;

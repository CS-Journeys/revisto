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
                <h1 className="text-center display-4">About</h1>
                <h2>What is Revisto?</h2>
                <p className="about-p">
                    Revisto is a journaling website. We designed Revisto to be a
                    healthy space to share your thoughts and explore others'
                    internal worlds as well.
                </p>
                <br />
            </div>
            <div>
                <h2 className="">Core Features</h2>
                <p className="about-p">
                    <b> - PUBLIC:</b> We want anyone to be able to share
                    anything, anytime, about their lives from around the world!
                </p>
                <p className="about-p">
                    <b> - ANONYMOUS:</b> To facilitate honesty, all posts are
                    anonymous.
                </p>
                <p className="about-p">
                    <b> - QUALITATIVE:</b> Human value is not a number. We don't
                    want users to fixate on maximizing likes. We want you to
                    know that at least one person read your post.
                </p>
                <p className="about-p">
                    <b> - TEXT-ONLY:</b> Text is easy to moderate, and text
                    allows users to focus on the raw thoughts which transcend
                    superficial boundaries.
                </p>
                <br />
            </div>

            <div>
                <h2>The Team</h2>
                <p className="about-p">
                    CS Journeys is a student programming group dedicated to
                    learning, taking on new projects, and developing working
                    applications. We love what we do and want to share our
                    progress with the world!
                </p>
                <div className="">
                    <img src={teamImage} className="w-25" alt="The Team" />
                </div>
                <br />
            </div>

            <div>
                <h2>Project State</h2>
                <p className="about-p">
                    While we welcome users to this experimental social media
                    platform, we recognize that it could be even more. If you
                    are interested in scaling up Revisto or building something
                    similar, please reach out to us at revisto.live@gmail.com.
                    Any other questions or feedback would also be highly
                    appreciated!
                </p>
                <p className="about-p">
                    At the very least, we hope that Revisto will inspire you to
                    re-imagine what social media can be :)
                </p>
                <br />
            </div>
        </article>
    );
};

export default About;

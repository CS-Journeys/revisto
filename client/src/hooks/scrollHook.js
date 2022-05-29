import { useEffect, useState } from "react";
import useLocalStorage from "./storageHook";

/**
 * Sets scrollY position of window based on a setting condition, i.e. when api calls are done
 * also sets the scroll position when unmounting, i.e. a user navigates to a different page
 *
 * @param {string} localStorageKey The key used to store the scroll position
 * @param {boolean} setCondition Scroll position gets set when this condition is true
 */
export default function useWindowScrollPosition(localStorageKey, setCondition) {
    const [scrollYStorage, setScrollYStorage] = useLocalStorage(localStorageKey, 0);
    const [scrolled, setScrolled] = useState(false);
    const [prevScroll, setPrevScroll] = useState(scrollYStorage);
    const originalPath = window.location.pathname;

    const handleScroll = () => {
        if (window.location.pathname == originalPath) {
            setScrollYStorage(window.scrollY);
        }
    };

    useEffect(() => {
        // if the setcondition is true (AKA everything in the DOM is loaded: fire off the scrollTo()!)
        if (setCondition && !scrolled) {
            window.scrollTo(0, prevScroll);
            if (window.scrollY == prevScroll) {
                setScrolled(true);
            }
        }
    });

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
}

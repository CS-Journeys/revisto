import { useState } from "react";

/**
 * Sync state to local storage so that it persists through a page refresh.
 * Usage is similar to useState except we pass in a local storage key so that
 * we can default to that value on page load instead of the specified initial
 * value.
 *
 * @param {string} key The key used to store the data
 * @param {*} initialValue The initial value of the data
 * @returns {Array} The stored value and a method to set the value
 */
const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            console.log("BRUH2");
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                localStorage.setItem(key, JSON.stringify(valueToStore));
            } else {
                console.log("BRUH");
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
};

export default useLocalStorage;

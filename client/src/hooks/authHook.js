export const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const formatContent = (content) => {
    // Check for spam links
    if (content.search("<a href=") >= 0 || content.search("http") >= 0) {
        return {__html: "[Malicious Link Detected]"}
    }

    // Add newlines    
    let fContent = content.replaceAll("\n", "<br>");

    return {__html: fContent };
}
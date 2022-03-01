export const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const formatContent = (content) => {
    let fContent = "<p>" + content.replaceAll("\n", "<br>") + "</p>";
    return {__html: fContent };
}
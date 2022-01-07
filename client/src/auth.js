import axios from 'axios';

// Axios GET user with token
function loadUser(token) {
    if (token == "") return null;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.get('/users', config)
        .then(res => {
            const {user} = res.data;
            console.log("User Authenticated! ", user);
            return user;
        })
        .catch(error => { // Console log error
            console.log(`Could not get user: ${error}`);
        });

    return null;
}

export { loadUser };
/**
 * Check if user is registered imn MongoDB database
 * @param {*} userData 
 * @returns true/false
 */
async function serverQuery(userData) {
    try {
        if (typeof axios === 'undefined') {
            console.error('Axios is not loaded!');
            return [];
        }

        const response = await axios.get("http://localhost:3000/", { params: userData });
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e.message);
        alert(e.message);
        throw e;
    }
}

/**
 * Check if user is registered imn MongoDB database
 * @param {*} userData 
 * @returns true/false
 */
async function serverCreateUser(userData) {
    try {
        if (typeof axios === 'undefined') {
            console.error('Axios is not loaded!');
            return [];
        }

        const response = await axios.get("http://localhost:3000/", { params: userData });
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e.message);
        alert(e.message);
        throw e;
    }
}



/**
 * 
 * @param {*} action signin/ signup 
 * @param {*} userData 
 * @returns 
 */
async function isUserRegistered(action, userData) {
    let isUserExist = false;
    try {
        data = await serverQuery(userData);
        if (action == "signin") {
            let message = "";
            if (data.length >= 1) {
                message = "User " + userData.email + " is saved on MongoDB database";
                console.log(message);
                localStorage.setItem('userData', JSON.stringify(data));
                console.log(data);
                isUserExist = true;

            } else {
                message = userData.email + " does not exit. \n Please signup";
                console.log(message);
                isUserExist = false;
                alert(message);
            }
            return isUserExist;

        } else if (action == "signup") {
            if (data.length == 0) {
                localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                message = userData.email + " is already exit. \n Please signin";
                console.log(message);
                alert(message);
                isUserExist = true;
            }
            return isUserExist;
        }
    } catch (e) {
        console.log(e.message);
        alert(e.message);
        throw e;
    }
}

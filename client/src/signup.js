
/**
 * signup a new user
 */
async function signupNewUser() {
    let userData = getUserInputElementData();

    const isRegistered = await isUserRegistered("signup", userData);
    if (isRegistered == true) {
        showProdcutsPage();
    
    // User is not registered - Signup   
    } else {
        signupUserData(userData);

        showProdcutsPage();
    }
}


/**
 *  Get data from html document
 * @returns userData
 */
function getUserInputElementData() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let userData = {
        username: username,
        email: email,
        password: password
    }
    return userData
}


async function signupUserData(signupData) {
    try {
        if (typeof axios === 'undefined') {
            console.error('Axios is not loaded!');
            return;
        }

        const response = await axios.post("http://localhost:3000/signup", signupData);

        console.log(response.data);

        if (response.data.length >= 1) {
            message = "User " + response.data[0].email + " is saved on MongoDB database";
            alert(message);
            localStorage.setItem('userData', JSON.stringify(response.data));
            console.log(data);
        } else {
            message = response.data[0].email + " does not exit. \n Please signup";
            console.log(message);
            alert(message);
        }
        return response.statusText;

    } catch (e) {
        console.log(e.message);
        alert(e.message);
        throw e;
    }
}


function showProdcutsPage(userData) {
    const prodcutsPage = window.location.origin + "/client/public/products.html"
    window.location.href = prodcutsPage;
}

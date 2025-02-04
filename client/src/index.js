let SIGNUP_URL = "http://127.0.0.1:5501/client/public/signup.html";
let PRODUCTS_URL = "http://127.0.0.1:5501/client/public/products.html";

/**
 * signin to shop
 */
async function signin() {
    let userData = getUserInputElementData();

    const isRegistered = await isUserRegistered("signin", userData);
    if (isRegistered == true) {
        showProdcutsPage(userData);
    } else {
        console.log("Not registered");
    }
}


function signup() {
    showSignupPage();
}


/**
 *  Get data from html document
 * @returns userData
 */
function getUserInputElementData() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let userData = {
        email: email,
        password: password
    }
    return userData
}


function showProdcutsPage(userData) {
    //PRODUCTS_URL = `products.html?email${encodeURIComponent(userData.email)}
    PRODUCTS_URL = 'products.html?email=' + userData.email;
    location.assign(PRODUCTS_URL);
}


function showSignupPage() {
    location.assign(SIGNUP_URL);
}


document.addEventListener('input', function(event) {
    if (event.target === document.activeElement) {
        console.log('URL potentially changing');
    }
});
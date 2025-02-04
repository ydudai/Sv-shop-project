/**
 * Show all shop products wen DOM Vontent loaded
 */
document.addEventListener('DOMContentLoaded', () => {

    // Get array of products to buy from local storaget   
    let productsForBuy = JSON.parse(localStorage.getItem('selectedProducts'));

    // Show totals 
    showTotalOfOrder(productsForBuy);
})


function showTotalOfOrder(productsForBuy) {
    // Show total products on HTML DOM element <h3>
    document.getElementById("total-product").innerText = "Total product: " + productsForBuy.length;

    // Show total Price on HTML DOM element <h3>
    let totalPrice = 0;
    productsForBuy.forEach(product => {
        totalPrice += product.price;
    });
    document.getElementById("total-price").innerText = "Total price: " + totalPrice;
}


function approve() {
    // Get array of products to buy from local storaget
    let productsForBuy = JSON.parse(localStorage.getItem('selectedProducts'));

    // Get user data
    let userData = JSON.parse(localStorage.getItem('userData'));

    // Save order data in database
    saveOrderDetails(userData, productsForBuy);
}

/**
 * Save order data in database
 * @param {*} userData 
 * @param {*} productsForBuy 
 */
async function saveOrderDetails(userData, productsForBuy) {
    try {
        if (typeof axios === 'undefined') {
            console.error('Axios is not loaded!');
            return isUserExist;
        }

        let orderData = setOrderData(userData, productsForBuy);

        const response = await axios.post("http://localhost:3000/order", orderData);
        console.log(response.data);

        if (response.statusText == "OK") {
            signOut();
            showHomePage();
        }

    } catch (e) {
        console.log(e.message);
        alert(e.message);
        throw e;
    }
}


function setOrderData(userData, productsForBuy) {

    let products = productsForBuy.map((dbPrduct) => {
        return { productName: dbPrduct.productName, price: dbPrduct.price }
    }
    )

    let orderData = {
        customer: userData.username,
        email: userData.email,
        products: products
    }

    return orderData;
}

async function signOut() {
    try {
        if (typeof axios === 'undefined') {
            console.error('Axios is not loaded!');
            return isUserExist;
        }

        const response = await axios.get("http://localhost:3000/logout");
        console.log(response.data);

        if (response.ok) {
            localStorage.clear();
            sessionStorage.clear();

            // 3. Clear any cookies
            // document.cookie.split(";").forEach(cookie => {
            //     document.cookie = cookie
            //         .replace(/^ +/, "")
            //         .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            // });

        } else {
            throw new Error('Logout failed');
        }

    } catch (e) {
        console.log(e.message);
        alert(e.message);
        throw e;
    }

}


function showHomePage() {
    const homePage = window.location.origin + "/client/public/index.html"
    window.location.href = homePage;
}
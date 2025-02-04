let URLOrder = "http://127.0.0.1:5501/client/public/order.html";

let productsForBuy = []
let products = []

/**
 * Show all shop products wen DOM Vontent loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    getAndShowProducts();
})


async function getAndShowProducts() {
    products = await getProducts();
    showProducts();
}


async function getProducts() {
    products = {};
    try {
        if (typeof axios === 'undefined') {
            console.error('Axios is not loaded!');
            return isUserExist;
        }

        const response = await axios.get("http://localhost:3000/products");
        products = response.data;
        return products;

    } catch (e) {
        console.log(e.message);
        alert(e.message);
        throw e;
    }
}


function sortProducts() {
    const selectElement = document.getElementById("sort-option");
    const selectedValue = selectElement.value;
    if (selectedValue == "By Name") {
        products.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (selectedValue == "By Price") {
        products.sort((a, b) =>a.price - b.price);
    }

    showProducts();
}


function showProducts() {

    // Filter products to show
    // let productsToShow = products.filter((product) => product.price <= maxPrice);

    // Remove old product elements from browser
    clearProducts();

    // Display Product elements in browser
    products.forEach(product => {
        createDomElement(product);
    });
}


function clearProducts() {
    let productDivs = document.getElementsByClassName("product-div");
    let numProducts = productDivs.length
    for (let i = numProducts - 1; i >= 0; i--) {
        productDivs[i].remove();
    }
}


// Create product child DOM element
function createDomElement(product) {
    const newDiv = document.createElement("div");
    newDiv.style.border = "1px solid black";
    newDiv.style.margin = "10px";
    newDiv.className = "product-div"
    newDiv.id = product.productName
    const h1 = document.createElement("h2")
    h1.innerText = product.productName;

    const p = document.createElement("p")
    p.innerText = "description: " + product.productName + " Price: " + product.price;
    newDiv.append(h1);
    newDiv.append(p);
    newDiv.addEventListener('click', function (event) {
        if (event.target.parentNode.matches('div')) {
            console.log('Clicked div:', event.target.parentNode);
            console.log('Div id:', event.target.parentNode.id);
            productsForBuy.push(product);
            console.log(productsForBuy);
        }
    })

    // Add new div to body
    const parentProductsElement = document.getElementById("products");
    parentProductsElement.append(newDiv);
 }


function buy() {
    localStorage.setItem('selectedProducts', JSON.stringify(productsForBuy));
    showOrderPage();
}


function showOrderPage() {
    location.assign(URLOrder);
}

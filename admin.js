let adminbtn = document.getElementById("admin-btn");

adminbtn.addEventListener('click',function(){

    let adminName = document.getElementById("admin-name").value;
    let adminPassword = document.getElementById("admin-password").value;

    if(adminName === "Sheamous" && adminPassword === "12345"){
        window.location.href = "admin.html"; 
    }else{
        document.getElementById("login-text").textContent = 
        "incorrect username or password"
    }

});

// let products =[];
// let productName = document.getElementById("product-name");
// let productPrice = document.getElementById("product-price");
// let productCategory = document.getElementById("category");
// let productImage = document.getElementById("image");
// let productDescription = document.getElementById("bio");
// let addProduct = document.getElementById("add-product");


// addProduct.addEventListener('click',function(){
//     let product = {
//     name: productName.value,
//     price: productPrice.value,
//     category: productCategory.value,
//     description: productDescription.value
// };
// products.push(product);
//  displayProduct();

// });

// let productReview =document.getElementById("product-review");

// function displayProduct(){
//     productReview.innerHTML = "";

//     products.forEach(function(product){
//          productReview.innerHTML += `
//          <div>
//          <h3>${product.name}</h3>
//          <p>${product.price}</p>
//          <p>${product.category}</p>
//          <p>${product.description}</p>

//          <button>Edit</button>
//          <button>Delete</button>
//          </div>
//          `;
//     });
// };

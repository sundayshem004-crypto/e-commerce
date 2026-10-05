let products = JSON.parse(localStorage.getItem("products")) || [];
let editingIndex = null;
let productName = document.getElementById("product-name");
let productPrice = document.getElementById("product-price");
let productCategory = document.getElementById("category");
let productImage = document.getElementById("image");
let productDescription = document.getElementById("bio");
let addProduct = document.getElementById("add-product");


addProduct.addEventListener('click', function() {

    // EDITING AN EXISTING PRODUCT
    if (editingIndex !== null) {

        let product = products[editingIndex];

        product.name = productName.value;
        product.price = productPrice.value;
        product.category = productCategory.value;
        product.description = productDescription.value;

        // Keep the existing image
        products[editingIndex] = product;

        editingIndex = null;
        addProduct.textContent = "ADD PRODUCT";

        productName.value = "";
        productPrice.value = "";
        productCategory.value = "";
        productDescription.value = "";
        productImage.value = "";

        displayProduct();
        localStorage.setItem("products", JSON.stringify(products));

        return;
    }


    // ADDING A NEW PRODUCT
    let imageFile = productImage.files[0];

    if (!imageFile) {
        alert("Please select a file");
        return;
    }

    let reader = new FileReader();

    reader.onload = function() {

        let product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
            image: reader.result
        };

        products.push(product);

        productName.value = "";
        productPrice.value = "";
        productCategory.value = "";
        productDescription.value = "";
        productImage.value = "";

        displayProduct();

        localStorage.setItem("products", JSON.stringify(products));
    };

    reader.readAsDataURL(imageFile);

});

let productReview =document.getElementById("product-review");




function displayProduct(){
    productReview.innerHTML = "";

    products.forEach(function(product,index){
         productReview.innerHTML += `
         <div class="js-product">
         <img src="${product.image}" width = "100">
         <h3>name: ${product.name}</h3>
         <p>price: ₦${product.price}</p>
         <p>category: ${product.category}</p>
         <p>description: ${product.description}</p>

         <button class="edit-btn" onclick="editproduct(${index})">Edit</button>
         <button class="delete-btn" onclick="deleteproduct(${index})">Delete</button>
         </div>
         `;
    });
    
};
displayProduct()


function deleteproduct(index){
    products.splice(index,1);
    displayProduct();
    localStorage.setItem("products",JSON.stringify(products));
}; 



function editproduct(index){

    editingIndex = index;

    let product = products[index];

    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productDescription.value = product.description;

    addProduct.textContent = "UPDATE PRODUCT"

    document.getElementById("product-form").scrollIntoView({
        behavior: "smooth"
     });

}
//toggle menu bar

let navBar = document.getElementById("admin-board");
let navButton = document.getElementById("menu");

navButton.addEventListener('click',function(){
    navBar.classList.toggle('active');
    
});
let closeMenu = document.getElementById("close-menu");

closeMenu.addEventListener('click',function(){
    navBar.classList.remove('active');

})

//nav-section

let overviewButton = document.getElementById("overview-btn");
let overviewSection = document.getElementById("overview-section");
let productButton = document.getElementById("product-btn");
let productSection = document.getElementById("product-section");
let orderButton = document.getElementById("order-btn");
let orderSection  = document.getElementById("order-section")

overviewButton.addEventListener('click',function(){
    hidesections();
    overviewSection.style.display = "block";
     navBar.classList.remove('active');
});

productButton.addEventListener('click',function(){
    hidesections();
    productSection.style.display = "block";
     navBar.classList.remove('active');
});

orderButton.addEventListener('click',function(){
    hidesections();
    orderSection.style.display = "block";
     navBar.classList.remove('active');
});

function hidesections(){
    overviewSection.style.display = "none";
    productSection.style.display = "none";
    orderSection.style.display = "none";
}
let productCount = document.getElementById("product-count");
productCount.textContent = products.length


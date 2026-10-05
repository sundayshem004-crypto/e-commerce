const buyButton = document.querySelectorAll(".buybtn");
const cartContainer = document.getElementById("cart");
const cartCount = document.getElementById("cart-count");
const cartBox = document.getElementById("cart-box");
const cartItems = document.getElementById("cart-item");
const closeCart = document.getElementById("close-cart");

let orders = JSON.parse(localStorage.getItem("orders")) || [];


let savedCart = localStorage.getItem("cart");
   let cart;
   if (savedCart){
      cart = JSON.parse(savedCart);
   }else{
      cart = [];
   }


let total = 0;

buyButton.forEach(function(button){
    button.addEventListener('click',function(){
    const productContainer = button.parentElement.parentElement.parentElement;
     const productImage = productContainer.querySelector('img');
     const productPrice = productContainer.querySelector('.price');
     const cartItem = {
        Image: productImage.src,
        price: productPrice.textContent,
        quantity: 1
     };
     const itemAdd = cart.find(function(item){
        return item.Image === productImage.src;
     });
     
     if(itemAdd ){
        itemAdd.quantity++;
     }else{
         cart.push(cartItem)
     };
     cartCount.textContent++;
     displayCart();
    
    });
    
});
   
 cartContainer.addEventListener('click' ,function(){
    cartBox.style.display = 'block';
    closeCart.style.display = 'block'
 });

 function removeFromCart(index){
   cart.splice(index,1);
   displayCart();
 };

 function increaseQuantity(index){
   cart[index].quantity++;
   displayCart();
 };

  function decreaseQuantity(index){
   if(cart[index].quantity > 1){

      cart[index].quantity--; 
   }
   else{
      cart.splice(index,1);
   }
   
   displayCart();
 };

 closeCart.addEventListener('click',function(){
   cartBox.style.display = 'none';
   closeCart.style.display = 'none';

 });
 function cartNotification(item){
   let count = 0;

   cart.forEach(function(item){
      count += item.quantity;
   });
   cartCount.textContent = count;
 };
 
const inputSearch = document.getElementById("input-search");
const searchBar = document.getElementById("search-bar");
const productContainer = document.querySelector(".hero-page");
     

//SEARCH BAR..............

 inputSearch.addEventListener('input',function(){
   let searchValue = inputSearch.value.toLowerCase();
   let productCard = Array.from(productContainer.children);
   productCard.forEach(function(productCard){
      // for (let i = 0;i < productCard.length;i++){// }
      
      let productName = productCard.querySelector('img');
      let imageName = productName.src.toLowerCase();
      if(imageName.includes(searchValue)){
         productCard.style.display = "";
      
      }else{productCard.style.display = "none";

      }

   });
   
      
   });

     
 function displayCart(){
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(function(item,index){

         total += item.quantity*Number(String(item.price).replace('PRICE: ₦','').replace(',','')),
        cartItems.innerHTML += `
        <div class="cart-items">
        <img src="${item.Image}" alt='product'>
        <p>${item.price}</p>
        <p> quantity: ${item.quantity}</p>
        <button class="cart-buttons" onclick = "removeFromCart(${index})">remove</button>
        <button class="cart-buttons"  onclick = "increaseQuantity(${index})">+</button>
        <button  class="cart-buttons" onclick = "decreaseQuantity(${index})">-</button>
        </div>
        `;
     
    });
   cartItems.innerHTML += `
   <p> TOTAL: ₦${total.toLocaleString()}</p>
    <button id="checkout-btn">checkout</button>
   `;
   const checkOutBtn = document.getElementById("checkout-btn");
   const orderBox = document.getElementById("order");
      checkOutBtn.addEventListener('click',function(){
      orderBox.style.display = "block";
   });
   if(cart.length === 0){
      orderBox.style.display = 'none';
   }
   if(cart.length === 0){
      checkOutBtn.style.display = 'none';
   }


   const customerName = document.getElementById("customer-name");
    const customerNumber = document.getElementById("customer-number");
    const placeOrder = document.getElementById("place-order");

    placeOrder.addEventListener('click',function(){
     let name = customerName.value;
     let number = customerNumber.value;
     if(name === "" || number === ""){
      alert("please enter your name and phone number");
      return;
   //   }else{
   //    alert("order placed successfully")
   //    return
     }
   let orderMessage = `customer: ${name}\nphone: ${number}\n\norder: \n`;
   let orderTotal = 0
   cart.forEach(function(item){
      orderMessage += `${item.quantity} * ${item.price}\n`;
      orderTotal += item.quantity * Number(String(
         item.price).replace('PRICE: ₦','').replace(/,/g,''))
      ;
   });
   orderMessage += `\nTotal: ₦${orderTotal.toLocaleString()} `;
   let order = {
      customer: name,
      phone:number,
      items: cart,
      total: orderTotal
   };orders.push(order);


orders.push(order);


   localStorage.setItem("orders",JSON.stringify(orders));
    
   let whatsappNumber = "2348081950306";
   let whatsappURL = `http://wa.me/${whatsappNumber}?text=${encodeURI(orderMessage)}`;
   window.open(whatsappURL, "_blank");
    
  let orderSuccess = document.getElementById("order-message");
  orderSuccess.textContent = "order ready! please check and forward message on whatsapp"
 
    
    });
   cartNotification();
   localStorage.setItem("cart",JSON.stringify(cart))
 };

    displayCart();
  
   
  


     
 
    


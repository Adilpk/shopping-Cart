$(document).ready(function () {

    let products = document.querySelector(".part1");
    let cart = document.querySelector(".item-data");
    let totalamount = document.querySelector(".total");
    let cart_item = []
   
    async function fetchproducts(url) {
      let data = await fetch("https://fakestoreapi.com/products/");
      let response = await data.json();
      for (i = 0; i < response.length; i++) {
        let short_name = response[i].title
        products.innerHTML += `
        <div class="column">
        <div class="card">
        <img src="${response[i].image}" width="200" height="100">
        <h5>${short_name.length > 20 ? short_name.substring(0,20): short_name}</h5>
        <h6>${response[i].category}</h6>
        <p>$${response[i].price}</p>
        </div>
        <button class="btn" id=${response[i].id}>Add To Cart</button>
        </div>
        `;
      }
      $("button").click(function(){
        let product_id = (this.id);  
        let checkitem = cart_item.find( item => item.id === product_id);
        if (checkitem)
        {
          checkitem.quantity = checkitem.quantity+1;
        }
        else{
          cart_item.push({ id : product_id,
          title : response[product_id-1].title,
          category : response[product_id-1].category,
          price : response[product_id-1].price,
          image : response[product_id-1].image,
          quantity : 1
          });
        }
       
        displaycart();
      });
    }
    function displaycart(){
 
      cart.innerHTML = " ";
      let sum = 0;
      let sub = 0;
      cart_item.forEach(item =>
       
        {
          sub = item.price * item.quantity;
        cart.innerHTML +=`
        <div>
                      <img src="${item.image}" width="140" height="100">
                      <p style= "font-size:12px">${item.title}</p>
                      <p style= "font-size:12px">${item.category}</p>
                      <p id="amt" style= "font-size:12px">$${item.price} X ${item.quantity} :${sub}</p>
                      <input type="number" id="${item.id}" class="update" size="3" value=${item.quantity} min="0">
                      <button class="btn3 deleteitem" id=${item.id}>Delete</button>      
        `;
       
        sum = sum + item.price * item.quantity;
      });
 
      totalamount.innerHTML =`
      <h5>Total = $ ${sum} </h5>
      <input type="radio" name="payment" value="Cash" > Cash
      <input type="radio" name="payment" value="female" > Card

      ` ;
      $(".deleteitem").click(function(){
        let sub_id = this.id;
        cart_item = cart_item.filter(item =>
          item.id !== sub_id);
          displaycart();
      });
      $(".update").change(function(){
        let change_id = this.id;
        console.log(change_id);
        let quantity = $(this).val();
        console.log(quantity);
        let itemupdate = cart_item.find(item => item.id === change_id);
        console.log(itemupdate);
        if (itemupdate){
            itemupdate.quantity = quantity;
            displaycart();
        }
      });
     
 
    }
    $(".clear").click(function(){
      if(cart_item.length === 0){
     
      swal("Cart empty", "Sorry Cart is empty", "info", {
        button: "ok",
   
      });
      }
      else{
        cart_item.length = 0 ;
 
        displaycart();
      }
 
    });
    $(".payment").click(function(){
      if(cart_item.length === 0){
        swal("Cart empty", "Sorry Cart is empty", "info", {
          button: "ok",
     
        });
      }
      else{
        cart_item.length = 0;
        displaycart();
        swal("Purchased Successfully", "track your order", "success", {
          button: "ok",
     
        });
       
      }
 
    });  
    fetchproducts();
  });

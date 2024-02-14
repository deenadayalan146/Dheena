let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    header.classList.toggle('active', window.scrollY > 0);
});

menu.onclick = () =>
{
    navbar.classList.toggle('active');
}

window.onscroll = () =>
{
    navbar.classList.remove('active');
}

let listproducts=[]
var carts =[]
let iconcart=document.querySelector(".iconcart")
let closecart =document.querySelector(".close")
let listproducthtml=document.querySelector('.listproducthtml')
let listcart=document.querySelector('.listCart')

iconcart.addEventListener("click",()=>{
    let cartTab=document.querySelector('.cartTab')
    cartTab.style="display:grid";
})
closecart.addEventListener("click",()=>{
    let cartTab=document.querySelector('.cartTab')
    cartTab.style="display:none";
})
function addToHtml(){
    listproducthtml.innerHTML=''
    if(listproducts.length>0){
        listproducts.forEach((product)=>{
            let newproduct=document.createElement('div');
            newproduct.classList.add('item1');
            newproduct.dataset.id=product.id
            newproduct.innerHTML=`
            <div class="box-img">
                <img src=${product.image} alt="" id="add1" class="">
            </div>
            <h3>${product.name}</h3>
            <h2 class="price1">Rs.₹${product.price}/-</h2>
            <button type="button" class="btn btn-primary" id="add1" >Add to Cart</button>`;
        
            listproducthtml.appendChild(newproduct)
        })
    } 
    
}
listproducthtml.addEventListener("click",(e)=>{
    let posclick=e.target
    if(posclick.classList.contains('btn')){
        let product_id=posclick.parentElement.dataset.id
        addToCart(product_id);
    }
})
function addToCart(product_id){
    let posthisproductinthiscart=carts.findIndex((value)=>value.productid==product_id)
    if(carts.length<=0){
        carts=[{
            productid:product_id,
            quantity:1
        }]
    }else if(posthisproductinthiscart < 0){
        carts.push({productid:product_id,
        quantity:1})
    }else{
        carts[posthisproductinthiscart].quantity=carts[posthisproductinthiscart].quantity + 1;
    }
    addCartToHtml()
}
function addCartToHtml(){
    listcart.innerHTML=''
    if(carts.length>0){
        carts.forEach(cart=>{
            let newcart=document.createElement('div')
            newcart.classList.add('item2')
            newcart.dataset.id=cart.productid
            let posproduct=listproducts.findIndex((value)=>value.id==cart.productid)
            var info = listproducts[posproduct]
            newcart.innerHTML=(`
            <div class="image" >
                <img src=${info.image} alt="">
            </div>
            <div class="name">${info.name}</div>
            <div class="price" >₹${info.price * cart.quantity}</div>
            <div class="quantity">
                <button class="span1" ><</button>
                <span>${cart.quantity}</span>
                <button class="span2" >></button>
            </div>
            `)
            listcart.appendChild(newcart)
        })
    }   
}
listcart.addEventListener("click",(event)=>{
    positionclick=event.target
    if(positionclick.classList.contains('span1')||positionclick.classList.contains('span2')){
        let prodid=positionclick.parentElement.parentElement.dataset.id;
        let type='span1'
        if(positionclick.classList.contains('span2')){
            type='span2'
        }
        changePrice(prodid,type)
    }
})
function changePrice(prodid,type){
    let positionitemincart=carts.findIndex(value=>value.productid==prodid)
    console.log(positionitemincart);
    if(positionitemincart >= 0){
        switch(type){
            case('span2'):
            carts[positionitemincart].quantity=carts[positionitemincart].quantity+1
            break;
            default:
                let valueChange=carts[positionitemincart].quantity -1
                if(valueChange > 0){
                    carts[positionitemincart].quantity=valueChange;
                }
                else{
                    carts.splice(positionitemincart,1);
                }
                break;
        }
    }
    addCartToHtml()
}
// function increaseQuantity(){
//     let span1= document.querySelector(".cartTab .listCart .item2 .quantity span")
//     let content=span1.innerHTML
//     document.querySelector(".cartTab .listCart .item2 .quantity span").innerHTML=Number(content)+1
//     let price= document.querySelector(".cartTab .listCart .item2 .price")
//     let contentnow= span1.innerHTML 
//     console.log(listproducts)
//     console.log(carts.quantity)
//     // price.innerHTML=(listproducts[carts.quantity].price)*Number(contentnow)     
// }
// function decreaseQuantity(){
//     let span2= document.querySelector(".cartTab .listCart .item2 .quantity span")
//     let content=span2.innerHTML
//     document.querySelector(".cartTab .listCart .item2 .quantity span").innerHTML=Number(content)-1 
//     let price= document.querySelector(".cartTab .listCart .item2 .price")
//     info.price
//     console.log(price.innerHTML)     
// }

// span1.addEventListener("click",(e)=>{
//     let posclick=e.target
//        if(typeof(document.querySelector(".cartTab .item2 .quantity .span1").innerHTML)===Number){
//         (document.querySelector(".cartTab .item2 .quantity .span1").innerHTML)++
//        }
    
// })
const init =()=>{
    fetch('products.json')
    .then(response=>response.json())
    .then(data=>{listproducts=data
    addToHtml()
   }
)
}
init()


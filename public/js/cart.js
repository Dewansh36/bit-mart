/* Set rates + misc */
var taxRate = 0.05; 
var fadeTime = 300;
let p= document.getElementsByClassName('products');
var len= parseInt(p[0].children.length);
// console.log(p[0].children.length)
let products= document.getElementsByClassName('product-info');
console.log(products[0].children[1].innerText)
var price= document.getElementsByClassName('products')
console.log(price[0].children[0].children[1].children[1].innerText);
console.log(price[0].children[1].children[1].children[1].innerText);
/* Recalculate cart */

var tot=0;
for(let i=0; i<len; i++)
{
  tot+=parseFloat(products[i].children[1].innerText);
}
var tax= tot*taxRate;
console.log(tax);
tot=tot+tax;
console.log(tot);

document.getElementById("tot-item").innerHTML=len;
document.getElementById("tot-tax").innerHTML=tax;
document.getElementById("tot-price").innerHTML=tot;




// https://codepen.io/justinklemm/pen/zAdoJ
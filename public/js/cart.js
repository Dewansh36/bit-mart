/* Set rates + misc */
var taxRate=0.05;
var fadeTime=300;
let p=document.getElementsByClassName('products');
var len=parseInt(p[0].children.length);
console.log(len);
let products=document.getElementsByClassName('product-info');
console.log(products);
console.log(products[0].children[1].innerText)
var price=document.getElementsByClassName('products')
// console.log(price[0].children[0].children[1].children[1].innerText);
// console.log(price[0].children[1].children[1].children[1].innerText);
/* Recalculate cart */

var tot=0;
for (let i=0; i<len; i++) {
  // let quantity=parseInt(document.getElementById('qval').textContent);
  console.log(products[i].children[2].children[0].innerText);
  let quantity=parseInt(products[i].children[2].children[0].innerText);
  tot+=(quantity*parseFloat(products[i].children[1].innerText));
}
var tax=(tot*taxRate);
console.log(tax);
tot=tot+tax;
tax=tax.toFixed(2);
tot=tot.toFixed(2);
console.log(tot);

document.getElementById("tot-item").innerHTML=len;
document.getElementById("tot-tax").innerHTML=tax;
document.getElementById("tot-price").innerHTML=tot;



// const myForm = document.getElementById('search-form')

// myForm.addEventListener('submit',(e) => {
//     e.preventDefault();
//     const keyword = document.getElementById('inputSearch').value;
//     if (keyword.trim()) {
//       window.location.assign(window.location.pathname+`/product/${keyword}`);
//     } else {
//       window.location.assign(window.location.pathname+`/product`);
//     }
//     console.log(keyword);
// });
window.onload = function() {
  document.getElementById("inputSearch").focus();
};
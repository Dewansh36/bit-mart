
let form1= document.getElementById('form1')
let form2= document.getElementById('form2')

console.log(window.innerWidth);
window.onresize = function(){
    if(window.innerWidth<=988){
        form1.classList.add("mx-auto");
        form2.classList.add("mx-auto");
    }
    else{
        form1.classList.remove("mx-auto");
        form1.classList.remove("mx-auto");
    }
}
let pathname = window.location.pathname;
let pages = ['/','/products','/products','/products/new','','/cart','/wishlist','/users']
let navItem = document.getElementsByClassName('nav-item');
let params = (new URL(document.location)).searchParams;
let type = params.get("type");
let keyword= params.get("keyword");

for(let i=0;i<navItem.length;i++){
    if(i==7){
        if(pathname.includes(pages[i])){
            navItem[i].className = 'active '+navItem[i].className;
        }
    }
    else if(pathname==pages[i]){
        if(i==1 && type=='sell'){
            navItem[i].className += ' active';
        }
        else if(i==2 && type=='rent'){
            navItem[i].className += ' active';
        }
        else if(i!=1 && i!=2){
            navItem[i].className += ' active';
        }
    }
}

let searchText = document.getElementById('nav_search').value;
let form = document.getElementById('search_form')
console.log(form);
form.addEventListener('submit',(event)=>{
    // if(keyword){
    //     searchText.value = keyword;
    // }
    console.log(69);
})
form.addEventListener('onsubmit',(event)=>{
    // if(keyword){
    //     searchText.value = keyword;
    // }
    console.log(69);
})
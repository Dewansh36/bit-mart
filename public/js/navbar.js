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

const btnHandellar =(id)=>{
   const allBtn = document.getElementsByClassName("allBtn");
   for(let item of allBtn){
    item.classList.remove("bg-btnBg2")
   }
  
    document.getElementById(id).classList.add("bg-btnBg2")
}



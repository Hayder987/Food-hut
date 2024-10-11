
const cardDiv = document.getElementById("cardDiv");

// category-api------------------------->
const getCategory = async()=>{
 const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
 const res = await fetch(url);
 const data = await res.json();
 categoryDisplay(data.categories);
};

// Food-api------------------------->
const getFood= async(item)=>{
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`;
  const res = await fetch(url);
  const data = await res.json();
  document.getElementById("showBtn").addEventListener("click",()=>{
    cardDiv.innerHTML = "";
    foodDisplay(data.meals, true)
  });
  foodDisplay(data.meals, false);

};

// deatils api----------------------------->
const getDetails =async(idMeal)=>{
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const res =await fetch (url);
  const data =await res.json();
  detailsDisplay(data.meals[0]);
}

// search api----------------------------->
const getSearch= async(value)=>{
    const url = `https://themealdb.com/api/json/v1/1/search.php?s=${value}`;
    const res = await fetch(url);
    const data = await res.json();
    foodDisplay(data.meals, false);
}

// deatils display----------------------------->
const detailsDisplay=(item)=>{
   
    document.getElementById("modal1").show();
    document.getElementById("modalDiv").innerHTML=`
     <div class="border-b-2 mb-3 p-2">
      <h1 class="text-xl font-bold ">${item.strMeal}</h1>
     </div>
     <div class="mb-3">
      <img class="rounded-xl" src=${item.strMealThumb}>
     </div>
     <p class="mb-3"><span class="text-base font-bold">Category:</span> <span class="text-base text-gray-500"> ${item.strCategory}</span></p>
     <p class="mb-3"><span class="text-base font-bold">Area:</span> <span class="text-base text-gray-500"> ${item.strArea}</span></p>
     <div class="h-[160px] overflow-scroll mb-4">
       <p class=""><span class="text-base font-bold">Description:</span> <span class="text-base text-gray-500"> ${item.strInstructions}</span></p>
     </div>
     <p class="mb-3"><span class="text-base font-bold">Youtube:</span> <span class="text-base  underline text-blue-700"> <a href="${item.strYoutube}" target="blank">${item?.strYoutube || "Not Published"}</a></span></p>
     <p class=""><span class="text-base font-bold">Tags:</span> <span class="text-base text-gray-500"> ${item?.strTags || "Not Found"}</span></p>

    `

};

// Food-display------------------------->
const foodDisplay =(meals, condition)=>{
    cardDiv.innerHTML="";
    if(meals.length===0){
        cardDiv.innerHTML =`
        <h1 class="text-2xl font-bold">Nothing Found</h1>
        `
    }
    
   meals = condition ?meals : meals.slice(0, 12);
   meals.forEach(item=>{
    const div = document.createElement("div");
    div.classList.add("p-6", "rounded-2xl", "border-2")
    div.innerHTML = `
      <img class="w-full mb-6 h-[200px] lg:h-[400px] rounded-xl object-cover" src=${item.strMealThumb}>
      <h1 class="text-center mb-4 font-bold text-base lg:text-xl">${item.strMeal}</h1>
      <div class="flex justify-center items-center">
        <button onclick="getDetails(${item.idMeal})" class="text-btnBg text-xl lg:text-2xl underline py-3 px-4 rounded-xl font-semibold">View Details</button>
      </div>
    `
    cardDiv.appendChild(div);
  });
}


// category-Display------------------------->
const categoryDisplay = (data)=>{
  const categoryDiv = document.getElementById("categoryDiv");

  data.forEach(item=>{

    const button = document.createElement("button");
    button.setAttribute("id", `btn-${item.idCategory}`)
    button.classList.add("allBtn","flex","gap-2", "justify-center", "items-center", "border-2", "p-2", "rounded-xl");
    button.addEventListener("click", ()=>{

        getFood(item.strCategory);
        btnHandellar(`btn-${item.idCategory}`);
    });
    button.innerHTML = `
     <span class="text-xs font-semibold">${item.strCategory}</span>
     <span><img class="w-8 h-8" src=${item.strCategoryThumb}></span>
    `
   categoryDiv.appendChild(button);
  })
}

document.getElementById("searchBtn").addEventListener("click", ()=>{
    const input1 = document.getElementById("input1").value;
    
    getSearch(input1);
})


getCategory();
getFood("Beef");
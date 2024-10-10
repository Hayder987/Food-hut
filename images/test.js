const getData = async()=>{
    const url = "https://openapi.programming-hero.com/api/phones?search=iphone";
    const res = await fetch (url);
    const data = await res.json()
    // console.log(data.data[2].phone_name);
    disPlayData(data.data);

}

const disPlayData = (data)=>{

    const card1 = document.getElementById('card-section');

    data.map(digit=>{

        const divSection = document.createElement("div"); 
        divSection.innerHTML= `

        <img src= ${digit.image}>
        
        
        `

    });

    card1.appendChild(divSection);
    
        


   
    
}


getData();
//Select all elements with the "i" tag and store them in a NodeList called "stars"
const stars = document.querySelectorAll(".stars i");
// console.log(stars);

// Loop through the "stars" NodeList
stars.forEach((star, index1) =>{
 //Add an event Listener that runs a function when the "click" event is triggered   
 star.addEventListener("click", ()=>{
    localStorage.setItem("star", JSON.stringify(index1+1));
    // Loop through the "stars" NodeList Again
    stars.forEach((star, index2) =>{
       // Add the "active" class to the clicked star and any stars with a lower index
       // and remove the "active" class form any stars with a higher index
        index1 >= index2 ? star.classList.add("active"): star.classList.remove("active");
    })
    })
})
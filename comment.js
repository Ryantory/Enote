const comments = document.getElementsByClassName('commentPrompt');
function makeComment() {
    if (comments.length > 0) { // Check if there are any elements with the class
        console.log("click");
        comments[0].classList.add("active") // add active tag to restyle the comment prompt
    } else {
        console.error("No elements with class 'commentPrompt' found.");
    }
}

function closePrompt(){
    comments[0].classList.remove("active") // close comment prompt
}
function typeComment(){
    placeholderText = document.getElementById('placeholder-input').value;
    console.log(placeholderText); 
    localStorage.setItem('textComment',  JSON.stringify([placeholderText]));
}
function submitComment() {
    const star = localStorage.getItem('star');
    const text = localStorage.getItem('textComment');
    console.log(text);
    if(star != null){
        const Fullcomment = [star, text];
        const history = localStorage.getItem('Comment');
        console.log(history);
        if(history == null){
            localStorage.setItem('Comment',  JSON.stringify([Fullcomment]));
        }
        else{
            const historyItem = JSON.parse(history);
            historyItem.push(Fullcomment);
            localStorage.setItem('Comment', JSON.stringify(historyItem));
        }
        alert('Placeholder text saved to localStorage!');
        localStorage.removeItem('star');
        localStorage.removeItem('textComment');
        comments[0].classList.remove("active");
    }
    else{
        alert('Please rate!');
    }    
    function load(){
        const comments = localStorage.getItem('Comment');
        const historyItem = JSON.parse(comments);
        const container = document.querySelector('.testimonial-box-container');
        num = historyItem.length ;
        container.innerHTML="";
        if(comments != null){
            numOfdisplay = num % 3;
           if(numOfdisplay==0){
               numOfdisplay = 3;
           }
    
           for(let i = 1; i <= numOfdisplay; i++){
               // Step 1: Create the main container element
               const testimonialBox = document.createElement('div');
               testimonialBox.className = 'testimonial-box';
    
               // Step 2: Create the 'box-top' div
               const boxTop = document.createElement('div');
               boxTop.className = 'box-top';
    
               // Step 3: Create the 'profile' div
               const profile = document.createElement('div');
               profile.className = 'profile';
    
               // Step 4: Create the 'profile-img' div and add an image inside it
               const profileImg = document.createElement('div');
               profileImg.className = 'profile-img';
               const img = document.createElement('img');
               img.src = 'image/customer.png';
               profileImg.appendChild(img);  // Add the <img> to the 'profile-img' div
    
               // Step 5: Create the 'name-user' div and add the name and username inside it
               const nameUser = document.createElement('div');
               nameUser.className = 'name-user';
               const strong = document.createElement('strong');
               strong.textContent = 'Ryan Li';
               const span = document.createElement('span');
               span.textContent = '@seeMyreview';
               nameUser.appendChild(strong);  // Add <strong> to 'name-user' div
               nameUser.appendChild(span);    // Add <span> to 'name-user' div
    
               // Step 6: Append 'profile-img' and 'name-user' to 'profile'
               profile.appendChild(profileImg);
               profile.appendChild(nameUser);
    
               // Step 7: Create the 'reviews' div and add star icons inside it
               const reviews = document.createElement('div');
               reviews.className = 'reviews';
               console.log(historyItem[num-i][0]);
               for (let j = 0; j <Number(historyItem[num-i][0]); j++) {
                   const star = document.createElement('i');
                   star.className = 'fa-solid fa-star';
                   reviews.appendChild(star);  // Add filled stars
               }
               for(let k = historyItem[num-i][0]; k < 5; k++){
               const emptyStar = document.createElement('i');
               emptyStar.className = 'fa-regular fa-star';
               reviews.appendChild(emptyStar);  // Add empty star
               }
               // Step 8: Append 'profile' and 'reviews' to 'box-top'
               boxTop.appendChild(profile);
               boxTop.appendChild(reviews);
    
               // Step 9: Create the 'Client-comments' div and add a paragraph inside it
               const clientComments = document.createElement('div');
               clientComments.className = 'Client-comments';
               const p = document.createElement('p');
               p.textContent = historyItem[num-i][1];
               clientComments.appendChild(p);  // Add <p> to 'Client-comments'
    
               // Step 10: Append 'box-top' and 'Client-comments' to 'testimonial-box'
               testimonialBox.appendChild(boxTop);
               testimonialBox.appendChild(clientComments);
    
               // Step 11: Append 'testimonial-box' to the DOM 
               // Assuming there's a container element in your HTML to append to
               //not sure
            //    const container = document.getElementsByClassName('testimonial-box-container')[i-1];
               if (container) {
                   container.appendChild(testimonialBox);
               } else {
                   console.error('No element with class "testimonial-box-container" found.');
               }
    
           }
        }
        // Step 1: Create the elements
        const button = document.createElement('button');
        const div = document.createElement('div');
        const icon = document.createElement('i');
    
        // Step 2: Set attributes and classes
        button.className = 'testimonial-box';
        button.setAttribute('onclick', 'makeComment()'); // You can also use button.onclick = makeComment;
        div.className = 'add-review';
        icon.className = 'fa-solid fa-plus';
    
        // Step 3: Structure the elements
        div.appendChild(icon);    // Append the <i> element to the <div>
        button.appendChild(div);  // Append the <div> to the <button>
    
        // Step 4: Append to the DOM
        // Assuming you want to append it to a container element with an ID of 'container'
        if (testContainer.length > 0) {
            testContainer[0].appendChild(button);
        } else {
            console.error('No element with class "testimonial-box-container" found.');
        }
    }      
    load();
    document.getElementById('placeholder-input').value = "";
    const stars = document.querySelectorAll(".stars i");
    stars.forEach((star, index) =>{
        star.classList.remove("active");   
       })
}

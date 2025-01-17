// start Questions

// geting all buttons
var buttonsElems = document.querySelectorAll(".question-btn");


for (var i = 0; i < buttonsElems.length; i++) {
    buttonsElems[i].addEventListener("click", expand);
}

// function cheack the box expanded or not
function expand(event) {
    
    // using Target identify which button was clicked.
    // Using .closest(".question") find the parent question (article) of that button (find nearinst parent contain question class)
    var question = event.target.closest(".question");

    // getting the question text of what we selected now by closest
    var textParg = question.querySelector(".question-text");


    // if not expanded 
    if(textParg.classList.contains("active")) {
        // console.log("in if");

        // make the text block to appear
        textParg.classList.remove("active");

        // hide plus icon
        var plusIcon = question.querySelector(".plus-icon");
        plusIcon.style.display = "block";

        // display minus icon
        var minusIcon = question.querySelector(".minus-icon");
        minusIcon.style.display = "none";
    }

    else {
        // make the text block to disapper
        textParg.classList.add("active");

        // hide minus icon
        var minusIcon = question.querySelector(".minus-icon");
        minusIcon.style.display = "block";
    
        // display plus icon
        var plusIcon = question.querySelector(".plus-icon");
        plusIcon.style.display = "none";
    }

}

// end Questions

// start best homes

var nextElm = document.querySelector(".next");

nextElm.addEventListener("click",randomImg);

// arr have all images src
var imgSrcArray = ["../Assets/home3.jpg","../Assets/home4.jpg","../Assets/av1.avif"];

function randomImg() {

    var imgElem = document.getElementById("image");
    // pic random index image  
    var indexOfImage = Math.floor(Math.random() * imgSrcArray.length);
    // change the image src
    imgElem.setAttribute("src",imgSrcArray[indexOfImage]);

}

// end best homes 

// start reviews

var buttonEle = document.querySelector(".next-review");

var arrOfReviews = [
    review1 = {
        "name": "sayed",
        "img": "/Assets/person2.png",
        "opinion" : "this reviewer 1 opinion"
    },
    review2 = {
        "name": "ali",
        "img": "/Assets/person3.png",
        "opinion" : "this reviewer 2 opinion"
    },
    review3 = {
        "name": "fady",
        "img": "/Assets/person4.png",
        "opinion" : "this reviewer 3 opinion"
    },
    review4 = {
        "name": "mahmoud",
        "img": "/Assets/person5.png",
        "opinion" : "this reviewer 5 opinion"
    },
    review5 = {
        "name": "noora",
        "img": "/Assets/person6.png",
        "opinion" : "this reviewer 6 opinion"
    }
];

buttonEle.addEventListener("click", picRandomReview);

// getting user image 
var userImgReview = document.querySelector(".user-review-img");

// getting user opinion
var userOpinionReview = document.querySelector(".opinion");

// getting user name 
var userName = document.querySelector(".user-name");

function picRandomReview() {

    // getting random index review
    var indexOfReview = Math.floor(Math.random() * arrOfReviews.length);

    // getting next review image
    var userImg = arrOfReviews[indexOfReview].img;
    // getting next review opinion
    var userOpinion = arrOfReviews[indexOfReview].opinion;

    // getting next user name 
    var newUserName =  arrOfReviews[indexOfReview].name;

    // replacing old img with new img
    userImgReview.setAttribute("src",userImg);

    // replacing old opinion with new opinion
    userOpinionReview.innerHTML = userOpinion;

    // replacing old name with new name
    userName.innerHTML = newUserName;

}
// end reviews
// start landing

// make random paragraph 
var paragraphArray = [
    "Your dream home is just a click away!",
    "Discover a place you'll love to call home.",
    "Begin your journey to the perfect property today!",
    "Let us help you find the keys to your future.",
    "Unlock the door to your next adventure.",
    "Find comfort, style, and everything in between.",
    "Where dreams of homeownership come true.",
    "Your perfect property match starts here.",
    "Rent it or own it—your choice, your way!",
    "Making your real estate dreams a reality.",
    "Find homes, not just houses."
];

// Select the placeholder element
var paragraphElem = document.querySelector(".random-message");

// Call the function on page load
window.addEventListener("load", picRandomParagraph);



function picRandomParagraph() {

    // Get a random index from the messages array
    var randomParagraphIndex = Math.floor(Math.random() * paragraphArray.length);

    // Update the text content of the element with the random message
    paragraphElem.innerHTML = paragraphArray[randomParagraphIndex]

    // make the paragraph displayed smooth
    paragraphElem.style.opacity = "1";
    paragraphElem.style.transform = "translateX(0)";

}

// make the buttons displayed smooth

// pick the two buttons
var twoButtons = document.querySelector(".chooses");

// calling the function
window.addEventListener("load", makeButtonSmooth);

// function changing the style of buttons
function makeButtonSmooth() {

    twoButtons.style.opacity = "1";
    twoButtons.style.transform = "translateY(0)";
}

// Recommend based on budget

// pic the syggestion section
var suggestionSection = document.querySelector(".suggestion");

// on load make suggestion displayed smooth
window.addEventListener("load",makeuggestionSectionSmooth);

function makeuggestionSectionSmooth() {

    // change style of suggestion to displayed smooth
    suggestionSection.style.transform = "translateX(0)";
    suggestionSection.style.opacity = "1";
    
}

// pic the modal
var modal = document.querySelector(".modal");

// pic the modal content
var modalMessage = document.getElementById("modal-message");

// pic recommend button to make a recommend
var recommendationButton = document.querySelector(".Recommend-btn");

// onclick recommend option
recommendationButton.addEventListener("click", function (event) {
    // Prevent form submission
    event.preventDefault();
    recommend();
});

function recommend() {

    // pic input Field to take the value
    var inputField = document.querySelector(".input-budget");

    // take the vaule from input
    var userBudget = +inputField.value;

    // recommend something based on budget
    if(userBudget >= 100000) {

        modalMessage.style.opacity = "1";
        modalMessage.innerHTML = "the best option to you is buying";
        

    }
    else if(userBudget <= 500) {

        modalMessage.style.opacity = "1";
        modalMessage.innerHTML = "your budget is too low for both buying and renting";

    }
    else {

        modalMessage.style.opacity = "1";
        modalMessage.innerHTML = "the best option to you is renting";
        
    }
    modal.classList.add("show");
}

// pic the closing icon
var closingIcon = document.querySelector(".close-btn");

// when closing icon clicked close the modal 
closingIcon.addEventListener("click",closeTheModal);

function closeTheModal() {
    
    // closing the modal by removing show class we did this to be smooth
    modal.classList.remove("show");
}

// pic the title
var title = document.getElementById("page-title");

// make header like Typing
var textHeader = "Find Your Dream Home.";
// declear the index to update it later
var i = 0;
// declear the speed of typing
var speed = 80;

// onpage load call the typeingEffect
window.addEventListener("load",typeingEffect);

function typeingEffect() {
    if(i < textHeader.length) {
        
        title.innerHTML += textHeader.charAt(i);
        i++;
        setTimeout(typeingEffect,speed);

    }
}

// end landing 

// start darkmode

// pic the body 
var bodyElem = document.getElementById("body");

// pic the darkicon
var darkIcon = document.querySelector(".darkIcon");

// when darkicon cliked
darkIcon.addEventListener("click",dark);

// to check if it dark or not
var isDarkMode = false;

function dark() {

    // pic the titles
    var elemntsWithTitle = document.querySelectorAll(".dark");

    // if dark mode off turn it on
    if (!isDarkMode) {

        bodyElem.style.backgroundColor = "black";

        // change the color of title through looping
        for(var i = 0; i < elemntsWithTitle.length; i++) {
            elemntsWithTitle[i].style.color = "white";
        }

        // update the mode to dark
        isDarkMode = true;

    }
    else {

        bodyElem.style.backgroundColor = "white";

        // change the color of title through looping
        for(var i = 0; i < elemntsWithTitle.length; i++) {
            elemntsWithTitle[i].style.color = "black";
        }

        // update the mode to dark
        isDarkMode = false;

    }

}

// end darkmode
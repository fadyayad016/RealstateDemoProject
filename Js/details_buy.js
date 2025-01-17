// Image gallery previous & next buttons
var images = ["../Assets/buying img/2.jpeg", "../Assets/buying img/3.jpeg", "../Assets/buying img/4.jpeg", "../Assets/buying img/5.jpeg",
    "../Assets/buying img/6.jpeg", "../Assets/buying img/7.jpeg", "../Assets/buying img/8.jpeg", "../Assets/buying img/9.jpeg",
    "../Assets/buying img/10.jpeg", "../Assets/buying img/11.jpeg", "../Assets/buying img/12.jpeg"];
var currentImageIndex = 0;

var propertyImage = document.getElementById("propertyImage");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    propertyImage.src = images[currentImageIndex];
});

nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    propertyImage.src = images[currentImageIndex];
});


//clicking in the gallery opens the image in a modal
var galleryImages = document.querySelectorAll(".gallery img");
var modal = document.getElementById("modal");
var modalImage = document.getElementById("modalImage");
var modalClose = document.getElementById("modalClose");

galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImage.src = img.src;
    });
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// Save button 
var saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", () => {
    var propertyDetails = {
        title: "Luxury Duplex for sale in London",
        price: "$18,348,300",
        location: "London, United Kingdom",
    };
    // console.log(JSON.stringify(propertyDetails));
    localStorage.setItem("savedProperty", JSON.stringify(propertyDetails));
    alert("Apartment saved successfully!");
});

//default email client
var emailButton = document.getElementById("emailButton");

emailButton.addEventListener("click", () => {
    var recipient = "example@example.com";
    var subject = encodeURIComponent("Inquiry about Luxury Apartment");
    var body = encodeURIComponent(
        "Hello,\n\nI am interested in the Luxury Duplex apartment. Please provide me with more information.\n\nThank you!"
    );
    // location.href: Changes the current browser location.
    // mailto:: A URL scheme used to open the user's default email client with prefilled details.
    location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});


// open WhatsApp
var whatsappButton = document.getElementById("whatsappButton");

whatsappButton.addEventListener("click", () => {
    var phoneNumber = "1234567890";
    var message = encodeURIComponent(
        "Hello, I am interested in the Luxury Duplex apartment. Can you provide me with more details?"
    );

    open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
});


//Review Functionality
var reviewsContainer = document.getElementById("reviews");
var reviewInput = document.getElementById("reviewInput");
var addReviewButton = document.getElementById("addReview");

addReviewButton.addEventListener("click", () => {
    var reviewText = reviewInput.value.trim();

    if (reviewText === "") {
        alert("Please write a review before submitting!");
        return;
    }

    // Create a new review element
    var reviewElement = document.createElement("div");
    reviewElement.className = "review";
    reviewElement.textContent = reviewText;

    // Append to the reviews container
    reviewsContainer.appendChild(reviewElement);

    // Clear the input field
    reviewInput.value = "";
});




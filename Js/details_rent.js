// Gallery Modal
const gallery = document.getElementById("gallery");
const galleryImages = document.querySelectorAll(".gallery img");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = image.src;
    currentIndex = index;
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// Reviews
const reviews = [];
const reviewsContainer = document.getElementById("reviews");
const reviewInput = document.getElementById("reviewInput");
const addReviewButton = document.getElementById("addReview");

addReviewButton.addEventListener("click", () => {
  const reviewText = reviewInput.value.trim();
  if (reviewText) {
    reviews.push(reviewText);
    reviewInput.value = "";
    displayReviews();
  }
});

function displayReviews() {
  reviewsContainer.innerHTML = "";
  reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    reviewElement.textContent = review;
    reviewsContainer.appendChild(reviewElement);
  });
}

// Similar Properties
const similarProperties = [
  {
    img: "../Assets/test1.webp",
    title: "Modern Apartment",
    price: "EGP 5,900,000",
    desc: "2 Beds, 2 Baths, 110 Sq. M",
  },
  {
    img: "../Assets/test2.webp",
    title: "Luxury Condo",
    price: "EGP 7,200,000",
    desc: "3 Beds, 2 Baths, 130 Sq. M",
  },
  {
    img: "../Assets/test3.webp",
    title: "Cozy Flat",
    price: "EGP 6,500,000",
    desc: "2 Beds, 2 Baths, 120 Sq. M",
  },
];

const similarPropertiesContainer = document.getElementById("similarProperties");

similarProperties.forEach((property) => {
  const propertyCard = document.createElement("div");
  propertyCard.classList.add("property-card");
  propertyCard.innerHTML = `
                <img src="${property.img}" alt="${property.title}">
                <h4>${property.title}</h4>
                <p>${property.price}</p>
                <p>${property.desc}</p>
            `;
  similarPropertiesContainer.appendChild(propertyCard);
});
const inquiryForm = document.querySelector(".inquiry-form");

inquiryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your inquiry. We will contact you soon.");
  inquiryForm.reset();
});

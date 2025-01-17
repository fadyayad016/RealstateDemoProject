var conversionRate = 50; //  1 دولار = 50 جنيه
    var isUSD = false;
    var properties = [
      { id: 1, Description: "Luxury Apartment in the heart of Maadi", price: 2000000, location: "Maadi, Cairo", image: "../Assets/Luxury Apartment in Maadi.jpg" },
      { id: 2, Description: "Modern Villa in the 6th of October City ", price: 5000000, location: "6th of October City, Giza", image: "../Assets/Charming Villa in 6th of October.jpg" },
      { id: 3, Description: "Cozy House located in peaceful Zamalek  ", price: 800000, location: "Zamalek, Cairo", image: "../Assets/Commercial Shop in Zamalek.jpg" },
      { id: 4, Description: "Commercial Shop in Zamalek in cairo", price: 1300000, location: "Zamalek, Cairo", image: "../Assets/Elegant Villa in New Cairo.jpg" },
      { id: 5, Description: "Elegant Villa located in the New Cairo", price: 1000000, location: "New Cairo, Cairo", image: "../Assets/Commercial Shop in Zamalek.jpg" },
      { id: 6, Description: "Cozy Apartment located in Heliopolis", price: 1100000, location: "Heliopolis, Cairo", image: "../Assets/Cozy Apartment in Heliopolis.jpg" },
      { id: 7, Description: "Cozy Studio located in Downtown Cairo", price: 1300000, location: "Downtown Cairo, Cairo", image: "../Assets/Cozy Studio in Downtown Cairo.jpg" },
      { id: 8, Description: "Luxury Office located in Heliopolis", price: 2000000, location: "Heliopolis, Cairo", image: "../Assets/Luxury Office in Heliopolis.jpg" },
      { id: 9, Description: "Modern Apartment located in New Cairo", price: 1900000, location: "New Cairo, Cairo", image: "../Assets/Modern Apartment in New Cairo.jpg" },
      { id: 10, Description: "Modern Penthouse located in Mohandessin", price: 1200000, location: "Mohandessin, Giza", image: "../Assets/Modern Penthouse in Mohandessin.jpg" },
      { id: 11, Description: " Modern Penthouse located in Mohandessin", price: 1200000, location: "Mohandessin, Giza", image: "../Assets/Modern Penthouse in Mohandessin.jpg" },
      { id: 12, Description: "Office for Rent located in Downtown Cairo", price: 1100000, location: "Downtown Cairo, Cairo", image: "../Assets/Office for Rent in Downtown Cairo.jpg" },
      { id: 13, Description: "Penthouse with Sea View  in Alexandria", price: 500000, location: "Alexandria, Alexandria Governorate", image: "../Assets/Penthouse with Sea View in Alexandria.jpg" },
      { id: 14, Description: "Charming Villa located in 6th of October", price: 500000, location: "6th of October City, Giza", image: "../Assets/Charming Villa in 6th of October.jpg" },
      { id: 15, Description: "Elegant Villa located in the New Cairo", price: 700000, location: "New Cairo, Cairo", image: "../Assets/Elegant Villa in New Cairo.jpg" },
      { id: 16, Description: "Modern Apartment located in the New Cairo", price: 1900000, location: "New Cairo, Cairo", image: "../Assets/Modern Apartment in New Cairo.jpg" },
      { id: 17, Description: "Cozy Studio located in the Downtown Cairo", price: 4500000, location: "Downtown Cairo, Cairo", image: "../Assets/Cozy Studio in Downtown Cairo.jpg" },
      { id: 18, Description: "Luxury Studio located in the Downtown Cairo", price: 100000, location: "Downtown Cairo, Cairo", image: "../Assets/Modern Penthouse in Mohandessin.jpg" },
      { id: 19, Description: "Apartment Studio located in Downtown Cairo", price: 1600000, location: "Downtown Cairo, Cairo", image: "../Assets/Office for Rent in Downtown Cairo.jpg" },
      { id: 20, Description: "Modern Villa located in the New Cairo", price: 1400000, location: "New Cairo, Cairo", image: "../Assets/Elegant Villa in New Cairo.jpg" }
    ];
    
    function displayProperties(propertiesToShow) {
      var gridContainer = document.getElementById("gridContainer");
      gridContainer.innerHTML = ""; // مسح المحتوى السابق
    
      propertiesToShow.forEach(property => {
          var propertyCard = document.createElement("div");
          propertyCard.classList.add("product-card");
    
          var isFavorite = getFavoriteProperties().some(fav => fav.id === property.id);
    
          propertyCard.innerHTML = `
              <img src="${property.image}" alt="${property.name}"><br>
              <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p><br>
              
              <p> ${property.price.toLocaleString()} ${isUSD ? '$' : 'EGP'} /month</p><br>
    
              <h5> ${property.Description}</h5><br>
              
              <button class="favorite-btn ${isFavorite ? 'favorite' : ''}" onclick="toggleFavorite(${property.id}, this)">
                  ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
          `;
    
          gridContainer.appendChild(propertyCard);
      });
    }


    function toggleFavorite(propertyId, button) {
      var property = properties.find(p => p.id === propertyId);
      var favoriteProperties = getFavoriteProperties();
    
      if (favoriteProperties.some(fav => fav.id === propertyId)) {
          // إزالة من المفضلة
          favoriteProperties = favoriteProperties.filter(fav => fav.id !== propertyId);
          button.textContent = "Add to Favorites"; // تغيير النص عند الإزالة
          button.classList.remove('favorite'); // إزالة الفئة المفضلة
          alert(`${property.name} has been removed from favorites!`); // تنبيه عند الإزالة
      } else {
          // إضافة إلى المفضلة
          favoriteProperties.push(property);
          button.textContent = "Remove from Favorites"; // تغيير النص عند الإضافة
          button.classList.add('favorite'); // إضافة الفئة المفضلة
          alert(`${property.name} has been added to favorites!`); // تنبيه عند الإضافة
      }
    
      saveFavoriteProperties(favoriteProperties);
    }
    
    document.addEventListener("DOMContentLoaded", function() {
      displayProperties(properties);
    });



// استرجاع المفضلات من localStorage
function getFavoriteProperties() {
  return JSON.parse(localStorage.getItem('favoriteProperties')) || [];
}

function saveFavoriteProperties(favorites) {
  localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
}


// وظائف أخرى (الفلترة والتبديل بين العملة)
function filterByPrice() {
  var filterValue = document.getElementById("priceFilter").value;

  var filteredProperties = properties.filter(property => {
    if (filterValue === "more-1") {
      return property.price > 1000000; // أكثر من مليون
    } else if (filterValue === "less-1") {
      return property.price <= 1000000; // أقل من أو يساوي مليون
    }
    return true; // الخيار "الكل"
  });

  displayProperties(filteredProperties);
}


document.addEventListener("DOMContentLoaded", () => {
  displayProperties(properties); // عرض العقارات عند تحميل الصفحة

 var usdButton = document.querySelector(".usd");
  usdButton.addEventListener("click", toggleCurrency);

  var priceFilter = document.getElementById("priceFilter");
  priceFilter.addEventListener("change", filterByPrice);
});



function convertToUSD() {
  var usdButton = document.querySelector(".usd");
  usdButton.addEventListener("click", toggleCurrency);

  isUSD = true; // تحويل للعملة USD
  var convertedProperties = properties.map(property => ({
    ...property,
    price: (property.price / conversionRate).toFixed(2),
    currency: "USD"
  }));

  displayProperties(convertedProperties);
}

function convertToEGP() {
  isUSD = false; // تحويل للعملة EGP
  
  var convertedProperties = properties.map(property => ({
    ...property,
    price: (property.price * conversionRate).toFixed(0),
    currency: "EGP"
  }));

  displayProperties(convertedProperties);
}

function toggleCurrency() {
  if (isUSD) {
    convertToEGP();
  } else {
    convertToUSD();
  }
}


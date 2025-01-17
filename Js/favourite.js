// عرض العقارات المفضلة

    function displayFavoriteProperties() {
        var favoriteProperties = getFavoriteProperties();
        var gridContainer = document.getElementById("gridContainer");
    
        if (favoriteProperties.length === 0) {
            gridContainer.innerHTML = '<p class="no-favorites">No Favorite Properties</p>';
        } else {
            gridContainer.innerHTML = ""; // مسح المحتوى القديم
            favoriteProperties.forEach(property => {
                var propertyCard = document.createElement("div");
                propertyCard.classList.add("product-card");
                
                propertyCard.innerHTML = `
                    <img src="${property.image}" alt="${property.name}"><br>
                    <h3>${property.location}</h3><br>
                    <p> ${convertPrice(property.price).toLocaleString()} ${isUSD ? '$' : 'EGP'}/month</p><br>
                    <h5>${property.Description}</h5><br>
                    <button class="favorite-btn" onclick="removeFromFavorites(${property.id})">
                        Remove from Favorites
                    </button>
                `;
            
                gridContainer.appendChild(propertyCard);
            });
        }
    }
    
    // الحصول على العقارات المفضلة من الـ localStorage
function getFavoriteProperties() {
    return JSON.parse(localStorage.getItem('favoriteProperties')) || [];
}

// إزالة العقار من المفضلة
function removeFromFavorites(propertyId) {
    var favoriteProperties = getFavoriteProperties();
    favoriteProperties = favoriteProperties.filter(property => property.id !== propertyId);
    localStorage.setItem('favoriteProperties', JSON.stringify(favoriteProperties));
    displayFavoriteProperties();  // تحديث عرض المفضلة
}


var conversionRate = 50; //  1 دولار = 30 جنيه
    var isUSD = false;
    

// دالة لتحويل السعر إلى الدولار الأمريكي إذا كانت العملة هي الدولار


function convertPrice(price) {
    if (isUSD) {
        return price / conversionRate;  // تحويل السعر إلى الدولار
    }
    return price;  // العودة بالجنيه المصري إذا كانت العملة هي الجنيه
}

// دالة لتبديل العملة بين الجنيه والدولار
function toggleCurrency() {
    isUSD = !isUSD;
    displayFavoriteProperties();  // تحديث عرض المفضلة بعد تغيير العملة
}

// تصفية العقارات المفضلة حسب السعر
function filterFavoritePropertiesByPrice() {
    var filterValue = document.getElementById("priceFilter").value;
    var favoriteProperties = getFavoriteProperties();
    var filteredProperties = favoriteProperties.filter(property => {
        if (filterValue === "more-1") {
            return property.price > 1000000;  // أكثر من مليون
        } else if (filterValue === "less-1") {
            return property.price <= 1000000;  // أقل من أو يساوي مليون
        }
        return true;  // الخيار "الكل"
    });

    displayFilteredFavoriteProperties(filteredProperties);
}

// عرض العقارات المفضلة بعد تصفيتها
function displayFilteredFavoriteProperties(filteredProperties) {
    var gridContainer = document.getElementById("gridContainer");
    gridContainer.innerHTML = "";  // مسح المحتوى القديم

    if (filteredProperties.length === 0) {
        gridContainer.innerHTML = '<p class="no-favorites">No Favorite Properties</p>';
    } else {
        filteredProperties.forEach(property => {
            var propertyCard = document.createElement("div");
            propertyCard.classList.add("product-card");

            propertyCard.innerHTML = `
                <img src="${property.image}" alt="${property.name}"><br>
                <h3>${property.location}</h3><br>
                <p> ${convertPrice(property.price).toLocaleString()} ${isUSD ? 'USD' : 'EGP'}</p><br>
                <h5>${property.Description}</h5><br>
                <button class="favorite-btn" onclick="removeFromFavorites(${property.id})">
                    Remove from Favorites
                </button>
            `;
        
            gridContainer.appendChild(propertyCard);
        });
    }
}

// استدعاء الدالة لعرض العقارات المفضلة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    displayFavoriteProperties();  // عرض العقارات المفضلة عند تحميل الصفحة

    var usdButton = document.querySelector(".usd");
    usdButton.addEventListener("click", toggleCurrency);  // تغيير العملة عند الضغط على الزر

    var priceFilter = document.getElementById("priceFilter");
    priceFilter.addEventListener("change", filterFavoritePropertiesByPrice);  // تصفية العقارات المفضلة حسب السعر
});

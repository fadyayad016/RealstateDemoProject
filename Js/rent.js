document.addEventListener('DOMContentLoaded', function () {
    var xhttp = new XMLHttpRequest();
    var data = []; // Declare a variable to store the fetched data
    var exchangeRate = 50; // 1 USD = 50 EGP
    var currentCurrency = 'EGP'; // Default currency is EGP


    // Open a GET request to fetch data from the JSON file
    xhttp.open("GET", "../Js/rentdata.json", true);

    // Send the request
    xhttp.send();


    // Function to handle the response when data is fetched
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Parse the JSON data
            data = JSON.parse(this.responseText);
            displayItems(data); // Display the items initially



            // Attach the price filter event listener after data is fetched
            document.getElementById('priceFilter').addEventListener('change', function (e) {
                var selectedPrice = e.target.value;
                displayItems(data, selectedPrice, currentCurrency); // Pass the fetched data for filtering
            });





            // Attach event listener for the currency toggle button (USD button)
            document.querySelector('.usd').addEventListener('click', function () {
                // Reset filter to "all" when currency is changed
                var defaultFilter = "all";
                // Toggle currency between EGP and USD
                currentCurrency = currentCurrency === 'EGP' ? 'USD' : 'EGP';

                // Re-display items with the updated currency and reset the filter to "all"
                displayItems(data, defaultFilter, currentCurrency);





                // Change filter text when currency is USD
                document.getElementById('priceFilter').options[0].textContent = currentCurrency === 'EGP' ? 'All' : 'All';
                document.getElementById('priceFilter').options[1].textContent = currentCurrency === 'EGP' ? 'More than 2000 EGP' : 'More than 40 USD';
                document.getElementById('priceFilter').options[2].textContent = currentCurrency === 'EGP' ? 'Less than 2000 EGP' : 'Less than 40 USD';

                // Set the filter value to "all" after currency change
                document.getElementById('priceFilter').value = defaultFilter;


            });

        } else if (this.readyState === 4) {
            console.error('Error fetching data:', this.status, this.statusText);
        }


    };


    function getCurrencyFormattedPrice(rentPrice, currency) {
        if (currency === "USD") {
            return `USD-${(rentPrice / exchangeRate).toFixed(2)}/month`;
        }
        return `EGP-${rentPrice}/month`;
    }

    function displayItems(data, filterPrice = "all", currency = "EGP") {
        // Clear previous items
        var rowData = document.getElementById('rowData');
        var listingTemplate = rowData.querySelector('.listing-item'); // Get the template listing item

        rowData.innerHTML = '';  // Clear previous items, but keep the template

        let noResultsFound = true;  // Flag to check if no results match the filter

        for (var i = 0; i < data.length; i++) {
            var imageUrl = data[i].rentimage;
            var rentPrice = data[i].rent;
            var address = data[i].address;
            var rentPriceText = getCurrencyFormattedPrice(rentPrice, currency);
            var description = data[i].description;

            // Adjust the filtering based on currency
            if (currency === "USD") {
                // Filter logic for USD currency
                if (filterPrice === "more" && rentPrice < 40 * exchangeRate) { // 40 USD = 40 * exchangeRate (EGP)
                    continue;
                } else if (filterPrice === "less" && rentPrice >= 40 * exchangeRate) {
                    continue;
                }
            } else {
                // Filter logic for EGP currency
                if (filterPrice === "more" && rentPrice < 2000) {
                    continue;
                } else if (filterPrice === "less" && rentPrice >= 2000) {
                    continue;
                }
            }

            // Set the flag to false as we have found at least one matching result
            noResultsFound = false;

            // Modify the existing template
            listingTemplate.querySelector('.listing-image').src = imageUrl;
            listingTemplate.querySelector('.listing-address').textContent = address;
            listingTemplate.querySelector('.rent-price').textContent = rentPriceText;
            listingTemplate.querySelector('.description').textContent = description;

            var button = listingTemplate.querySelector('.view-more-button');
            button.setAttribute('data-index', i); // Set the index dynamically

            // Add an event listener to the "View Details" button
            button.addEventListener('click', function (e) {
                var index = e.target.getAttribute('data-index'); // Get the index from the clicked button's data-index
                index = Number(index) + 1; // Increment the index
                window.location.href = `../HTML/view_deatils_rent.html?index=${index}`; // Navigate to the page with the updated index
            });

            // Make the template visible and append it to the container
            rowData.appendChild(listingTemplate);

            listingTemplate = listingTemplate.cloneNode(true); // Clone it so it remains available for the next iteration
        }

        // Display a message if no results found
        if (noResultsFound) {
            rowData.innerHTML = 'No results found matching the filter.';
        }
    }



});






document.addEventListener("DOMContentLoaded", () => {
    var sponsorContents = document.querySelectorAll(".sponsor-content");

    sponsorContents.forEach((content) => {

        var imgs = content.getAttribute("data-imgs").split(",");
        var urls = content.getAttribute("data-urls").split(",");




        var imgElement = content.querySelector("img");
        var linkElement = content.querySelector("a");




        let currentIndex = 0;

        setInterval(() => {
            if (currentIndex + 1 >= imgs.length) {
                currentIndex = 0; // Reset to the beginning
            } else {
                currentIndex++;
            }

            imgElement.src = imgs[currentIndex];
            linkElement.href = urls[currentIndex];
        }, 5000); // Change every 5 seconds
    });
});



function addSponsor(event) {
    event.preventDefault();

    var fileInput = document.getElementById('imgUpload');
    var altText = document.getElementById('altText').value;
    var desc = document.getElementById('desc').value;
    var link = document.getElementById('link').value;
    var sponsorContainer = document.querySelector('.sponsor-aside');

    // Validate image upload
    if (!fileInput.files[0]) {
        alert('Please upload an image.');
        return;
    }

    // Read the uploaded image file
    var reader = new FileReader();
    reader.onload = function (e) {
        // Clone the first sponsor-conte    nt element as a template
        var existingSponsor = document.querySelector('.sponsor-content');
        if (!existingSponsor) {
            alert('No sponsor content to clone.');
            return;
        }

        var newSponsor = existingSponsor.cloneNode(true);

        // Update the cloned sponsor content
        var img = newSponsor.querySelector('img');
        img.src = e.target.result;
        img.alt = altText;

        var paragraph = newSponsor.querySelector('p');
        paragraph.textContent = desc;

        var anchor = newSponsor.querySelector('a');
        anchor.href = link;

        // Prepend the updated sponsor-content to the sponsorContainer (add to the top)
        sponsorContainer.prepend(newSponsor);
    };

    // Read the uploaded image as a Data URL
    reader.readAsDataURL(fileInput.files[0]);


}



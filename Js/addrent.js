document.getElementById('rentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var formData = new FormData(this);

    // Create a new data object
    var newRentData = {
        rentimage: URL.createObjectURL(formData.get('rentImage')), // For demo: creating a temporary URL for the image
        rent: formData.get('tenantName'),
        address: formData.get('propertyAddress'),
        description: formData.get('description')
    };

    // Fetch the current data from the rentdata.json file
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../Js/rentdata.json', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var existingData = JSON.parse(xhr.responseText);
            existingData.push(newRentData); // Add new data to the existing array

            window.location.href = '../HTML/rent.html';

            
            var saveXhr = new XMLHttpRequest();
            saveXhr.open('POST', '../Js/rentdata.json', true);
            saveXhr.setRequestHeader('Content-Type', 'application/json');
            saveXhr.onreadystatechange = function() {
                if (saveXhr.readyState === 4 && saveXhr.status === 200) {
                    console.log('Data added successfully');
                }
            };
            saveXhr.send(JSON.stringify(existingData)); // Send the updated array as JSON
        }
    };
    xhr.send();
});

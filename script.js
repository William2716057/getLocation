document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('locateBtn').addEventListener('click', function () {
        getLocation();
    });
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("output").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the map container and initialize the map
    document.getElementById('map').style.display = 'block';
    var map = L.map('map').setView([latitude, longitude], 13);

    // Load and display tile layer on the map (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker to the map at the user's location
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('You are here.')
        .openPopup();

    document.getElementById("output").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("output").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("output").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("output").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("output").innerHTML = "An unknown error occurred.";
            break;
    }
}
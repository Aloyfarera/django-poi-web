var mymap = L.map('_map_container').setView([-2.2150, 118.7913], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(mymap);

function getIconUrl(chainId) {
    return '/static/img/chain_logo/' +'logo_'+ chainId+ '.svg';
}

let apiBaseUrl = 'http://127.0.0.1:8000/api/locations';
let fetchUrl;

if (curentB_category) {
    fetchUrl = `${apiBaseUrl}/b_category/${curentB_category}`;
} else if (currentChainId) {
    fetchUrl = `${apiBaseUrl}/chain/${currentChainId}`;
} else {
    fetchUrl = apiBaseUrl;
}

fetch(fetchUrl)
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(apiResponse => {
    // Process the apiResponse here, e.g., create markers on a map
    apiResponse.forEach(function(location) {
        var iconUrl = getIconUrl(location.chain_id);
        var customIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [38, 95], // Size of the icon
            popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
    });

    // Create a marker with the custom icon
    var marker = L.marker([location.lat, location.lon], {icon: customIcon}).addTo(mymap);
    
    // Bind a popup to the marker with some location details
    marker.bindPopup("<b>" + location.chain_id.split("_")[location.chain_id.split("_").length - 1].toUpperCase() + "</b> " + "<b>" + location.store_name + "</b><br>" + location.address);
    });
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});
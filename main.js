const API_KEY = '9c095da267384cf0a9fccc8c7cb83ec5&ip';

const ipAddressField = document.querySelector('.ip-address')
const timezoneInput = document.querySelector('.Timezone')
const countryLocationInput = document.querySelector('.Location')
const ispInput = document.querySelector('.isp')
const form = document.querySelector('.ip-input')
var markerIcon = L.icon({
    iconUrl: 'images/Fa-Team-Fontawesome-FontAwesome-Location-Dot.512.png',

    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
  })
let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}=`
let ipAddress
let timeZone
let countryLocation
let cityLocation
let postalCode
let isp
let lat
let lng


// map
var map = L.map('map').setView([0,0],1)
var marker;
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const fetchIpAdress = async (randomIp = "") => {
    console.log(randomIp);
    
    try {
        const response = await axios.get(url + randomIp);
        const data = response.data;
        console.log(data);
        ipAddress = data.ip;
        timeZone = data.time_zone.name;
        countryLocation = data.country_name;
        cityLocation = data.city;
        postalCode = data.zipcode;
        isp = data.isp.split(" ").pop();
        lat = data.latitude;
        lng = data.longitude;

        ipAddressField.innerHTML = ipAddress;
        countryLocationInput.innerHTML = countryLocation + ", " + cityLocation + " " + postalCode;
        timezoneInput.innerHTML = timeZone;
        ispInput.innerHTML = isp;

        // Update map view
        map.setView([lat, lng], 18);

        // Remove the previous marker if it exists
        if (marker) {
            marker.remove();
        }

        // Add a new marker
        marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
    } catch (error) {
        console.log(error.message);
        alert("Invalid IP address");
    }
};

fetchIpAdress()

form.onsubmit = (e)=>{
    e.preventDefault()
    if(e.target.text.value.trim() == ""){
        alert("Please Enter Valid Data")
        return
    }
    console.log("sent!");
    
    fetchIpAdress(e.target.text.value)
}
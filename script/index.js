let ipAddress, loc, timezone, isp, lat, lng, mymap;
const resultArea = document.querySelector(".result-area");
const ipArea = document.querySelector("#ip-add");
const locArea = document.querySelector("#loc");
const tzArea = document.querySelector("#tz");
const ispArea = document.querySelector("#isp");
const form = document.querySelector("form");
let ipEntry = document.querySelector("#ip-entry");

const populate = (a, b, c, d) => {
  a.textContent = ipAddress;
  b.textContent = loc;
  c.textContent = timezone;
  d.textContent = isp;
  ipArea.append(a);
  locArea.append(b);
  tzArea.append(c);
  ispArea.append(d);
};

const reset = (a, b, c, d, e, f) => {
  a.textContent = "";
  b.textContent = "";
  c.textContent = "";
  d.textContent = "";
  e.textContent = "";
  f.textContent = "";
};

mymap = L.map("mapid").setView([32.2492, 34.8419], 11);

const getIp = async (ip) => {
  const res = await axios.get(
    `https://geo.ipify.org/api/v1?apiKey=at_V3May5MNSZszx9uMLaFyA2M8r0eQp&ipAddress=${ip}`
  );
  ipAddress = res.data.ip;
  loc = `${res.data.location.city}, ${res.data.location.region} ${res.data.location.postalCode}`;
  timezone = `UTC ${res.data.location.timezone}`;
  isp = res.data.isp;
  lat = res.data.location.lat;
  lng = res.data.location.lng;
  populate(ipAddress, loc, timezone, isp);
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      center: [lat, lng],
      accessToken:
        "pk.eyJ1Ijoic2FnaXR3aWciLCJhIjoiY2tpNzdyZjBhMDl2ejJycDJsMXg0Nnc0NyJ9.I2erlDtS2QRMYMhA_hytBQ",
    }
  ).addTo(mymap);
  var marker = L.marker([lat, lng]).addTo(mymap);
  marker.bindPopup(ipAddress).openPopup();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getIp(ipEntry.value);
  reset(ipArea, locArea, tzArea, ispArea, lat, lng);
});


const globalMap = L.map("hxMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(globalMap);

getData();

async function getData() {

  const response = await fetch("/api");
  const data = await response.json();
 
  for (item of data) {
    
     const marker = L.marker([item.lat, item.lon]).addTo(globalMap);
    
    let txt = `Latitude: ${item.lat}&deg;,
    Longitutde: ${item.lon}&deg;`

    marker.bindPopup(txt);
  }
}
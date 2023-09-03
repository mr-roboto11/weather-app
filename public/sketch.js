let lat, lon;
if ('geolocation' in navigator) {
  console.log('Loading...');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      
	  weather = json.weather;	  
      
      document.getElementById('summary').textContent = weather.weather.main;
      document.getElementById('description').textContent = weather.weather.description;
      document.getElementById('city').textContent = weather.name;
      document.getElementById('country').textContent = weather.sys.country;
      document.getElementById('temp').textContent = weather.main.temp;
      document.getElementById('feels_like').textContent = weather.main.feels_like;
      document.getElementById('temp_max').textContent = weather.main.temp_max;
      document.getElementById('temp_min').textContent = weather.main.temp_min;
      document.getElementById('humidity').textContent = weather.main.humidity;
      document.getElementById('wind-speed').textContent = weather.wind.speed;

      startClock()
      async function startClock() {
       setInterval(getTime, 1000);
       function getTime() {
 
      const dateString = new Date().toLocaleString();
      date = dateString;
      document.getElementById('date').textContent = date;
       }
  }   
     

    } catch (err) {
      console.error(err);
      weather.wind.speed = { value: -1 };
      document.getElementById('aq-value').textContent = 'NO READING';
    }

    
    const data = { lat, lon, weather };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify(data)
    };
    
	const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);
	
  });
  
} 
else {
  console.log('Location Unavailable');
}
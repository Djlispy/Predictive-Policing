async function fetchWeather() {
    const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/san%20francisco?unitGroup=us&key=AXMQD7FALEXQKPYWXCMGHFCMA&contentType=json';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Parse and display the 10-day forecast data
        const forecastData = data.days.slice(0, 10);

        const tableBody = document.getElementById('weatherTableBody');

        forecastData.forEach((day, index) => {
            const row = document.createElement('tr');
            row.id = `weatherRow${index}`;
        
            // Format the date based on user's time zone (San Francisco)
            const date = new Date(day.datetimeEpoch * 1000);
            let formattedDate;
        
            if (index === 0) {
                // Display "Today" for the first day
                formattedDate = 'Today';
            } else {
                formattedDate = getDayOfWeek(date.getDay()); // Only include the day of the week
            }

            // Get weather icon based on conditions
            const icon = getWeatherIcon(day.icon);

            // Round temperatures
            const minTemp = Math.round(day.tempmin);
            const maxTemp = Math.round(day.tempmax);

            // Calculate normalized positions and adjusted width
            const weekMinTemp = Math.min(...forecastData.map(d => d.tempmin));
            const weekMaxTemp = Math.max(...forecastData.map(d => d.tempmax));
            const normalizedMinPos = ((minTemp - weekMinTemp) / (weekMaxTemp - weekMinTemp)) * 100;
            const normalizedMaxPos = ((maxTemp - weekMinTemp) / (weekMaxTemp - weekMinTemp)) * 100;
            const adjustedBarWidth = normalizedMaxPos - normalizedMinPos;

            // Calculate color based on temperature using linear interpolation (lerp)
            const gradientColor = lerpColor(minTemp, [
                { temp: 20, color: '#40aefd' },
                { temp: 30, color: '#4fb9fb' },
                { temp: 40, color: '#5ad0e5' },
                { temp: 52, color: '#91cda8' },
                { temp: 60, color: '#acc75f' }, // Custom color for around 60 degrees
                { temp: 65, color: '#b2cc92' },
                { temp: 79, color: '#f69700' },
            ]);

            row.innerHTML = `<td class="weather-td">${formattedDate}</td>
                             <td class="weather-td"><img src="${icon}" alt="${day.conditions}" class="weather-icon"></td>
                             <td class="weather-td">
                                <div class="weather-temp-label">
                                    <span class="weather-min-temp">${minTemp}°</span>
                                    <div class="weather-temp-bar" id="tempBar${index}">
                                        <div class="weather-temp-indicator" style="left: ${normalizedMinPos}%; width: ${adjustedBarWidth}%; background: ${gradientColor};"></div>
                                    </div>
                                    <span class="weather-max-temp">${maxTemp}°</span>
                                </div>
                             </td>`;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Helper function to calculate linear interpolation (lerp) between colors
function lerpColor(temperature, colorStops) {
    for (let i = 1; i < colorStops.length; i++) {
        const prevStop = colorStops[i - 1];
        const currentStop = colorStops[i];

        if (temperature <= currentStop.temp) {
            const t = (temperature - prevStop.temp) / (currentStop.temp - prevStop.temp);
            return interpolateColor(prevStop.color, currentStop.color, t);
        }
    }

    // If temperature exceeds the last color stop, return the color of the last stop
    return colorStops[colorStops.length - 1].color;
}

// Helper function to interpolate color between two colors
function interpolateColor(color1, color2, t) {
    const hex1 = color1.substring(1); // Remove #
    const hex2 = color2.substring(1);

    const rgb1 = parseInt(hex1, 16);
    const r1 = (rgb1 >> 16) & 255;
    const g1 = (rgb1 >> 8) & 255;
    const b1 = rgb1 & 255;

    const rgb2 = parseInt(hex2, 16);
    const r2 = (rgb2 >> 16) & 255;
    const g2 = (rgb2 >> 8) & 255;
    const b2 = rgb2 & 255;

    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);

    return `rgb(${r}, ${g}, ${b})`;
}

// Helper function to get the day of the week
function getDayOfWeek(day) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[day];
}

// Helper function to get weather icon based on conditions
function getWeatherIcon(iconName) {
    const iconMapping = {
        'clear-day': '../static/images/sun.png',
        'clear-night': '../static/images/moon.png',
        'partly-cloudy-day': '../static/images/partly-cloudy-day.png',
        'partly-cloudy-night': '../static/images/partly-cloudy-night.png',
        'cloudy': '../static/images/cloudy.png',
        'rain': '../static/images/rain.png',
        'snow': '../static/images/snow.png',
        'sleet': '../static/images/sleet.png',
        'wind': '../static/images/wind.png',
        'fog': '../static/images/fog.png'
    };

    return iconMapping[iconName] || 'default.png';
}

// Fetch weather data on page load
window.onload = fetchWeather;

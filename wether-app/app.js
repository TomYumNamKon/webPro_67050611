const apiKey = '47f46f47f79a40b399c43041261409';
const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherResult = document.getElementById('weatherResult');

const currentTemp = document.getElementById('currentTemp');
const currentLocation = document.getElementById('currentLocation');
const currentDesc = document.getElementById('currentDesc');
const currentWeatherIcon = document.getElementById('currentWeatherIcon');
const currentHumidity = document.getElementById('currentHumidity');
const currentWind = document.getElementById('currentWind');
const currentPressure = document.getElementById('currentPressure');
const forecastGrid = document.getElementById('forecastGrid');
const chartColumns = document.getElementById('chartColumns');
const chartXAxis = document.getElementById('chartXAxis');

async function fetchWeather(city) {
  const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&lang=th`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok || data.error) {
      const msg = data.error ? data.error.message : `HTTP ${response.status}`;
      throw new Error(msg);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

function displayWeather(data) {
  const temp = Math.round(data.current.temp_c);
  const humidity = data.current.humidity;
  const wind = (data.current.wind_kph / 3.6).toFixed(1);
  const locationName = `${data.location.name}, ${data.location.country}`;
  const desc = data.current.condition.text;
  
  let iconUrl = data.current.condition.icon;
  if (iconUrl.startsWith('//')) {
    iconUrl = 'https:' + iconUrl;
  }

  currentTemp.textContent = `${temp}°C`;
  currentLocation.textContent = locationName;
  currentDesc.textContent = desc;
  currentHumidity.textContent = `${humidity}%`;
  currentWind.textContent = `${wind} m/s`;
  currentPressure.textContent = `${Math.round(data.current.pressure_mb)} hPa`;
  currentWeatherIcon.innerHTML = `<img src="${iconUrl}" alt="${desc}">`;

  let forecastDays = [];
  if (data.forecast) {
    if (data.forecast.forecastday) {
      forecastDays = data.forecast.forecastday;
    }
  }

  const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

  forecastGrid.innerHTML = '';
  chartColumns.innerHTML = '';
  chartXAxis.innerHTML = '';

  for (let i = 0; i < forecastDays.length; i++) {
    const item = forecastDays[i];
    const date = new Date(item.date + 'T00:00:00');
    let dayName = dayNames[date.getDay()];

    if (i === 0) {
      dayName = 'วันนี้';
    } else if (i === 1) {
      dayName = 'พรุ่งนี้';
    }

    let dayIcon = item.day.condition.icon;
    if (dayIcon.startsWith('//')) {
      dayIcon = 'https:' + dayIcon;
    }

    const maxTemp = Math.round(item.day.maxtemp_c);
    const minTemp = Math.round(item.day.mintemp_c);

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <div class="forecast-icon">
        <img src="${dayIcon}" alt="${item.day.condition.text}">
      </div>
      <div class="forecast-temp-max">${maxTemp}°C</div>
      <div class="forecast-temp-min">${minTemp}°C</div>
    `;
    forecastGrid.appendChild(card);

    const maxPercent = Math.max(8, Math.min(100, (maxTemp / 40) * 100));
    const minPercent = Math.max(6, Math.min(100, (minTemp / 40) * 100));

    const col = document.createElement('div');
    col.className = 'chart-column';
    col.innerHTML = `
      <div class="chart-bar max" style="height: ${maxPercent}%;" title="สูงสุด: ${maxTemp}°C"></div>
      <div class="chart-bar min" style="height: ${minPercent}%;" title="ต่ำสุด: ${minTemp}°C"></div>
    `;
    chartColumns.appendChild(col);

    const xLabel = document.createElement('div');
    xLabel.textContent = dayName;
    chartXAxis.appendChild(xLabel);
  }

  weatherResult.classList.remove('hidden');
}

async function loadWeatherData(city) {
  if (!city || city.trim() === '') {
    errorDiv.textContent = 'กรุณากรอกชื่อเมืองก่อนทำการค้นหา';
    errorDiv.classList.remove('hidden');
    return;
  }

  try {
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    weatherResult.classList.add('hidden');

    const data = await fetchWeather(city);
    displayWeather(data);
  } catch (error) {
    errorDiv.textContent = 'เกิดข้อผิดพลาด: ' + error.message;
    errorDiv.classList.remove('hidden');
  } finally {
    loadingDiv.classList.add('hidden');
  }
}

searchBtn.addEventListener('click', () => {
  loadWeatherData(cityInput.value);
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    loadWeatherData(cityInput.value);
  }
});

loadWeatherData('Bangkok');

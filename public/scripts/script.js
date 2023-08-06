//API key:
//AIzaSyAKTGqOA1fOsJ_fswrc9t-B-3uYa6PuNkA
// https://api.openweathermap.org/data/2.5/weather?q=Caloocan,ph&appid=f8871b8504d5869f4faa37788c1163cd

/* navigator.geolocation.getCurrentPosition(position => {

}) */



const navMenu = document.querySelectorAll('[data-navMenu]');
const overlay = document.querySelector('body > .overlay');
const menuBtn = document.querySelector('body .containerMenu');
function myFunction(x) {
  x.classList.toggle("change");
  overlay.classList.toggle('hidden')
  navMenu.forEach(nav => {
    nav.classList.toggle('active');
  })
};

window.addEventListener('click', (e) => {
  if (e.target == overlay) {
    menuBtn.classList.toggle('change');
    overlay.classList.toggle('hidden');
    navMenu.forEach(nav => {
      nav.classList.toggle('active');
    })

  }

})



window.onload = () => {

  let city = localStorage.getItem('city');
  let country = localStorage.getItem('country');
  let code = localStorage.getItem('code');

  const searchBtn = document.querySelector('[data-search]');
  const gridCon = document.querySelector('.grid-section');
  const loadCon = document.querySelector('.lds-facebook');
  const errorMess = document.querySelector('.wrapper');
  const chartMess = document.querySelector('[data-chart-mess]');


  /* Darkmode functionality */

/* Buttons and Switches */
const darkSwitch = document.querySelector('.darkmodeCon');
const sunIcon = document.querySelector('.fa-sun');
const moonIcon = document.querySelector('.fa-moon');


/* Colors */
const allDarkText = document.querySelectorAll('.text-primaryDark');
const allWhitebG = document.querySelectorAll('.bg-white');
const allGrayText = document.querySelectorAll('.text-gray');


/* Elements */
const body = document.body;
const menuBtn = document.querySelector('.containerMenu');
const navContainer = document.querySelectorAll('[data-navMenu]');
const mainWrapper = document.querySelector('.main-wrapper');
const searchBar = document.querySelector('.searchBar');
const gridSec = document.querySelector('.grid-section');
const userInfoSec = document.querySelector('body .main-infoSec');
const daysList = document.querySelector('.days-list');


let ticksColor = '#000';
let graph;

function myDarkTheme() {
  darkSwitch.classList.toggle('active');
  sunIcon.classList.toggle('erase');
  moonIcon.classList.toggle('erase');
  menuBtn.classList.toggle('active');
  mainWrapper.classList.toggle('dark');
  searchBar.classList.toggle('dark');
  gridSec.classList.toggle('dark');
  userInfoSec.classList.toggle('dark');
  daysList.classList.toggle('dark');

  if (ticksColor == '#000') {
    ticksColor = '#bbb'
  } else {
    ticksColor = '#000'
    localStorage.setItem('darkmode', false);
  }
  

  function themeChanger(elements, currentColor, futureColor) {
    elements.forEach(el => {
      el.classList.toggle(currentColor);
      el.classList.toggle(futureColor);
    })
  }

  themeChanger(allDarkText, 'text-primaryDark', 'text-white');
  themeChanger(allWhitebG, 'bg-white', 'bg-dark');
  themeChanger(allGrayText, 'text-gray', 'text-lightText');
  themeChanger(navContainer, 'bg-secBg', 'dark');
  body.classList.toggle('active');
  info();
}

if (localStorage.getItem('darkmode') == "true") {
  myDarkTheme();
}

darkSwitch.addEventListener('click', () => {
  localStorage.setItem('darkmode', true);
  myDarkTheme()
});



  const months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

  const monthYear = document.querySelector('[data-main-date]');
  const otherInfo = document.querySelector('[data-data-info]');
  /* otherInfo.innerHTML = `${}` */
  

  const date = new Date();
  const fullYear = new Date().getFullYear();
  monthYear.innerHTML = `${months[date.getMonth()]}, ${fullYear}`;
  otherInfo.innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${fullYear}`;

  const chart = document.querySelector('#myChart');
  
  setInterval(() => {
    const date = new Date();
    const currentTime = document.querySelector('[data-time]');
    const sunrise = document.querySelector('[data-sunrise]');
    const sunset = document.querySelector('[data-sunset]');
    /* const sunset = ; */
    const h = date.getHours();
    const m = date.getMinutes();

    let hours = h.toString().length == 1 ?
    '0' + h :  h > 12 ?
    h - 12 :  h;

    let mins = m.toString().length > 1 ? 
    m : '0' + m;
    let referenceTime = h >= 12 ? 'PM' : 'AM';

    const sunriseHours = h > 4 ? `${h - 4} hours ago` : `in ${4 - h} hours`;
    const sunsetHours = h > 17 ? `${h - 17} hours ago` : `in ${17 - h} hours`;;

    sunrise.innerHTML = sunriseHours;
    sunset.innerHTML = sunsetHours;


    currentTime.innerHTML = `${hours}:${mins} ${referenceTime}`; 
  }, 1000);
  
  
  //graph representation
  //wind, humidity, temp, pressure
  
  
  function invokeChart(min, cur, max) {
  
  graph = new Chart(chart, {
    type: 'bar',
    data: {
      labels: ['Minimun Temp.', 'Current Temp.', 'Maximun Temp.'],
      datasets: [{
        fill: 'origin',
        label: 'Temperature',
        data: [min, cur, max],
        tension: 0.4
        /* backgroundColor: '#2F69FE' */
      }]
    },
    options: {
      maintainAspectRatio: false,
      elements: {
        point: {
          pointStyle: 'rect'
        }
      },

      plugins: {
        legend: {
          display: false
        }
      },

      scales: {
        y: {
          ticks: {
            callback: ((context, index) => {
              return Number(context).toFixed(2) + '°C';
            }),
            color: ticksColor
          },
        },
  
        x: {
          ticks: {
            color: ticksColor
          }
        }
      }
    }
  })
  };
  

   
  
  
 // firstLayerValidation();
 searchBar.value = city + " City";
  info();
searchBtn.addEventListener('click', async () => {
        const valueArr = searchBar.value.trim().toLowerCase().split(' ');
        let value = valueArr.filter(value => {
          return value != 'city'
        }).map((item) => {
          return item.charAt(0).toUpperCase() + item.slice(1);

        });

        value = value.join(' ');
 
        localStorage.setItem('city', value);
        city = localStorage.getItem('city');
        firstLayerValidation();
        info();
});

  function firstLayerValidation() {
        loadCon.classList.remove('hide');
        gridCon.classList.add('deac');
        errorMess.classList.remove('active');
  }

  async function info() {
    //Global Variables
    const cityEl = document.querySelector('[data-spCity]');
    const weatherStats = document.querySelector('[data-weather-stats]');
    const countryEl = document.querySelector('[data-country]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');

    try {

      //validation part of input field
      if (!city || (/london( city)?/i.test(city) && /philippines/i.test(country))) {
      loadCon.classList.add('hide');
      errorMess.classList.add('active');
      chartMess.classList.add('active');
      cityEl.innerText = "";
      countryEl.innerText = `Error`;
      weatherStats.innerHTML = 'Not Available';
      if (graph) {
        graph.destroy();
        graph = null;
      }
      return;
      }

      const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=f8871b8504d5869f4faa37788c1163cd&units=metric`);
      const result = await api.json();
      const windSpeed = document.querySelector('[data-wind]');
      const humidityEl = document.querySelector('[data-hum]');
      const feelsLike = document.querySelectorAll('[data-temp]');
      const pressureEl = document.querySelector('[data-pre]');;
      


      const { humidity, feels_like, pressure } = result.main;
      const { temp, temp_max, temp_min } = result.main;
      const { description } = result.weather[0];
      windSpeed.innerHTML = `${result.wind.speed}km/h`;
      humidityEl.innerHTML = `${humidity}%`;
      pressureEl.innerHTML = `${pressure}hPa`;
      feelsLike.forEach(el => {
        el.innerHTML = `${Math.round(feels_like)}℃`;
      })

      weatherIcon.src = './imgs/icons8-partly-cloudy-day-96.png';
      cityEl.innerHTML = `${city} City, `;
      countryEl.innerText = country;
      weatherStats.innerHTML = description;
      
      loadCon.classList.add('hide');
      gridCon.classList.remove('deac');

      //destroy the previous chart
      if (graph) {
        graph.destroy();
        graph = null;
      }
      
      //recreat the chart
      invokeChart(
        Number(temp_min.toFixed(2)), 
        Number(temp.toFixed(2)), 
        Number(temp_max.toFixed(2))
      );
    
    
      

    //to view and to hide errors
     errorMess.classList.remove('active');
     chartMess.classList.remove('active')
     

    } catch(err) {
      //To show different error
        weatherIcon.src = "";
        weatherIcon.alt = "No image to load";
        cityEl.innerHTML = "";
        countryEl.innerHTML = `Error`;
        weatherStats.innerHTML = 'Not Available';
        loadCon.classList.add('hide');
        errorMess.classList.add('active');
        chartMess.classList.add('active');
        gridCon.classList.add('deac');
        if (graph) {
          graph.destroy();
          graph = null;
        }
        console.error(err);
    }
  }
  
  /* Navigation Bar Functionality */
  const navsBtn = document.querySelectorAll('[data-nav]');

  navsBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      function identifier(name) {
        const containers = document.querySelectorAll('[data-container]');
        for (let i = 0; i < containers.length; i++) {
     
         if (containers[i].classList[0] == name) {
           containers[i].classList.add('active');
         } else {
          containers[i].classList.remove('active');
         }
        }

      }
      const nav = btn.querySelector('span').innerText;
      identifier(nav)
    })
  })

//Calendar Functionality
let currMonth = date.getMonth(), 
    currYear = date.getFullYear();

const btns = document.querySelectorAll('.material-symbols-outlined');
const currentDateEl = document.querySelector('[data-date-cal]');
const listCon = document.querySelector('.days-list');

function renderCalendar() {
  let li = '';
  const lastDay = new Date(currYear, currMonth + 1, 0).getDate();
  const previousMonthWeek = new Date(currYear, currMonth, 0).getDay();
  
 
  const diff = lastDay - previousMonthWeek;

  currentDateEl.innerText = `${months[currMonth]}, ${date.getFullYear()}`;

  for (let i = diff; i <= lastDay; i++) {
    li += `<li>${i}</li>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i == date.getDate() && monthYear.innerText == currentDateEl.innerText) {
      li += `<li class="active">${i}</li>`;
      i++;
    }
    li += `<li>${i}</li>`;
  }
  listCon.innerHTML = li;

  const daysEl = listCon.querySelectorAll('li');
  for (let i = 0; i <= previousMonthWeek; i++) {
    daysEl[i].classList.add('inactive')
  }

}
renderCalendar();
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    currMonth = btn.id == 'next' ? currMonth + 1 : currMonth - 1;
    if (currMonth >= 12) {
      currMonth = 0;
    } else if (currMonth <= 0) {
      currMonth = 0
    }
    renderCalendar();

  })
})
}
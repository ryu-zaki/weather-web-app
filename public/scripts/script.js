//API key:
//AIzaSyAKTGqOA1fOsJ_fswrc9t-B-3uYa6PuNkA
// https://api.openweathermap.org/data/2.5/weather?q=Caloocan,ph&appid=f8871b8504d5869f4faa37788c1163cd

/* navigator.geolocation.getCurrentPosition(position => {

}) */



const navMenu = document.querySelectorAll('[data-navMenu]');

function myFunction(x) {
  x.classList.toggle("change");
  navMenu.forEach(nav => {
    nav.classList.toggle('active');
  })
};



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
const settingsCon = document.querySelector('.settings-con');
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
  settingsCon.classList.toggle('dark');
  daysList.classList.toggle('dark');

  if (ticksColor == '#000') {
    ticksColor = '#bbb'
  } else {
    ticksColor = '#000'
    localStorage.setItem('darkmode', false);
  }
  console.log(ticksColor)
  

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
    type: 'line',
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

        

        console.log(value)

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
      console.log('error');
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
      console.log(result)
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

      weatherIcon.src = './icons8-partly-cloudy-day-96.png';
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

// Map Visibility
const map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'Weather App'
}).addTo(map);

navigator.geolocation.watchPosition(success, error)

let marker, circle, zoomed;
function success(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  map.setView([lat, lng], 13);
  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle)
  }
  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng]).addTo(map);

  if (!zoomed) {
    zoomed = map.fitBounds(circle.getBounds());
  }
}

function error(err) {
  if (err) throw err;
  console.log('map builed')
}



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


  //console.log(date.getDate())
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



/* Settings */
const settingsBtn = document.querySelector('[data-settings]');
const homeCon = document.querySelector('.homeCon');
const cancelBtn = document.querySelector('.cancelBtn');

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  homeCon.classList.remove('hidden');
  homeCon.classList.add('flex');
  settingsCon.classList.add('hidden');
})

settingsBtn.addEventListener('click', () => {
  homeCon.classList.add('hidden');
  settingsCon.classList.remove('hidden');
})



/* Settings Functionality */
const usernameInput = document.querySelector('[data-usernameInput]');
const emailInput = document.querySelector('[data-emailInput]');
const passwordInput = document.querySelector('[data-passwordInput]');
const countryInput = document.querySelector('[data-countryInput]');

async function apiPersonalInfo() {

  /* API THAT COMES IN LOGIN PAGE */
  const api1 = await fetch('/login/data');
  const result1 = await api1.json();

  /* API THAT COMES IN DATABASE */
  const api2 = await fetch('/userInfo');
  const result2 = await api2.json();

  //user information
  const usernameEl = document.querySelectorAll('[data-username]');
  

  result2.forEach(user => {
    if (user.user_id == result1.result[0].user_id) {
      usernameEl.forEach(el => {
        el.innerText = user.user_name; 
      });
      usernameInput.value = user.user_name;
      emailInput.value = user.email;
      passwordInput.value = user.password;
      countryInput.value = country;
    }
  })

  console.log(result1, result2);
}
apiPersonalInfo();

/* Editable Feature */
const allUserDetails = document.querySelectorAll('.settings-input-wrapper > div > div > .input-wrapper > input');
const editBtn = document.querySelector('[data-editBtn]');
const inputLabel = document.querySelectorAll('.input-label');

let tog = false;
editBtn.addEventListener('click', () => {
  inputLabel.forEach(el => {
    el.classList.toggle('active');
  });
  editBtn.classList.toggle('edit');
  if (!tog) {
    tog = true;
    editInfo()
  } else {
    tog = false;
    lockInfo()
  }
  
})


function editInfo() {
  allUserDetails.forEach(input => {
    input.removeAttribute('readonly');
  });
}

function lockInfo() {
  allUserDetails.forEach(input => {
    input.setAttribute('readonly', true);
  });
}

let eyeCheck = false;
const eyeBtn = document.querySelector('.pass-eye');
const passEl = document.querySelector('#password');

eyeBtn.addEventListener('click', () => {
  eyeBtn.classList.toggle('fa-eye');
  if (!eyeCheck) {
    eyeCheck = true;
    passEl.type = 'text';
  } else {
    eyeCheck = false;
    passEl.type = 'password';
  }
})

/* Signup saved Checker */
const modal = document.querySelector('body .update-modal');
const updateForm = document.querySelector('[data-formUp]');

/* Settings modal Variables */
const infoFit = document.querySelector('[data-infoFit]');

/* Inputs Elements */
const userErr = document.querySelector('[data-useMess]');
const emailErr = document.querySelector('[data-emlMess]');

const inputs = updateForm.querySelectorAll('input');

inputs.forEach(ip => {
  ip.addEventListener('input', () => {
    updateForm.removeEventListener('submit', updateFunc);
    const btn = updateForm.querySelector('[data-upBtn]');
    btn.classList.remove('up-btn');

    updateForm.addEventListener('submit', () => {
      localStorage.setItem('saved', true);
    });

    if (ip.id == 'email') {
      ip.addEventListener('input', () => {
        localStorage.setItem('emailChangeInput', true)
      })

    }

    if (ip.id == 'username') {
      ip.addEventListener('input', () => {
        localStorage.setItem('userChangeInput', true)
      })
    }

    if (ip.id == 'password') {
      ip.addEventListener('input', () => {
        localStorage.setItem('passwordChangeInput', true)
      })
    }
  });


})

updateForm.addEventListener('submit', updateFunc);

function updateFunc(e) {
  e.preventDefault();
}

let errorData = {};
console.log(localStorage)
async function signSaved() {
  try {
    const signApi = await fetch('/updateData');
    const data = await signApi.json();


    myErrorSaved();
    console.log(data);
    const localSaved = (localStorage.getItem('saved') == 'true');

    function errorDisplayer(errMess, input) {
       errMess.classList.remove('hidden');
       input.classList.add('error');

       homeCon.classList.remove('flex');
       homeCon.classList.add('hidden');
       
       settingsCon.classList.remove('hidden');
       settingsCon.classList.add('flex');
    };

    function successDisplayer(title, msg) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');

      infoFit.querySelector('h1').innerText = title;
      infoFit.querySelector('p').innerText = msg;
      localStorage.setItem('saved', false);

    }

    /* Variables for checking if the inputs changed */
    const userChange = (localStorage.getItem('userChangeInput') == "true");
    const emailChange = (localStorage.getItem('emailChangeInput') == "true");
    const passChange = (localStorage.getItem('passwordChangeInput') == "true");

    async function myErrorSaved(inputValue, indexName) {
      try {
        const api = await fetch('/errorData');
        const result = await api.json();
        errorData = result;

        if (errorData.user_name) {
           usernameInput.value = errorData.user_name;
        }
        
        if (errorData.email) {
          emailInput.value = errorData.email;
        }
        
        console.log(errorData)
      }

      catch (err) {
        if (err) {
          throw err;
        }
      }
    }

    if (data.same_user_name == true && localSaved) {
       errorDisplayer(userErr, usernameInput);
    } 

    if (data.same_email == true && localSaved) {
      errorDisplayer(emailErr, emailInput);
    }

    /* Modal sec */
    if (data.saved == true && localSaved && data.same_user_name == false && data.same_email == false) {
      successDisplayer('Saved!', 'your information has been updated.')
    }

    else if (data.same_user_name == false && localSaved & userChange) {
       successDisplayer('Username Updated!', 'your username has been updated')
       localStorage.setItem('userChangeInput', false);

    } else if (data.same_email == false && localSaved && emailChange) {
      successDisplayer('Email Updated!', 'your email has been updated')
      localStorage.setItem('emailChangeInput', false);
    } else if (data.password == true && localSaved && passChange) {
      successDisplayer('password Updated!', 'your password has been updated');
      localStorage.setItem('passwordChangeInput', false);
    } else {
      localStorage.setItem('userChangeInput', false);
      localStorage.setItem('emailChangeInput', false);
      localStorage.setItem('passwordChangeInput', false);
    }
  } 

  catch(err) {
    if (err) throw err;

  }
}
signSaved();
/* Data Update Modal */
const okBtn = document.querySelectorAll('[data-okBtn]');

okBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  })
});


/* Logout Funcitonality */

const logoutBtn = document.querySelector('[data-logoutBtn]');
logoutBtn.addEventListener('click', () => {
  const logIdentify = confirm('Are you sure you want to logout?');
  const dataInfo = { logout:  logIdentify};

  /* Sending data to the server */
  fetch('/logChecker', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataInfo),
})

  if (dataInfo.logout == true) {
    // Redirect to a new page
   window.location.replace("http://localhost:3500/");
   localStorage.setItem('darkmode', false);
  }
})
}





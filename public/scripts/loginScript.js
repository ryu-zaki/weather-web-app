/* Global Variables */
const loginCon = document.querySelector('.login-con');
const loginForm = document.querySelector('[data-logForm]');
const signChecker = localStorage.getItem('signErr');
console.log(localStorage)
if (signChecker == 'true') {
  loginCon.classList.add('deac');
};

/* Login and Signup Functionalities */
const signupBtn = document.querySelector('[data-signBtn]');
const loginBtn = document.querySelector('[data-logBtn]');

signupBtn.addEventListener('click', () => {
  loginCon.classList.add('deac');
});

loginBtn.addEventListener('click', () => {
    loginCon.classList.remove('deac');
});


/* Signup checker */
const okBtn = document.querySelectorAll('[data-okBtn]');
const modalCon = document.querySelector('.modal-wrapper');

okBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    modalCon.classList.remove('active');
  });
})

async function myChecker() {
  try {
    const checker = await fetch('/signup/checker');
    const result = await checker.json();
    const errorCon = document.querySelectorAll('.modal-wrapper > div');
    console.log(result);

    if (result.status == true && result.email == true) {
     conIdentifier('#success');
    } 
    
    else if (result.status == false) {
     conIdentifier('#usernameFail');
    } 
    
    else if (result.email == false) {
      conIdentifier('#emailFail');
    } 

    function conIdentifier(id) {
      modalCon.classList.add('active');
      modalCon.querySelector(id).classList.remove('hidden');
      modalCon.querySelector(id).classList.add('flex');
      console.log(modalCon.querySelector(id))
    }
  } catch(err) {
    console.log(err)
  }
}
myChecker();
localStorage.setItem('signErr', false);
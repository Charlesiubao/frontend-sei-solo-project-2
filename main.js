console.log('Reporting from main.js')

// DOM Selectors
const navAbout = document.querySelector('#nav-about')
const navSignIn = document.querySelector('#nav-signin')
const navSignUp = document.querySelector('#nav-signup')
const navDashboard = document.querySelector('#nav-dashboard')
const navSettings = document.querySelector('#nav-settings')
const navLogout = document.querySelector('#nav-logout')

const sectionAbout = document.querySelector('.about')
const sectionStart = document.querySelector('.start')
const sectionSignIn = document.querySelector('.signin')
const sectionSignUp = document.querySelector('.signup')
const sectionDashboard = document.querySelector('.dashboard')
const sectionSettings = document.querySelector('.settings')
const sectionLogout = document.querySelector('.logout')

const formSignIn = document.querySelector('#signin-form')
const emailSignIn = document.querySelector('#signin-email')
const passwordSignIn = document.querySelector('#signin-password')

const formSignUp = document.querySelector('#signup-form')
const nameSignUp = document.querySelector('#signup-name')
const emailSignUp = document.querySelector('#signup-email')
const passwordSignUp = document.querySelector('#signup-password')
const countrySignUp = document.querySelector('#signup-country')



// Reusable Functions
const navLoggedIn = () => {
    navSignIn.classList.add('hidden')
    navSignUp.classList.add('hidden')
    navDashboard.classList.remove('hidden')
    navSettings.classList.remove('hidden')
    navLogout.classList.remove('hidden')
}

const navLoggedOut = () => {
    navSignIn.classList.remove('hidden')
    navSignUp.classList.remove('hidden')
    navDashboard.classList.add('hidden')
    navSettings.classList.add('hidden')
    navLogout.classList.add('hidden')
}

const showSection = (sectionName) => {
    document.querySelectorAll('section').forEach(thing => thing.classList.add('hidden'))
    document.querySelector(sectionName).classList.remove('hidden')
}

const clearDOM = (area) => {
    while (area.firstChild) {
        area.firstChild.remove()
    }  
}


// Sign-up & Sign-in Functions
formSignUp.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = nameSignUp.value
    const email = emailSignUp.value
    const password = passwordSignUp.value
    const country = countrySignUp.value

    try {
        const response = await axios.post('http://localhost:3001/users', {
            name: name,
            email: email,
            password: password,
            country: country
        })
        
        const userId = response.data.user.id
        localStorage.setItem('userId', userId)
        
            
    } catch (error) {
        alert('Email already taken')
    }
})

formSignIn.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = emailSignIn.value
    const password = emailSignIn.value

    try {
        const response = await axios.post('http://localhost:3001/users/login', {
            email: email,
            password: password
        })

        const userId = response.data.user.id
        localStorage.setItem('userId', userId)
        
            
    } catch (error) {
        alert('Login failed')
    }
})
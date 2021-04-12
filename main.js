console.log('Reporting from main.js')

// DOM Selectors
const navWelcome = document.querySelector('#nav-welcome')
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

const dashUserName = document.querySelector('#dash-username')
const dashCountry = document.querySelector('#dash-country')

const dashSearchBar = document.querySelector('#search-bar')
const dashSearchButton = document.querySelector('#search-button')

const dashHeadlinesArea = document.querySelector('#headlines-area')
const dashSearchArea = document.querySelector('#search-area')
const dashBookmarksArea = document.querySelector('#bookmarks-area')

const testButton = document.getElementById('test-headlines')

let headlines = []

// Reusable Functions
const navLoggedIn = () => {
    navAbout.classList.add('hidden')
    navSignIn.classList.add('hidden')
    navSignUp.classList.add('hidden')
    navDashboard.classList.remove('hidden')
    navSettings.classList.remove('hidden')
    navLogout.classList.remove('hidden')
}

const navLoggedOut = () => {
    navAbout.classList.remove('hidden')
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

const showDashUserName = (userName) => {
    dashUserName.innerText = userName
}

const showDashCountry = (country) => {
    dashCountry.innerText = country
}

// Nav-link Functions
navWelcome.addEventListener('click', () => {
    showSection('.welcome')
})

navAbout.addEventListener('click', () => {
    showSection('.about')
})

navSignIn.addEventListener('click', () => {
    showSection('.signin')
})

navSignUp.addEventListener('click', () => {
    showSection('.signup')
})

navDashboard.addEventListener('click', () => {
    showSection('.dashboard')
})

navSettings.addEventListener('click', () => {
    showSection('.settings')
})

navLogout.addEventListener('click', () => {
    navLoggedOut()
    showSection('.logout')
    clearDOM(dashHeadlinesArea)
    localStorage.clear()
})


// Sign-up, Sign-in Form Functions
formSignUp.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = nameSignUp.value
    const email = emailSignUp.value
    const password = passwordSignUp.value
    const country = countrySignUp.value

    try {
        const response = await axios.post('http://localhost:3001/users/signup', {
            name: name,
            email: email,
            password: password,
            country: country
        })

        const userId = response.data.user.id
        const userName = response.data.user.name
        const countryName = response.data.country.name
        localStorage.setItem('userId', userId)
            navLoggedIn()
            showSection('.dashboard')
            showDashUserName(userName)
            showDashCountry(countryName)
            
    } catch (error) {
        alert('Email already taken')
    }
})

formSignIn.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = emailSignIn.value
    const password = passwordSignIn.value

    try {
        const response = await axios.post('http://localhost:3001/users/signin', {
            email: email,
            password: password
        })

        const userId = response.data.user.id
        const userName = response.data.user.name
        const countryName = response.data.country.name
        localStorage.setItem('userId', userId)
            navLoggedIn()
            showSection('.dashboard')
            showDashUserName(userName)
            showDashCountry(countryName)
        
            
    } catch (error) {
        alert('Login failed')
    }
})




// Dashboard functionality (top headlines, search bar & results, user bookmarks)
const topHeadlines = async () => {
    try {
        const userId = localStorage.getItem('userId')
        
        const response = await axios.get('http://localhost:3001/news/headlines/', {
            headers: {
                authorization: userId
            }
        })
        console.log(response.data)
        
    } catch (error) {
        alert('Getting top headlines failed')
    }
}

const showHeadlines = (response) => {
    clearDOM(dashHeadlinesArea)
    headlines = response.data.articles

    for ( let i = 0; i < headlines.length; i++ ) {
        let headlineComponent = document.createElement('a')
        headlineComponent.classList.add('headline-component')
        headlineComponent.href = `${headlines[i].url}`
        headlineComponent.target = '_blank'
        dashHeadlinesArea.appendChild(headlineComponent)

        let headlineTitle = document.createElement('div')
        headlineTitle.classList.add('headline-title')
        headlineTitle.innerText = `${headlines[i].title}`
        headlineComponent.appendChild(headlineTitle)

        let headlineImage = document.createElement('img')
        if ( headlines[i].urlToImage !== null ) {
            headlineImage.src = `${headlines[i].urlToImage}`
        } else {
            headlineImage.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }
        headlineImage.classList.add('headline-image')
        headlineComponent.appendChild(headlineImage)

        let headlineSave = document.createElement('button')
        headlineSave.classList.add('headline-save')
        headlineSave.innerText = 'Bookmark'
        headlineComponent.appendChild(headlineSave)
    }

}


testButton.addEventListener('click', async () => {
    try {
        const userId = localStorage.getItem('userId')
        
        const response = await axios.get('http://localhost:3001/news/headlines/', {
            headers: {
                authorization: userId
            }
        })
        console.log(response)
        showHeadlines(response)
    } catch (error) {
        alert('Getting top headlines failed')
    }
})


// On load
const pageOnLoad = async () => {
    try {
        const userId = localStorage.getItem('userId')

        if (userId) {
            const response = await axios.get('http://localhost:3001/users', {
                headers: {
                    authorization: userId
                }
            })
            const userName = response.data.user.name
            const countryName = response.data.country.name
                navLoggedIn()
                showSection('.dashboard')
                showDashUserName(userName)
                showDashCountry(countryName)
                

        } else {
            navLoggedOut()
        }


    } catch (error) {
        alert('Page load failed')
    }
}




document.addEventListener('DOMContentLoaded', pageOnLoad())


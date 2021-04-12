console.log('Reporting from main.js')

const backEnd = 'http://localhost:3001'

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
let searches = []

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
        const response = await axios.post(`${backEnd}/users/signup`, {
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
        const response = await axios.post(`${backEnd}/users/signin`, {
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




// Top Headlines
const topHeadlines = async () => {
    try {
        const userId = localStorage.getItem('userId')
        
        const response = await axios.get(`${backEnd}/news/headlines`, {
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
        
        const response = await axios.get(`${backEnd}/news/headlines`, {
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

// News Search
dashSearchButton.addEventListener('click', async (e) => {
    e.preventDefault()
    
    try {
        const response = await axios.post(`${backEnd}/news`, {
            search: dashSearchBar.value
        })
        console.log(response)
        showSearchResults(response)
    } catch (error) {
        alert('Search failed')
    }
})

const showSearchResults = (response) => {
    clearDOM(dashSearchArea)
    searches = response.data.articles

    for ( let i = 0; i < searches.length; i++ ) {
        let searchComponent = document.createElement('a')
        searchComponent.classList.add('search-component')
        searchComponent.href = `${searches[i].url}`
        searchComponent.target = '_blank'
        dashSearchArea.appendChild(searchComponent)

        let searchTitle = document.createElement('div')
        searchTitle.classList.add('search-title')
        searchTitle.innerText = `${searches[i].title}`
        searchComponent.appendChild(searchTitle)

        let searchImage = document.createElement('img')
        if ( searches[i].urlToImage !== null ) {
            searchImage.src = `${searches[i].urlToImage}`
        } else {
            searchImage.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }
        searchImage.classList.add('search-image')
        searchComponent.appendChild(searchImage)

        let searchSave = document.createElement('button')
        searchSave.classList.add('search-save')
        searchSave.innerText = 'Bookmark'
        searchComponent.appendChild(searchSave)
    }
}






// On load
const pageOnLoad = async () => {
    try {
        const userId = localStorage.getItem('userId')

        if (userId) {
            const response = await axios.get(`${backEnd}/users`, {
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


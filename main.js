console.log('Reporting from main.js')

const backEnd = 'http://localhost:3001'
const nullImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'

// DOM Selectors
const navTagline = document.querySelector('#nav-tagline')
const navWelcome = document.querySelector('#nav-welcome')
const navAbout = document.querySelector('#nav-about')
const navSignIn = document.querySelector('#nav-signin')
const navSignUp = document.querySelector('#nav-signup')
const navDashboard = document.querySelector('#nav-dashboard')
const navLogout = document.querySelector('#nav-logout')

const navHeadlines = document.querySelector('#nav-headlines')
const navSearch = document.querySelector('#nav-search')
const navBookmarks = document.querySelector('#nav-bookmarks')

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

const dashSearchBar = document.getElementById('search-bar')
const dashSearchButton = document.getElementById('search-button')
const dashSearchForm = document.querySelector('#search-form')

const dashHeadlinesArea = document.getElementById('area-headlines')
const dashSearchArea = document.getElementById('area-search')
const dashBookmarksArea = document.getElementById('area-bookmarks')

const testButton = document.getElementById('test-headlines')
const testBookmarks = document.getElementById('test-bookmarks')

let headlines = []
let searches = []
let bookmarks = []

// Reusable Functions
const navLoggedIn = () => {
    navSignIn.classList.add('hidden')
    navSignUp.classList.add('hidden')
    navDashboard.classList.remove('hidden')
    navLogout.classList.remove('hidden')
}

const navLoggedOut = () => {
    navSignIn.classList.remove('hidden')
    navSignUp.classList.remove('hidden')
    navDashboard.classList.add('hidden')
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

const addHidden = (area) => {
    if ( area.classList.contains('hidden') !== true ) {
        area.classList.add('hidden')
    }
}

const removeHidden = (area) => {
    if ( area.classList.contains('hidden') === true ) {
        area.classList.remove('hidden')
    }
}

const makeVisible = (area) => {
    if ( area.classList.contains('v-hidden') === true ) {
        area.classList.remove('v-hidden')
        area.classList.add('v-visible')
    }
}

const makeInvisible = (area) => {
    if ( area.classList.contains('v-hidden') !== true ) {
        area.classList.remove('v-visible')
        area.classList.add('v-hidden')
    }
}


const addActive = (subNav) => {
    if ( subNav.classList.contains('active') !== true ) {
        subNav.classList.add('active')
    }
}

const removeActive = (subNav) => {
    if ( subNav.classList.contains('active') === true ) {
        subNav.classList.remove('active')
    }
}

const addActiveNav = (nav) => {
    if ( nav.classList.contains('active-nav') !== true ) {
        nav.classList.add('active-nav')
    }
}

const removeActiveNav = (nav) => {
    if ( nav.classList.contains('active-nav') === true ) {
        nav.classList.remove('active-nav')
    }
}

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
            dashSearchBar.value =''
            showSection('.dashboard')
            showDashUserName(userName)
            showDashCountry(countryName)
            addActiveNav(navDashboard)
            clearDOM(dashHeadlinesArea)
            clearDOM(dashSearchArea)
            clearDOM(dashBookmarksArea)
            /* removeHidden(dashHeadlinesArea)
            addActive(navHeadlines)
            addHidden(dashSearchArea)
            removeActive(navSearch)
            addHidden(dashBookmarksArea)
            removeActive(navBookmarks)
            makeInvisible(dashSearchForm)
            topHeadlines() */

            addHidden(dashHeadlinesArea)
            removeActive(navHeadlines)

            removeHidden(dashSearchArea)
            addActive(navSearch)

            addHidden(dashBookmarksArea)
            removeActive(navBookmarks)

            makeVisible(dashSearchForm)
            
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
            dashSearchBar.value =''
            showSection('.dashboard')
            showDashUserName(userName)
            showDashCountry(countryName)
            addActiveNav(navDashboard)
            clearDOM(dashHeadlinesArea)
            clearDOM(dashSearchArea)
            clearDOM(dashBookmarksArea)

            /* removeHidden(dashHeadlinesArea)
            addActive(navHeadlines)
            addHidden(dashSearchArea)
            removeActive(navSearch)
            addHidden(dashBookmarksArea)
            removeActive(navBookmarks)
            makeInvisible(dashSearchForm)
            topHeadlines() */

            addHidden(dashHeadlinesArea)
            removeActive(navHeadlines)

            removeHidden(dashSearchArea)
            addActive(navSearch)

            addHidden(dashBookmarksArea)
            removeActive(navBookmarks)

            makeVisible(dashSearchForm)

            
        
            
    } catch (error) {
        alert('Login failed')
    }
})


// Top Headlines


const showHeadlines = (response) => {
    clearDOM(dashHeadlinesArea)
    headlines = response.data.articles

    for ( let i = 0; i < headlines.length; i++ ) {
        let headlineComponent = document.createElement('div')
        headlineComponent.classList.add('article-component')
        dashHeadlinesArea.appendChild(headlineComponent)

        let headlineTitle = document.createElement('a')
        headlineTitle.classList.add('article-title')
        headlineTitle.innerText = `${headlines[i].title}`
        headlineTitle.href = `${headlines[i].url}`
        headlineTitle.target = '_blank'
        headlineComponent.appendChild(headlineTitle)

        let headlineOverlay = document.createElement('a')
        headlineOverlay.classList.add('article-overlay')
        headlineOverlay.href = `${headlines[i].url}`
        headlineOverlay.target = '_blank'
        headlineComponent.appendChild(headlineOverlay)

        let headlineImage = document.createElement('img')
        if ( headlines[i].urlToImage !== null ) {
            headlineImage.src = `${headlines[i].urlToImage}`
        } else {
            headlineImage.src = nullImage
        }
        headlineImage.classList.add('article-image')
        headlineComponent.appendChild(headlineImage)

        let headlineSave = document.createElement('div')
        headlineSave.classList.add('article-bookmark')
        headlineSave.innerText = 'Bookmark'
        
        headlineSave.addEventListener('click', async () => {
            const userId = localStorage.getItem('userId')
            try {
                headlineSave.classList.add('active-bookmark')
                headlineSave.innerText = 'Bookmarked'
                const response = await axios.post(`${backEnd}/news/bookmarks`, {
                    id: userId,
                    title: headlines[i].title,
                    url: headlines[i].url,
                    image: headlines[i].urlToImage
                })
                
                console.log('save', response)
            } catch (error) {
                alert('Save button failed')
            }
            
        })
        headlineComponent.appendChild(headlineSave)
    }
    console.log(headlines)

}

const topHeadlines = async () => {
    try {
        const userId = localStorage.getItem('userId')
        
        const response = await axios.get(`${backEnd}/news/headlines`, {
            headers: {
                authorization: userId
            }
        })
        showHeadlines(response)
        
    } catch (error) {
        alert('Getting top headlines failed')
    }
}


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
        let searchComponent = document.createElement('div')
        searchComponent.classList.add('article-component')
        dashSearchArea.appendChild(searchComponent)

        let searchTitle = document.createElement('a')
        searchTitle.classList.add('article-title')
        searchTitle.innerText = `${searches[i].title}`
        searchTitle.href = `${searches[i].url}`
        searchTitle.target = '_blank'
        searchComponent.appendChild(searchTitle)

        let searchOverlay = document.createElement('a')
        searchOverlay.classList.add('article-overlay')
        searchOverlay.href = `${searches[i].url}`
        searchOverlay.target = '_blank'
        searchComponent.appendChild(searchOverlay)

        let searchImage = document.createElement('img')
        if ( searches[i].urlToImage !== null ) {
            searchImage.src = `${searches[i].urlToImage}`
        } else {
            searchImage.src = nullImage
        }
        searchImage.classList.add('article-image')
        searchComponent.appendChild(searchImage)

        let searchSave = document.createElement('div')
        searchSave.classList.add('article-bookmark')
        searchSave.innerText = 'Bookmark'
        
        searchSave.addEventListener('click', async () => {
            const userId = localStorage.getItem('userId')
            try {
                searchSave.classList.add('active-bookmark')
                searchSave.innerText = 'Bookmarked'
                const response = await axios.post(`${backEnd}/news/bookmarks`, {
                    id: userId,
                    title: searches[i].title,
                    url: searches[i].url,
                    image: searches[i].urlToImage
                })
                console.log('save', response)
            } catch (error) {
                alert('Save button failed')
            }
        })
        searchComponent.appendChild(searchSave)
    }
    console.log(searches)
}

// Bookmarks
const showBookmarks = async (response) => {
    clearDOM(dashBookmarksArea)
    bookmarks = response.data.response

    for ( let i = 0; i < bookmarks.length; i++ ) {
        let bookmarkComponent = document.createElement('div')
        bookmarkComponent.classList.add('article-component')
        dashBookmarksArea.appendChild(bookmarkComponent)

        let bookmarkTitle = document.createElement('a')
        bookmarkTitle.classList.add('article-title')
        bookmarkTitle.innerText = `${bookmarks[i].title}`
        bookmarkTitle.href = `${bookmarks[i].url}`
        bookmarkTitle.target = '_blank'
        bookmarkComponent.appendChild(bookmarkTitle)

        let bookmarkOverlay = document.createElement('a')
        bookmarkOverlay.classList.add('article-overlay')
        bookmarkOverlay.href = `${bookmarks[i].url}`
        bookmarkOverlay.target = '_blank'
        bookmarkComponent.appendChild(bookmarkOverlay)

        let bookmarkImage = document.createElement('img')
        if ( bookmarks[i].image !== null ) {
            bookmarkImage.src = `${bookmarks[i].image}`
        } else {
            bookmarkImage.src = nullImage
        }
        bookmarkImage.classList.add('article-image')
        bookmarkComponent.appendChild(bookmarkImage)

        let bookmarkDelete = document.createElement('div')
        bookmarkDelete.classList.add('article-bookmark')
        bookmarkDelete.innerText = 'Remove'
        
        bookmarkDelete.addEventListener('click', async () => {
            const userId = localStorage.getItem('userId')
            try {
                bookmarkDelete.classList.add('active-bookmark')
                bookmarkDelete.innerText = 'Removed'
                const response = await axios.post(`${backEnd}/news/bookmarks/remove`, {
                    id: userId,
                    title: bookmarks[i].title,
                    url: bookmarks[i].url,
                    image: bookmarks[i].image
                })
                console.log('delete', response)
            } catch (error) {
                alert('Delete button failed')
            }
        })
        bookmarkComponent.appendChild(bookmarkDelete)
    }
    console.log(bookmarks)
}

const myBookmarks = async () => {
    try {
        const userId = localStorage.getItem('userId')
        
        const response = await axios.get(`${backEnd}/users/bookmarks`, {
            headers: {
                authorization: userId
            }
        })
        showBookmarks(response)

    } catch (error) {
        alert('Getting my bookmarks failed')
    }
}


// Nav-link Functions
navTagline.addEventListener('click', () => {
    showSection('.about')
    addActiveNav(navAbout)
    removeActiveNav(navWelcome)
    removeActiveNav(navDashboard)
    removeActiveNav(navSignUp)
    removeActiveNav(navSignIn)
})

navWelcome.addEventListener('click', () => {
    showSection('.welcome')
    addActiveNav(navWelcome)
    removeActiveNav(navDashboard)
    removeActiveNav(navAbout)
    removeActiveNav(navSignIn)
    removeActiveNav(navSignUp)
})

navAbout.addEventListener('click', () => {
    showSection('.about')
    addActiveNav(navAbout)
    removeActiveNav(navWelcome)
    removeActiveNav(navSignIn)
    removeActiveNav(navSignUp)
    removeActiveNav(navDashboard)
})

navSignIn.addEventListener('click', () => {
    formSignIn.reset()
    showSection('.signin')
    addActiveNav(navSignIn)
    removeActiveNav(navWelcome)
    removeActiveNav(navAbout)
    removeActiveNav(navSignUp)
})

navSignUp.addEventListener('click', () => {
    formSignUp.reset()
    showSection('.signup')
    addActiveNav(navSignUp)
    removeActiveNav(navWelcome)
    removeActiveNav(navAbout)
    removeActiveNav(navSignIn)
})

navDashboard.addEventListener('click', () => {
    addActiveNav(navDashboard)
    removeActiveNav(navWelcome)
    removeActiveNav(navAbout)
    makeInvisible(dashSearchForm)
    showSection('.dashboard')
    clearDOM(dashHeadlinesArea)
    clearDOM(dashSearchArea)
    clearDOM(dashBookmarksArea)
    /* removeHidden(dashHeadlinesArea)
    addActive(navHeadlines)
    addHidden(dashSearchArea)
    removeActive(navSearch)
    addHidden(dashBookmarksArea)
    removeActive(navBookmarks)
    topHeadlines() */
    
    addHidden(dashHeadlinesArea)
    removeActive(navHeadlines)

    removeHidden(dashSearchArea)
    addActive(navSearch)

    addHidden(dashBookmarksArea)
    removeActive(navBookmarks)

    makeVisible(dashSearchForm)    
})

navLogout.addEventListener('click', () => {
    navLoggedOut()
    showSection('.welcome')
    clearDOM(dashHeadlinesArea)
    clearDOM(dashSearchArea)
    clearDOM(dashBookmarksArea)
    addActiveNav(navWelcome)
    removeActiveNav(navAbout)
    removeActiveNav(navSignIn)
    removeActiveNav(navSignUp)
    removeActiveNav(navDashboard)
    localStorage.clear()
})

navHeadlines.addEventListener('click', () => {
    clearDOM(dashHeadlinesArea)
    clearDOM(dashSearchArea)
    clearDOM(dashBookmarksArea)
    
    removeHidden(dashHeadlinesArea)
    addActive(navHeadlines)

    addHidden(dashSearchArea)
    removeActive(navSearch)

    addHidden(dashBookmarksArea)
    removeActive(navBookmarks)

    makeInvisible(dashSearchForm)

    topHeadlines()
})

navSearch.addEventListener('click', () => {
    dashSearchBar.value =''
    clearDOM(dashHeadlinesArea)
    clearDOM(dashSearchArea)
    clearDOM(dashBookmarksArea)

    addHidden(dashHeadlinesArea)
    removeActive(navHeadlines)

    removeHidden(dashSearchArea)
    addActive(navSearch)

    addHidden(dashBookmarksArea)
    removeActive(navBookmarks)

    makeVisible(dashSearchForm)
    
    navBookmarks.classList.remove('active')
})

navBookmarks.addEventListener('click', () => {
    clearDOM(dashHeadlinesArea)
    clearDOM(dashSearchArea)
    clearDOM(dashBookmarksArea)

    addHidden(dashHeadlinesArea)
    removeActive(navHeadlines)

    addHidden(dashSearchArea)
    removeActive(navSearch)

    removeHidden(dashBookmarksArea)
    addActive(navBookmarks)

    makeInvisible(dashSearchForm)

    myBookmarks()
})




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
                dashSearchBar.value =''
                showSection('.dashboard')
                showDashUserName(userName)
                showDashCountry(countryName)
                addActiveNav(navDashboard)
                clearDOM(dashHeadlinesArea)
                clearDOM(dashSearchArea)
                clearDOM(dashBookmarksArea)
                /* removeHidden(dashHeadlinesArea)
                addActive(navHeadlines)
                addHidden(dashSearchArea)
                removeActive(navSearch)
                addHidden(dashBookmarksArea)
                removeActive(navBookmarks)
                makeInvisible(dashSearchForm)
                topHeadlines() */

                addHidden(dashHeadlinesArea)
                removeActive(navHeadlines)

                removeHidden(dashSearchArea)
                addActive(navSearch)

                addHidden(dashBookmarksArea)
                removeActive(navBookmarks)

                makeVisible(dashSearchForm)

        } else {
            navLoggedOut()
            showSection('.welcome')
            addActiveNav(navWelcome)
        }


    } catch (error) {
        alert('Page load failed')
    }
}




document.addEventListener('DOMContentLoaded', pageOnLoad())


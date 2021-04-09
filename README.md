# Zeitgeist
* <a href="https://github.com/graymok/frontend-sei-solo-project-2">Frontend repository</a>
* <a href="https://github.com/graymok/backend-sei-solo-project-2">Backend repository</a>


## Tagline
News of the age!


## Project Tracker
TBD


## Project APIs
* <a href="https://newsapi.org/">News API</a>
* <a href="https://currentsapi.services/en">Currents</a>


## Overview
Zeitgeist is a full stack web application that will give its users the ability to customize and bookmark the news articles that they're looking to read and learn. The application will leverage one of the two leading free APIs serving tens of thousands of news articles, News API and Currents.

The level of search customization, to be defined at signup and to be adjusted at any point after login, will give Zeitgeist users a unique experience to consume the news from their preferred country of origin, topics of discussion, and even in their preferred written language.


## Wireframes

### Wireframe #1 - Webpage on load screen
The first screen that a new user or logged off user will see.
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/wireframe-1.png?raw=true">

### Wireframe #2 - New user signing up
If a user is signing up for the first time, this screen will appear guiding the user through setting their preferences.
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/wireframe-2.png?raw=true">

### Wireframe #3 - New user final sign up
Last stage of the signup process for user information.
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/wireframe-3.png?raw=true">

### Wireframe #4 - User logged in home page
After signing up or logging in as a returning user, the user will see the home page screen with access to searching for news, seeing what news results they get, clicking the news, or bookmarking the articles they want to save. The nav links take the user to their bookmarks, their settings, or to logout.
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/wireframe-4.png?raw=true">

### Wireframe #5 - User bookmarks
This is where the user can view or delete their saved news articles.
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/wireframe-5.png?raw=true">

### Wireframe #6 - User settings
This is where the user can change their preferences for making news searches.
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/wireframe-6.png?raw=true">

### Wireframe #7 - User logout
This is what happens when the user logs out. There are nav-links to take the user back to signup or login.
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/wireframe-7.png?raw=true">

## User Stories
1. When I load Zeitgest for the first time, I see a brief description of the app and links to login or signup
2. When I signup for the first time, I am guided through a series of questions of how I like to search and read the news
3. When I answer a question during signup, I receive confirmation that my answer denotes my user preference that I can change after I finish signing up
4. When I login or finish signing up, I see the main window where I can search keywords for news or review my saved news articles
5. When I search a keyword in the news search bar, I receive a selection of news articles related to my search term
6. When I receive a selection of news articles, I can save articles to my bookmarks
7. When I see the news article, I see a relevant picture, title, and brief headline
8. When I click the news article, I go to the external website that hosts the news article


## Entity Relationship Diagram aka ERD
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/zeitgeist-erd.png?raw=true">

## Routes Inventory

| Verb | Path | Route Summary |
| --- | --- | --- |
| `GET` | `/news` | Retrieve news |
| `GET` | `/user/:userId/home` | Retrieve user's home page |
| `GET` | `/user/:userId/articles` | Retrieve user's bookmarks |
| `GET` | `/user/:userId/prefs` | Retrieve user's preferences |
| `POST` | `/user` | Create new user |
| `POST` | `/user/:userId/article/:articleId` | Save user's bookmarks |
| `PUT` | `/user/:userId/country/:countryId` | Update user's preference for country origin for news |
| `PUT` | `/user/:userId/langauge/:languageId` | STRETCH: Update user's preference for language |
| `PUT` | `/user/:userId/category/:categoryId` | STRETCH: Update user's preference for categories |
| `DELETE` | `/user/:userId/article/:articleId` | Remove user's bookmarked article |


## MVP Checklist
1. Build frontend with minimal HTML & CSS
2. Build backend with routes, controllers, and Postgres database
3. Build user authentication
4. Build news search feature
5. Associate user with saved news articles in database
6. Retrieve saved news articles
7. Build 1 user preference modifier to adjust search parameters


## Stretch Goals
1. Add additional preferences and associations to modify user search experience
2. Save search parameters as user search shortcuts
3. Encrypt/decrypt userId
4. Verify userId
5. Implement db hashing
6. CSS animations
7. Create news viewer in the app so no need to go to external websites to read the news
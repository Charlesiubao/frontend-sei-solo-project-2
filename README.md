# Zeitgeist

## Repository Links
* <a href="https://github.com/graymok/frontend-sei-solo-project-2">Frontend repository</a>
* <a href="https://github.com/graymok/backend-sei-solo-project-2">Backend repository</a>


## Heroku Deployment
* <a href="https://zeitgeist-news-app.herokuapp.com/">Zeitgeist News App</a>


## Project APIs
* <a href="https://newsapi.org/">News API</a>


## Overview
Zeitgeist is a full stack web application that will give its users the ability to customize and bookmark the news articles that they're looking to read and learn. The application will leverage the Developer API from News API and its existing endpoints, which include modifying the search results with country of origin, categories or topics, and language of origin.

The level of search customization, to be defined at signup and to be adjusted at any point after login, will give Zeitgeist users a unique experience to consume the news from their preferred country of origin. Stretch customization goals include written languages and specific categories or topics.


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
<img src="https://github.com/graymok/frontend-sei-solo-project-2/blob/main/assets/zeitgeist-erd-v3.png?raw=true">

## Routes Inventory

| Verb | Path | Route Summary |
| --- | --- | --- |
| `GET` | `/users` | Find user |
| `GET` | `/users/bookmarks` | Find user's bookmarks |
| `POST` | `/users/signup` | Create new user |
| `POST` | `/users/signin` | Sign in existing user |
| `POST` | `/news` | Find news articles based on search query |
| `GET` | `/news/headlines` | Retrieve Top Headlines based on user's country preference |
| `POST` | `/news/bookmarks` | Save news article to user's bookmarks |
| `POST` | `/news/bookmarks/remove` | Remove news article from user's bookmarks |


## MVP Checklist
1. [x] Build frontend with minimal HTML & CSS
2. [x] Build backend with routes, controllers, and Postgres database
3. [x] Build user authentication
4. [x] Build news search feature
5. [x] Save news article to user
6. [x] Retrieve saved news articles
7. [x] Remove saved news article
8. [x] Build 1 user preference modifier, select country of origin, to adjust search parameters


## Stretch Goals
1. [x] App branding
2. [x] Home page, About page
3. [x] Deep CSS styling
4. [x] User encryption
5. [x] Hashed user passwords in database
6. [ ] Responsive Design
7. [ ] Verify user endpoint
8. [ ] Add additional preferences and associations to modify user search experience
9. [ ] Save search parameters as user search shortcuts
10. [ ] CSS animations
11. [ ] Create news viewer in the app so no need to go to external websites to read the news

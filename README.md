# Track Wise - Price Tracker App

## Introduction

Have you ever been to a Woolworths and seen things you want to purchase that are not on Sale? You may say to yourself that you will buy it next time or you may buy it anyway. Well, in both cases they are so frustrating to you :( Don't worry, we will solve those problems for you. Introducing TrackWise, a tracker price app that sets an alert on your favorite product & notifies you when prices drop. Enjoy buying things you need as soon as they are on sale

This is the single web page frontend for Track Wise App. If you want to visit the backend, please follow this [link](https://github.com/ethannguyen-uts/trackwise-backend/)

## Technologies

- React
- NextJs
- Urql Client
- Graphql Code Generator
- Typescript
- Tailwind CSS
- Formik

## Features

### Pages

The project has following pages:

- Landing page
- Signup
- Login
- Forgot Password
- Change Password
- Products Page

#### Landing Page

A single page that introduces about the Track Price App.
![gif landing page](/assets/landingpage.png?raw=true)

#### Sign Up

User input their personal information to set up their account, user needs to provide their email so that the app can send them a notification whenever the price of the product is dropped.

![gif signup](/assets/signup.gif)

#### Log in

After the user login, the graphql server sends a cookie to the browser that contains an encrypted value of the session created on the server. The browser will send this cookie with every user request for authentication purposes.

![gif login](/assets/login.gif)

#### Forgot password

The user inputs their email information, an email will send to the user so that the user can follow the link to reset their password.
![gif login](/assets/forgotpassword.gif)

#### Products Page

![png product page](/assets/productspage.png)

The products page allows the user to input a product URL (Currently supports Woolworth products). After clicking the Scrape button on Scrape Bar, the client execute the add product mutation, the graphql server performs the scrape function to get the product's name, picture, current price. Users can update their desired price on the products page. The backend graphql server scheduled run scrape jobs (every 12 hours) on every users' product and if the price on the website is dropped and meets the user's target price, a notification email will be sent to the user.

![gif products page](/assets/productspage.gif)

### Reponsive

![gif reponsive](/assets/reponsive.gif)

### Deploy

The project was deployed on: https://blankspacex.com/

# Track Wise - Price Tracker App

## Introduction

Have you ever been to a Woolworths and seen things you want to purchase that are not on Sale? What would you do in those situations? You may turn it off and wait for the next time or you may have to buy it anyway. Well, we probably have an unpleasant feeling in both cases.
To solve that problem, we developed Trackwise - a price tracker app that allows you to sets an alert on your favorite product & notifies you when prices drop. Enjoy buying things you need as soon as they are on Sale!

This is the single web page frontend for Track Wise App. If you want to visit the backend, please follow this [link](https://github.com/ethannguyen-uts/trackwise-backend/).

## Technologies

- React
- NextJS
- Urql Client
- Graphql Code Generator
- Typescript
- Tailwind CSS
- Formik

## Features

### Pages

The project has the following pages:

- Landing page
- Products Page
- Signup
- Login
- Forgot Password
- Change Password

#### Landing Page

A single page that introduces the Track Price App.
![gif landing page](/assets/landingpage.png?raw=true)

#### Products Page

![png product page](/assets/productspage.png)

The products page allows the user to input a product URL (currently supports Woolworth products). After clicking the Scrape button on Scrape Bar, the client executes the "Add Product" mutation, the Graphql server runs the scrape function to get the product's name, picture, current price, and displays on the page. Users can update the target price for their product. The backend graphql server scheduled run scheduled jobs to scrape all users' products' prices every 12 hours. If the price is dropped and meets the user's target price, a notification email will be sent to the user.

![gif products page](/assets/productspage.gif)

#### Sign Up

User input their personal information to set up their account, user needs to provide their email so that the app can send them a notification whenever the price of the product is dropped.

![gif signup](/assets/signup.gif)

#### Log in

After the user login, the graphql server sends a cookie to the browser that contains an encrypted value of the session created on the server. The browser will send this cookie with every user request for authentication purposes.

![gif login](/assets/login.gif)

#### Forgot password

The user inputs their email information, an email will send to the user so that the user can follow the link to reset their password.
![gif login](/assets/forgotpassword.gif)

### Reponsive Design

![gif reponsive](/assets/reponsive.gif)

### Deploy

The project was deployed on: https://blankspacex.com/

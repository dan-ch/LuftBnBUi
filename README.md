# LuftBnBUi

![homepage](https://res.cloudinary.com/dsgz1rsiu/image/upload/v1645314943/Github%20docs/luft1_sacyai.png)

## Description

LuftBnBUi is a frontend application(UI)/a part of hotel reservation system, just like the well-known ones such as Booking.com or AirBnb, that contains core functionalities of this type of software(more in section below). LuftBnBUi app provides a way to display received data and manipulate data using forms and other types of UI elements. This application is using Spring API, which is on my GitHub at this link: <https://github.com/dan-ch/LuftBnBApi>.

While working on this project, I learned primarily:

- how to store applicztion state using Context API
- how to connect React.js app with secured API using JWT and LocalStorage state
- how to facilitate work with Promises and queries with ReactQuery library

## Features

- Storing application state using Context API and Local Storage
- Sending requests with ReactQuery and axios
- CRUD operation on offers
- Adding and deleting offer comments
- Searching for offers based on the location, date range, number of people
- Booking offers and cancellation of booking
- Filtering of offers from the API by price and type
- User registration
- Authentication using JWT
- Data validation before sending request
- "Drag and drop" photo adding
- Image compression

## Built with

- TypeScript 4.5.2
- [React.js](https://pl.reactjs.org/) 17.0.2
- Context API
- [react-router](https://reactrouter.com/) 6.0.2
- [react-date-range](https://www.npmjs.com/package/react-date-range) 1.4.0
- [axios](https://www.npmjs.com/package/axios) 0.24.0
- [node-sass](https://www.npmjs.com/package/node-sass) 6.0.1
- [react-hook-form](https://react-hook-form.com/) 7.20.2
- [react-query](https://react-query.tanstack.com/) 3.34.7
- [react-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel) 3.2.22
- [yup](https://www.npmjs.com/package/yup) 0.32.11
- [react-dropzone](https://react-dropzone.js.org/) 11.5.3
- [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) 1.0.17
- [Material UI](https://mui.com/) ^5.2
- [moment](https://momentjs.com/) 2.29.1

## Getting started

You can try the LuftBnB hotel reservatiuon system at this link: <https://dan-ch.github.io/LuftBnBUi/>  
First you need to register as a new user(no email verification needed). Password should have 8 characters, 1 lower and 1 upper case letter, 1 special character and 1 digit.  
After registaration you can search for offers.

![search page](https://res.cloudinary.com/dsgz1rsiu/image/upload/v1645314919/Github%20docs/luft2_wewgyl.png)

### Prerequisites

- npm 8.1.2
- node 16.13.1
- API from <https://github.com/dan-ch/LuftBnBApi>

### Installation

1. Clone repository

    ```txt
    git clone https://github.com/dan-ch/LuftBnBUi
    ```

2. Install requierd packages using npm:

    ```txt
    npm install
    ```

3. Provide valid API URL in [.env](/.env) file ex. `REACT_APP_API_URL=http://localhost:8080/`. You can also use API that is deployed on Heroku at this link <https://luftbnb-api.herokuapp.com>

## Usage

To run the application simply paste and run the following command in your CLI

```txt
    npm start
```

## License

Distributed under the MIT License. See `LICENSE.txt`

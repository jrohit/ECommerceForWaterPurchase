# Project - BT - Water Purchase App.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Description

Water Purchase App provides basic features to user for purchasing water bags online through this App.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

Provide step-by-step instructions on how to install and run your project locally. Include any prerequisites and dependencies required for your project to function correctly.

Example:

1. Clone the repository: `git clone https://github.com/jrohit/bt-waterpurchaseapp.git`
2. Change to the project directory: `cd your-repo`
3. Install dependencies: `npm install`
4. Start the development server: `npm run start`
5. Front end runs on localhost:5000
6. Back end runs on localhost:8000
7. create .env file at root and in client folder.
8. At root .env file add PORT=8000 and MONGODB_URI to connect to port and mongodb
9. At client .env file add PORT=5000

## Usage

Features/Page/Screens -
Update Total Water Storage Capacity.
Get Total Capacity of water storage.
User can select any number of items in multiple quantites.
Shopping cart icon(on top right corner) will be populated with all the data.
Shopping cart can be viewed by clicking cart icon.
Shopping cart modal will display all the selected items in the selected quantities and calculate the price.
User can place order after entering payment details(TODO: Payment Integration)
Order will be created in the OrderCollection and PaymentCollection will be updated with orderId, transactionId
Order created with Pending Status, will deficit the water quantity from the storage tank on UI.

Next to cart Icon - Admins can login(JWT Token imitation. TODO: Login Implementaion)
They can see all the orders(desc sorted).
The data is paginated. Admin can navigate back and forth to see the data.
Admin can search data through search query.
Admin can update the status of the order to any of the remaining order status.
If a order is cancelled. Water bags return to water tank - updates the water storage level.

## Technologies Used

List the technologies, frameworks, and libraries you used to build your project.

Example:

- React.js
- Node.js
- Express.js
- MongoDB/Mongoose

## Contact

If you have any questions or suggestions, feel free to reach out to me:

- Name: Rohit Jain
- GitHub: [Your GitHub Profile](https://github.com/jrohit)
- Email: 4178929+jrohit@users.noreply.github.com
- Website: [Your Personal Website](hhttps://jrohit.github.io/ResumeRohitJain)

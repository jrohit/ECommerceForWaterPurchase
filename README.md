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
4. Change directory to client : `cd client`
5. run `npm install` and `cd ..`
6.
7. Start the both server concurrently: `npm run start`
8. Front end runs on localhost:5000
9. Back end runs on localhost:8000
10. create .env file at root and in client folder.
11. At root .env file add PORT=8000 and MONGODB_URI to connect to port and mongodb
12. At client .env file add PORT=5000

//For any cors issue, check the server.js and update origins

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
Login userid pwd is dummy and constant.
They can see all the orders(desc sorted).
The data is paginated. Admin can navigate back and forth to see the data.
Admin can search data through search query.
Admin can update the status of the order to any of the remaining order status.
If a order is cancelled. Water bags return to water tank - updates the water storage level.

For Testing API through local - Provide mongodb uri and use below
{{ _.BASE_URL }} === "localhost:8000"

1. To Fetch All Orders - {{ _.BASE_URL }}/order/fetchAllOrders(GET)
2. To Submit Order - {{ _.BASE_URL }}/order/submitOrder (Post)

`{
  "cartItems": [
    {
      "description": "3 Gallon Water Bottle",
      "gallonSize": 3,
      "price": 249.99,
      "quantity": 1
    },
		{
      "description": "5 Gallon Water Bottle",
      "gallonSize": 5,
      "price": 499.99,
      "quantity": 1
    }
  ],
  "paymentDetails": {
    "cardHolderName": "User 2",
    "cardNumber": "1234567891223323",
    "cvv": "454",
    "expiryDate": "12/23"
  },
  "totalPrice": "289.99"
}`

3. To Delete Order - {{ _.BASE_URL }}/order/deleteOrder (Post)
   `{
	"order" : {
			"orderId": 2
		}
}`
4. To Update Order - {{ _.BASE_URL }}/order/updateOrder (Post)
   `{
	"order" : {
			"_id": "64bc1beb21998a65b06c6104",
			"orderId": 1,
		},
	"orderStatus" : {
		"label" : "Completed",
		"value" : "Completed"
	}
}`
5. Fetch Water Storage Cap - {{ _.BASE_URL }}/water/getWaterTotalQuantity (Post)
6. Update water Storage Cap {{ _.BASE_URL }}/water/updateWaterStorageCapacity (Post)
   `{
	"quantity" : 147
}`

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

```

```

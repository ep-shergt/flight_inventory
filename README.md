# flight_inventory

A single page app with the basic functionality of a flight inventory

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites

You need to have NodeJS and npm installed.
If you do not wish to use my remote database, you will have to create and link to your own MySQL database.


### Installing the project

* Clone the repository.
* Open a console and 'cd' into the project folder.
* Enter 'npm install' upon which all needed packages will be installed

For development:

* Open webpack.config.js and comment out 

```
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
```
* In dev/store.js uncomment

```
//import logger from "redux-logger";
//const middleware = applyMiddleware(promise(), thunk, logger())
```

and comment

```
const middleware = applyMiddleware(promise(), thunk)
```
* Type 'webpack' in your console and your app will build automatically upon every save action


### Setting up the database

In the server folder you need to create a 'config.php' file with the following content:

```
<?php
	define('HOST', 'yourhostpath');
	define('USERNAME', 'yourusername');
	define('PASSWORD', 'yourdatabasepassword');
	define('DB', 'yourdatabasename');
?>
```

## Testing the app

The app can be tested at this [URL.](http://maxpower.rigel.uberspace.de/flights/)

By default you are assumed to be a customer who can only search flights and book them.

The login data for the admin access are
* username = Admin
* password = 123456

Flights can be created, updated and deleted by the admin only. If no data is passed to the search, all flights from the database are returned. 

## Authors

* **Steven Hergt**

## License

This project is licensed under the MIT License

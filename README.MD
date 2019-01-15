**Angular Contact Book Application**

- Backend is written in NodeJS and Sequelize as an ORM
- Frontend is written in Angular 1.4.9
_______________

There are some ready-made modules I chose to make use of, please see 'Application.js' to see the documentation

For the data layer I used Sequelize - Sequelize is a promise-based ORM for Node.js.
It supports the dialects MySQL and SQLite (and more): http://docs.sequelizejs.com

Please see 'models/README.MD' for models and ORM explanation

_______________

Installation sequence

1. Please install MySQL service - it needs to be up, working and running
2. Sequelize sometimes make some troubles creating the database itself (from local CLI) so I prefer
   To ask you to dump 'database/database.sql' to MySQL - it will create the tables and insert the data

   Even though I have created the commands in 'package.json' (see npm db:init) - sometimes there are some problems with the permissions
   Also see please 'bin/www.js', Sequelize is using '.sync()' method to validate the data schemas has being created correctly and to synchronize it
   In the 'migrations' folder there are the migration files and in the 'seeders' there are the seeders (I used faker.js to insert fake data)

3. Of course afterwards run
    3.1 $ npm install
    3.2 $ npm start

4. For the tests I chose to use Mocha & Chai, run $ npm test to run tests

_______________

Please just make sure port 3000 is available to use
hit npm install & npm start
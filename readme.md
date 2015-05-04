#Lab 9

##Usage
First, ensure an instance of mongoDB is running.

After that run:
  npm install
To install all of the node modules. Alternatively, the applications is published on npm and can be fully installed by running:
  npm install tw33t_t1ck3r
The app is currently published as a module.

Then run:
  npm start

After that visit 'localhost:3000' to see it up and running.

The landing page will allow you to choose between conversions and tweet ticking.

##Mongo 
Mongo was easy to play with, as it lets you put objects in directly and does all the the magic on its own. Finding and destroying the database was also as simple as removing/selecting {} which corresponding to all options. PullData now automatically pulls to the MongoDB using insert and everything else just works.

If you specify 'mongo' as the output location it stores things in the DB when you pull, otherwise it'll store in the specified file directly without touching the DB. If you mention mongo then it'll remove the DB and store it in there.

##Comments
I feel like there's a lot more to Mongo than we've gotten to see, and I'd like to play with it more/be more exposed to the many things it can do.
#Lab 9

##Usage
First, ensure an instance of mongo is running with the dbpath flag set to the applicaiton's data path (the /data/ at the root directory).

After that, upon installing node downloading the application (and permitting express through your firewall/opening port 3000 if necessary) you should have all the files you need to run my server and app set up so long as you have a constant internet connection.

Go to the top directory of the application and type 'node server.js' to start the server once the mongod instance is connected.

Then visit 'localhost:3000' to see it up and running.

Click the settings button to go to the sidebar, where you can pull new tweets with a filter query or scroll to the bottom to export whatever exists in the 'tweets' collection in the MongoDB data to a filename of your choice.

##Mongo 
Mongo was easy to play with, as it lets you put objects in directly and does all the the magic on its own. Finding and destroying the database was also as simple as removing/selecting {} which corresponding to all options. PullData now automatically pulls to the MongoDB using insert and everything else just works.

If you specify 'mongo' as the output location it stores things in the DB when you pull, otherwise it'll store in the specified file directly without touching the DB. If you mention mongo then it'll remove the DB and store it in there.

##Comments
I feel like there's a lot more to Mongo than we've gotten to see, and I'd like to play with it more/be more exposed to the many things it can do.
##Update:
My visualize button is the new last option involving analysis.

The most recent update repairs minor bugs with the previous implementation and adds a tweet stats page which displays the relationship between the number of friends and followers users have, the most common characters used in tweets (excluding whitespace, which was surprisingly common despite the limited space), and a tweet size frequency distribution. All of this uses Chart.js for functional and elegant graphs.

Additionally, the familiar side menu is attached to the top of the page for easy access and tweet pulling from the analysis page.

#tw33t_t1cker

##Usage
First, ensure an instance of mongoDB is running.

After that run:
  npm install

To install all of the node modules. Alternatively, the applications is published on npm and can be fully installed by navigating to an empty directory and running:
  npm install tw33t_t1ck3r

Then run (after ensuring mongodb is running):
  npm start

After that visit 'localhost:3000' to see it up and running.

The landing page will allow you to choose between conversions and tweet ticking.

##Installer 
Setting up the installer was a bit complicated. Wanting to use NPM, I didn't realize it so eagerly forces you to install to a node_modules folder if you download from the package manager.

To get a around that I did something a bit hackish, and allow npm to do its thing before copying my source to the root of the app and then removing my source. See the move_it and remove_it js files for exactly how I did that. The two scripts are hooked in using npm scripts install and postinstall, both of which are actually called after install. I separated them due to async handling errors that were fixed by the ordered calls npm makes upon installing.

##Landing page
The landing page remains quite simply. My art is actually courtesy of RPISEC. As I'm going with the name "tw33t_t1ck3r" I decided I wanted a clean hacker-ish feel, keeping the white theme of my subpages and adding the dark theme of my landing page for contrast between contexts.

##Fields and Buttons
In the various applications you'll find the buttons asked for (all from previous labs). The tweet ticker has a settings icon in the top left corner that will give you access to its forms, while the csv converter is just the input needed!

##Mongo to JSON to CSV
To convert mongo to JSON, export the data in the tweet ticker. Then navigate to the converter to convert that data to csv.

##Tweet Refreshing
As handled in the previous lab, you can specify a query to search and access new tweets by filling out the Pull Data form and clicking Pull Data. You can then quickly click Export, as the form for the file name will autofill basd on your input in the Pull Data form.

##Responsiveness
The site is responsive mainly thanks to CSS, with a little credit going to jquery-mobile for handling its own issues well enough. Percents and media queries were used to ensure a positive experience.

##Branding
My branding is simple, clean, l33t feel as exhibited by the landing page and tied together by the clean/meaningful design.
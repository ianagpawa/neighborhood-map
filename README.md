# TacoHub
### By Ian Agpawa
##### This repo is for my neighborhood map project from the Udacity's Full Stack Web Developer Nanodegree course.  This app utilizes Foursquare API.  


### Quick Start
-Clone the repo: `git clone https://github.com/ianagpawa/neighborhood-map.git`


### Before Starting The App
Foursquare API keys are needed for the app to function properly.  Visit `https://developer.foursquare.com/` to receive your free Foursquare API keys.  

After receiving your Foursquare API keys, you will need to create `secrets.js` in the `js` folder of the directory.  In the `secrets.js` file, you will need to declare the following variables:
```
var CLIENT_ID = {{YOUR CLIENT_ID}}
var CLIENT_SECRET = {{YOUR CLIENT_SECRET}}

```

#### Viewing the app locally
While in the project folder, execute the following command:
```
python -m SimpleHTTPServer
```
then point your broser to `0.0.0.0:8000`.

Alternatively, the app can be viewed by opening file `index.html` with your browser.  

### What's included
Within the project folder, you will find the following files:

```
neighborhood-map/
    ├── css/
    |   └── main.css
    ├── js/
    |   ├── lib/
    |   |    ├── jquery-3.1.1.min.js
    |   |    └── knockout-3.4.1.js
    |   ├── app.js
    |   ├── map.js
    |   └─── restaurants.js
    ├── index.html
    └── README.md
```

## Creator

**Ian Agpawa**


[Github](https://github.com/ianagpawa)

 agpawaji@gmail.com

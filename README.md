
## You can view the project live on

Deployed on [<https://tinyurl.com/react-portfolio>]

## Creator

- [Abhishek Prajapati](https://github.com/just-be-weird)

### Installing

After cloning the repo follow the below steps:

Open the project folder at the root in the terminal and run `npm install` to download the dependencies needed for this project.

Next, to run the source version of the application locally using Node and Express run command `npm start` and navigate to [localhost:3000](http://localhost:3000/) in your browser.

----------------------------------------------------------------------------
### Firebase Issues-
1. initializeApp - ```Not able to get the firebase config object.```
    To resolve this issue
    1. cd into [functions] dir
    2. set the variables required by firbase.initializeApp() by running below command. We need to replace required_key and value each time and run the command
        `firebase functions:config:set root_identifier.required_key="value for that key"`
    eg: `firebase functions:config:set react_app.auth_domain="auth-domain.firebaseapps.com"`

    3. Once done run `firebase functions:config:get > .runtimeconfig.json` to verify the values by opening this file in functions dir.

    4. run `npm i firebase-functions` inside functions dir
    
    5. Now we can get the values of required by 
    `const firebase = require("firebase");
    const functions = require("firebase-functions");
    const config = functions.config();
    const firebaseInstance = firebase.initializeApp({
        apiKey: config.portfolio.api_key,
        authDomain: config.portfolio.auth_domain,
        databaseURL: config.portfolio.database_url,
        projectId: config.portfolio.project_id,
        storageBucket: config.portfolio.storage_bucket,
        messagingSenderId: config.portfolio.messaging_sender_id,
        appId: config.portfolio.app_id,
    });`
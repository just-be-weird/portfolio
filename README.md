## You can view the project live on

Deployed on [<https://tinyurl.com/react-portfolio>]

## Creator

-   [Abhishek Prajapati](https://github.com/just-be-weird)

### Installing

After cloning the repo follow the below steps:

Open the project folder at the root in the terminal and run `npm install` to download the dependencies needed for this project.

Next, to run the source version of the application locally using Node and Express run command `npm start` and navigate to [localhost:3000](http://localhost:3000/) in your browser.

#### Firebase credential setup

- We need `firebase` installed globally. Use `npm install -g firebase-tools`, then run `firbase login` which will open login window in crome where we need to provide the login credentials. Run `firebase init` command after this. Choose `Functions and hosting`

- we need to provide the `.env`, `firebase.ini.defaults.sh` with following details:
.env example data: which we can get from firebase console > project details > config object

`REACT_APP_FIREBASE_API_KEY=fwioejrnrio3tfo893453kn4o83u4tk4t
REACT_APP_FIREBASE_AUTH_DOMAIN=mycool-app.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://mycool-app.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=mycool-app
REACT_APP_FIREBASE_STORAGE_BUCKET=mycool-app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=23838327302387
REACT_APP_FIREBASE_APP_ID=1:23838327302387:web:389404jk932e4k4`

Same data needs to be provided inside firebase.ini.defaults.sh but with following format

`export apiKey=fwioejrnrio3tfo893453kn4o83u4tk4t,
export authDomain=mycool-app.firebaseapp.com,
export appId=1...`

- cd into functions root dir and run following command to setup `.runtimeconfig.json`
`firebase functions:config:get > .runtimeconfig.json`

---

### Firebase Issues-

1. initializeApp - `Not able to get the firebase config object.`
   To resolve this issue

    1. cd into [functions] dir
    2. set the variables required by firbase.initializeApp() by running below command. We need to replace required_key and value each time and run the command
       `firebase functions:config:set root_identifier.required_key="value for that key"`
       eg: `firebase functions:config:set react_app.auth_domain="auth-domain.firebaseapps.com"`

    3. Once done run `firebase functions:config:get > .runtimeconfig.json` to verify the values by opening this file in functions dir.

    4. run `npm i firebase-functions` inside functions dir

    5. Now we can get the values of required by firebase config as below
       `const firebase = require("firebase"); const functions = require("firebase-functions"); const config = functions.config(); const firebaseInstance = firebase.initializeApp({ apiKey: config.portfolio.api_key, authDomain: config.portfolio.auth_domain, databaseURL: config.portfolio.database_url, projectId: config.portfolio.project_id, storageBucket: config.portfolio.storage_bucket, messagingSenderId: config.portfolio.messaging_sender_id, appId: config.portfolio.app_id, });`

---

### Redux Overview-

    1. Tie Up Redux store using Provider (redux)
    2. Setup Reducer, ActionTypes and Action
    3. Connect them using connect (react-redux)
        1. connect needs 3 things - mapStateToProps, mapActionsToProps,
        2. define the required map argument above connect call
            Here mapstatetoprops is a function which receives global state and we take whatever we need.
            eg. `const mapStateToProps = state => ({
                user: state.user,
                ui: state.ui
            });
            const mapActionsToProps = state => ({
                user: state.user,
                ui: state.ui
            })`  or we can pass actions inline in `connect(mapStateToProps, { nameOfTheAction })()`
        3. Once done that define propTypes for each state and action

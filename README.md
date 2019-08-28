## You can view the project live on

Deployed on [<https://tinyurl.com/react-portfolio>]

## Creator

-   [Abhishek Prajapati](https://github.com/just-be-weird)

### Installing

After cloning the repo follow the below steps:

Open the project folder at the root in the terminal and run `npm install` to download the dependencies needed for this project.

Next, to run the source version of the application locally using Node and Express run command `npm start` and navigate to [localhost:3000](http://localhost:3000/) in your browser.

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

#Todo
1. clear input option
2. minify js before upload to firebase
3. add option for logout in nav with user face on click should show dropdown with optios available
4. Build a page for viewing all users
5. Intigrate notificatons for user actions
6. Provide messaging platform for users
7. Update the projects details

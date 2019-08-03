//This is our root reducer
import { combineReducers } from 'redux';
import ui from './ui';
import auth from './auth';
import profile from './profile';

//These will evantually evalutae to state object from where we can expose different values to components across application
export default combineReducers({
    auth,
    ui,
    profile
});
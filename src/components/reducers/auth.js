import { firebase, googleAuthProvider } from '../Firebase/Firebase'

export default (uid) => ({
    type: 'LOGIN',
    uid
  });
  
import { initializeApp } from "firebase/app";
import { OAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new OAuthProvider('microsoft.com');

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    // Force re-consent.
    // tenant: '1cdd977a-46b7-416d-a7c1-3ac159e6b565',
});
export const auth = getAuth();
export const signInWithMicrosoftPopup = async () => {
    let response = null
    const auth = getAuth();
    await signInWithPopup(auth, provider)
    .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const idToken = credential?.idToken;

        console.log(accessToken)
        console.log(idToken)

        response=credential
    })
    .catch((error) => {
        // Handle error.
    });
    return response
};
export const logoutUser = () =>  signOut(auth);
export default getFirestore(firebaseApp);
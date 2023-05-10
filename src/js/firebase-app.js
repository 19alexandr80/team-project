import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyA0Twt9JJx7KChBOO37tFJHbHS8iJvtnU4",
  authDomain: "team-project-d4f13.firebaseapp.com",
  projectId: "team-project-d4f13",
  storageBucket: "team-project-d4f13.appspot.com",
  messagingSenderId: "378146701089",
  appId: "1:378146701089:web:bf98f84a8f9624c7460860",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export class DataFirebase {
  constructor() {
    this.app =
      "https://team-project-d4f13-default-rtdb.europe-west1.firebasedatabase.app/";
  }
  async postRequest(request, email) {
    try {
      // const nikEmail = email.substring(0, email.indexOf("."));
      const response = await axios.post(
        `${this.app}box/${email}.json`,
        request
      );

      return response;
    } catch (error) {
      console.error("post-error", error);
      // alert(error.message);
    }
  }
  async getRequest(email) {
    try {
      // const nikEmail = email.substring(0, email.indexOf("."));
      const respon = await axios.get(`${this.app}box/${email}.json`);
      console.log(respon.data);
      return respon.data;
    } catch (error) {
      console.error("get-error", error);
      // alert(error.message);
    }
  }
  // ==========================================================================================

  async getGoogl() {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // console.log("token", token);
          // The signed-in user info.
          const user = result.user;
          console.log("user", user);
          console.log("user photoUrl", user.photoURL);
          console.log("user tel", user.phoneNumber);

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error message", errorMessage);
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } catch (error) {
      console.error("get-error", error);
      // alert(error.message);
    }
  }
}

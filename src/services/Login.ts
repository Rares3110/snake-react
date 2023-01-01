import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import userData from "../stores/UserData";

export const signUp = async(email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        userData.setUser(userCredential.user);
        return true;
    }).then(() => {
        return false;
    });
}

export const Login = async(email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        userData.setUser(userCredential.user);
        return true;
    }).then(() => {
        return false;
    });
}

export const Logout = async() => {
    return signOut(auth).then(() => {
        userData.removeUser();
        return true;
    }).catch(() => {
        return false;
    });
}
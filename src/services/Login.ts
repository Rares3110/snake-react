import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./FirebaseConnection";
import userData from "../stores/UserData";

export const signUp = async(email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        userData.setUser(userCredential.user);
        return true;
    }).catch(() => {
        return false;
    });
}

export const login = async(email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        userData.setUser(userCredential.user);
        return true;
    }).catch(() => {
        return false;
    });
}

export const logout = async() => {
    return signOut(auth).then(() => {
        userData.removeUser();
        return true;
    }).catch(() => {
        return false;
    });
}
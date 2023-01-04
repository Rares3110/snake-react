import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./FirebaseConnection";
import userData from "../stores/UserData";
import { getIcon } from "./UserInfo";

export const signUp = async(email: string, username: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        userData.setUser(userCredential.user);

        updateProfile(userCredential.user, {
            displayName: username
        });
        
        return true;
    }).catch(() => {
        return false;
    });
}

export const login = async(email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        userData.setUser(userCredential.user);

        getIcon().then((value) => {
            if(value !== undefined) {
                userData.setIcon(value);
            }
        });

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
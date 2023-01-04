import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import userData from "../stores/UserData";
import {auth, storage} from "./FirebaseConnection";
import { updateProfile } from "firebase/auth";

export const changeIcon = async(icon: File):Promise<boolean> => {
    if(userData.id !== undefined) {
        await uploadBytes(ref(storage, 'icons/' + userData.id), icon);
        return true;
    } else {
        return false;
    }
}

export const getIcon = async() => {
    if(userData.id !== undefined) {
        return await getDownloadURL(ref(storage, 'icons/' + userData.id));
    } else {
        return undefined;
    }
}

export const setUsername = async(username: string) => {
    if(auth.currentUser !== null) {
        updateProfile(auth.currentUser, {
            displayName: username
        }).then(() => {
            userData.setUsername(username);
        });
    }
}
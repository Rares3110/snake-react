import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import userData from "../stores/UserData";
import {storage} from "./FirebaseConnection";

export const changeIcon = async(icon: File):Promise<boolean> => {
    if(userData.user !== undefined) {
        await uploadBytes(ref(storage, 'icons/' + userData.user.uid), icon);
        return true;
    } else {
        return false;
    }
}

export const getIcon = async() => {
    if(userData.user !== undefined) {
        return await getDownloadURL(ref(storage, 'icons/' + userData.user.uid));
    } else {
        return undefined;
    }
}
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestoreDB } from "./FirebaseConnection";
import userData from "../stores/UserData";
import { getIcon } from "./UserInfo";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signUp = async(email: string, username: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        setDoc(doc(firestoreDB, "users", userCredential.user.uid), {
            username: username,
            maxScore: 0,
            secondsForMaxScore: 0,
            gamesPlayed: 0
        }).then(() => {
            userData.setUser(userCredential.user);
            userData.setUsername(username);
        });
        
        return true;
    }).catch(() => {
        return false;
    });
}

export const login = async(email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        userData.setUser(userCredential.user);

        getIcon(userData.id).then((value) => {
            if(value !== undefined) {
                userData.setIcon(value);
            }
        });

        getDoc(doc(firestoreDB, "users", userCredential.user.uid)).then((rez) => {
            const values = rez.data();

            if(values) {
                userData.setUsername(values.username);

                userData.setGameStats(
                    values.maxScore,
                    values.secondsForMaxScore,
                    values.gamesPlayed
                );
            }
        })

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
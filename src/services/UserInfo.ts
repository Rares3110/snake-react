import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import userData from "../stores/UserData";
import {firestoreDB, storage} from "./FirebaseConnection";
import { addDoc, collection, doc, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, updateDoc, startAfter, Timestamp } from "firebase/firestore";

export const changeIcon = async(icon: File):Promise<boolean> => {
    if(userData.id !== undefined) {
        await uploadBytes(ref(storage, 'icons/' + userData.id), icon);
        return true;
    } else {
        return false;
    }
}

export const getIcon = async(id: string | undefined) => {
    if(id !== undefined) {
        return await getDownloadURL(ref(storage, 'icons/' + id));
    } else {
        return undefined;
    }
}

export const setUsername = async(username: string) => {
    if(userData.id !== undefined) {
        updateDoc(doc(firestoreDB, 'users', userData.id), {
            username: username
        }).then(() => {
            userData.setUsername(username);
        });
    }
}

export const addGame = (score: number, seconds: number) => {
    if(userData.id !== undefined) {
        addDoc(collection(firestoreDB, 'users/' + userData.id + '/scores'), {
            score: score,
            seconds: seconds,
            date: Timestamp.fromMillis(Date.now())
        }).then(() => {
            userData.addGame(score, seconds);

            if(userData.id !== undefined)
                updateDoc(doc(firestoreDB, 'users', userData.id), {
                    maxScore: userData.maxScore,
                    secondsForMaxScore: userData.secondsForMaxScore,
                    gamesPlayed: userData.gamesPlayed
                });
        });
    }
}

var lastHistoryRecord: QueryDocumentSnapshot<DocumentData>;
var historyNotFull: boolean;
export interface HistoryElement {
    score: number,
    seconds: number,
    date: Date
}
export const getHistory = async(initial: boolean = true, toReturn: number):Promise<HistoryElement[]> => {
    if(userData.id !== undefined && initial) {

        return getDocs(query(
            collection(firestoreDB, 'users/' + userData.id + '/scores'), 
            orderBy("date", "desc"),
            limit(toReturn)
        )).then((docSnap) => {

            if(docSnap.docs.length < toReturn) {
                historyNotFull = false;
            } else {
                historyNotFull = true;
            }

            if(docSnap.docs.length > 0) {
                lastHistoryRecord = docSnap.docs[docSnap.docs.length - 1];
                return docSnap.docs.map((doc) => doc.data()).map((value) => {
                    return {
                        score: value.score,
                        seconds: value.seconds,
                        date: value.date.toDate()
                    };
                });
            } else {
                return [];
            }

        });

    } else if(userData.id !== undefined && historyNotFull) {

        return getDocs(query(
            collection(firestoreDB, 'users/' + userData.id + '/scores'), 
            orderBy("date", "desc"),
            startAfter(lastHistoryRecord),
            limit(toReturn)
        )).then((docSnap) => {

            if(docSnap.docs.length < toReturn) {
                historyNotFull = false;
           }

            if(docSnap.docs.length > 0) {
                lastHistoryRecord = docSnap.docs[docSnap.docs.length - 1];
                return docSnap.docs.map((doc) => doc.data()).map((value) => {
                    return {
                        score: value.score,
                        seconds: value.seconds,
                        date: value.date.toDate()
                    };
                });
            } else {
                return [];
            }

        });

    } else {
        return [];
    }
}

export interface TopUserInfo {
    id: string,
    maxScore: number,
    secondsForMaxScore: number,
    gamesPlayed: number
}
export const getTopUsersByScore = async():Promise<TopUserInfo[]> => {
    return getDocs(query(
        collection(firestoreDB, 'users'), 
        orderBy("maxScore", "desc"),
        orderBy("secondsForMaxScore"),
        limit(30)
    )).then((docSnap) => {
        return docSnap.docs.map((doc) => {
            let value = doc.data();

            return {
                id: doc.id,
                maxScore: value.maxScore,
                secondsForMaxScore: value.secondsForMaxScore,
                gamesPlayed: value.gamesPlayed
            }
        });
    }).catch(() => {
        return [];
    });
}
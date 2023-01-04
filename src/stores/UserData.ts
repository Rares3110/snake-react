import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

class UserData {
    id?: string;
    username?: string;
    email?: string;
    icon?: string;
    maxScore: number = 0;
    secondsForMaxScore: number = 0;
    gamesPlayed: number = 0;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: 'UserDataStore', properties: ['id', 'email', 'username', 'icon'], storage: window.localStorage });
    }

    setUser(user: User) {
        this.id = user.uid;
        this.email = user.email ?? undefined;
        this.username = user.displayName ?? undefined;
    }

    setId(id: string) {
        this.id = id;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setIcon(icon: string) {
        this.icon = icon;
    }

    setGameStats(maxScore: number, secondsForMaxScore: number, gamesPlayed: number) {
        this.maxScore = maxScore;
        this.secondsForMaxScore = secondsForMaxScore;
        this.gamesPlayed = gamesPlayed;
    }

    addGame(score: number, secondsForScore: number) {
        if(this.maxScore < score) {
            this.maxScore = score;
            this.secondsForMaxScore = secondsForScore;
        } else if(this.maxScore === score) {
            this.secondsForMaxScore = Math.min(this.secondsForMaxScore, secondsForScore);
        }

        this.gamesPlayed++;
    }

    removeUser() {
        this.id = undefined;
        this.email = undefined;
        this.username = undefined;
        this.icon = undefined;
        this.maxScore = 0;
        this.secondsForMaxScore = 0;
        this.gamesPlayed = 0;
    }
}

const userData = new UserData();
export default userData;
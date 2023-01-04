import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

class UserData {
    id?: string;
    username?: string;
    email?: string;
    icon?: string;

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

    removeUser() {
        this.id = undefined;
        this.email = undefined;
        this.username = undefined;
        this.icon = undefined;
    }
}

const userData = new UserData();
export default userData;
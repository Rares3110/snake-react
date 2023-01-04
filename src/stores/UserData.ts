import { makeAutoObservable } from "mobx";
import { User } from "firebase/auth";
import { makePersistable } from 'mobx-persist-store';

class UserData {
    user?: User;
    icon?: string;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: 'UserDataStore', properties: ['user', 'icon'], storage: window.localStorage });
    }

    setUser(user: User) {
        this.user = user;
    }

    removeUser() {
        this.user = undefined;
        this.icon = undefined;
    }

    setIcon(icon: string) {
        this.icon = icon;
    }
}

const userData = new UserData();
export default userData;
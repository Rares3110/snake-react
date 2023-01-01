import { makeAutoObservable } from "mobx";
import { User } from "firebase/auth";

class UserData {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.user = user;
    }

    removeUser() {
        this.user = null;
    }
}

const userData = new UserData();
export default userData;
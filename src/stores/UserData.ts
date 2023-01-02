import { makeAutoObservable } from "mobx";
import { User } from "firebase/auth";
import { makePersistable } from 'mobx-persist-store';

class UserData {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: 'UserDataStore',
            properties: [
                {
                    key: 'user',
                    serialize: (value) => {
                        return value;
                    },
                    deserialize: (value) => {
                        return value;
                    },
                },
            ],
            storage: window.localStorage,
        });
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
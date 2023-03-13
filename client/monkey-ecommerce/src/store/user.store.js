import { Subject } from 'rxjs';

const subject$ = new Subject();
const initialState = {
    user: {
        email: '',
        token: ''
    }
};

let state = initialState;

const userStore = {
    subscribe: (setState) =>
        subject$.subscribe((state) =>
            setState(state)),
    setUser: (user) => {
        state = {
            ...state,
            user: {
                email: user.email ?? '',
                token: user.token ?? ''
            }
        };
        subject$.next(state);
    },
    initialState: initialState
};

export default userStore;

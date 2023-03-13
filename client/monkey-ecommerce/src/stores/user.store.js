import { BehaviorSubject } from 'rxjs';

const initialState = {
    email: '',
    token: '',
    isAuthenticated: false
};
const subject$ = new BehaviorSubject(initialState);

let state = initialState;

const userStore = {
    subscribe: (setState) =>
        subject$.subscribe((state) =>
            setState(state)),
    setUser: ({
        email,
        token,
        isAuthenticated
    }) => {
        state = {
            ...state,
            email: email ?? '',
            token: token ?? '',
            isAuthenticated: isAuthenticated ?? false
        };
        subject$.next(state);
    },
    initialState: initialState
};

export default userStore;

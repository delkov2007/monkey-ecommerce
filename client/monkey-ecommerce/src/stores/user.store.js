import { BehaviorSubject } from 'rxjs';

const initialState = {
    _id: '',
    name: '',
    email: '',
    token: '',
    role: '',
    isAuthenticated: false
};
const subject$ = new BehaviorSubject(initialState);

let state = initialState;

const userStore = {
    subscribe: (setState) =>
        subject$.subscribe((state) =>
            setState(state)),
    setUser: ({
        _id,
        name,
        email,
        token,
        role,
        isAuthenticated
    }) => {
        state = {
            ...state,
            _id: _id ?? '',
            name: name ?? '',
            email: email ?? '',
            token: token ?? '',
            role: role ?? '',
            isAuthenticated: isAuthenticated ?? false
        };
        subject$.next(state);
    },
    initialState: initialState
};

export default userStore;

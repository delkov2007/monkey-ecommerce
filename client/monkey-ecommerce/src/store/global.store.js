import { Subject } from 'rxjs';

const subject$ = new Subject();
const initialState = {
    user: {}
};

export const store = {
    subscribe: (setState) =>
        subject$.subscribe((state) =>
            setState(state)),
    initialState: initialState
};

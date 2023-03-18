import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/user.store";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(userStore.initialState);

    useEffect(() => {
        const subscription = userStore.subscribe(setUser);
        return subscription.unsubscribe();
    }, []);

    useEffect(() => {
        debugger;
        const canActivate = user;
    }, [user]);

    return (
        <h1>Home page</h1>
    );
};

export default Home;
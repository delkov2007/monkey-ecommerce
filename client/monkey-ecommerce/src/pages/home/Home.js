import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    debugger;
    const user = useSelector(state => ({ ...state?.user }));

    useEffect(() => {
        debugger;
    }, [user]);
    return (
        <></>
    );
};

export default Home;
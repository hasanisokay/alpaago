import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Weather from "./Weather";

const Home = () => {

    useEffect(() => {

    }, [])
    return (
        <div>
            <Helmet>
                <title>Home - Alpaago</title>
            </Helmet>
            <Weather />

        </div>
    );
};

export default Home;
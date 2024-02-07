import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Weather from "./Weather";
import UserTable from "../users/UserTable";

const Home = () => {

    useEffect(() => {

    }, [])
    return (
        <div>
            <Helmet>
                <title>Home - Alpaago</title>
            </Helmet>
            <Weather />
            <UserTable />

        </div>
    );
};

export default Home;
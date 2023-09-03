import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
};
const fetchSuperFriends = () => {
    return axios.get("http://localhost:4000/friends");
};

const ParallelQueriesPage = () => {
    const { data: superHeroes } = useQuery(["super-heroes"], fetchSuperHeroes);
    const { data: friends } = useQuery(["friends"], fetchSuperFriends);
    return (
        <>
            <h1>Heros:</h1>
            <div>{JSON.stringify(superHeroes?.data)}</div>
            <h1>Friends:</h1>
            <div>{JSON.stringify(friends?.data)}</div>
        </>
    );
};

export default ParallelQueriesPage;

import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (id) => {
    return axios.get("http://localhost:4000/superheroes/" + id);
};

const DynamicParallelQueriesPage = ({ ids }) => {
    const result = useQueries(
        ids.map((id) => ({
            queryKey: ["super-heroes", id],
            queryFn: () => fetchSuperHero(id),
        }))
    );

    console.log(result);
    return <>{JSON.stringify(result.map((r) => r?.data?.data))}</>;
};

export default DynamicParallelQueriesPage;

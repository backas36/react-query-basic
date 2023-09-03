import { useState } from "react";
import { Link } from "react-router-dom";
import useSuperHeroesData, {
    useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";

const RqSuperHeroesPage = () => {
    const [name, setName] = useState("");
    const [alterEgo, setAlterEgo] = useState("");

    const onSuccess = () => {
        console.log("data fetching success");
    };
    const onError = (err) => {
        console.log("data fetching failed", err);
    };
    const { isLoading, data, isError, error, isFetching, refetch } =
        useSuperHeroesData(onSuccess, onError);

    const { mutate: addHero } = useAddSuperHeroData();
    console.log({
        isLoading,
        isFetching,
    });

    const handleAddHeroClick = () => {
        const hero = { name, alterEgo };
        addHero(hero);
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isFetching) {
        return <h1>Fetching...</h1>;
    }
    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <div>
            <h2>React Query Super Heroes Page</h2>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                value={alterEgo}
                onChange={(e) => setAlterEgo(e.target.value)}
            />
            <button onClick={handleAddHeroClick}>Add Hero</button>
            <button onClick={refetch}>Refetch</button>
            {data?.map((hero) => {
                return (
                    <li key={hero.name}>
                        <Link to={`/super-heroes/${hero.id}`}>{hero.name}</Link>
                    </li>
                );
            })}
        </div>
    );
};

export default RqSuperHeroesPage;

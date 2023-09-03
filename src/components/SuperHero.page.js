import { useParams } from "react-router-dom";
import useSuperHeroData from "../hooks/useSuperHeroData";

const SuperHeroPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useSuperHeroData(id);
    console.log(data);
    if (isLoading) {
        return <h1>Loading....</h1>;
    }
    return <div>{JSON.stringify(data?.data)}</div>;
};

export default SuperHeroPage;

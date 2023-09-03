import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = (props) => {
    console.log(props);
    const heroId = props.queryKey[1];
    return axios.get("http://localhost:4000/superheroes/" + heroId);
};

const useSuperHeroData = (id) => {
    const queryClient = useQueryClient();
    const result = useQuery(["super-heroes", id], fetchSuperHero, {
        initialData: () => {
            const hero = queryClient
                .getQueryData("super-heroes")
                ?.data?.find((hero) => hero.id === parseInt(id));
            if (hero) {
                return {
                    data: hero,
                };
            } else {
                return undefined;
            }
        },
    });
    return result;
};

export default useSuperHeroData;

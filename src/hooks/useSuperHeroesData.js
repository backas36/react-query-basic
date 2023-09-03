import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
const fetchSuperHeroes = () => {
    return request({ url: "/superheroes" });
};
const addSuperHero = (hero) => {
    return request({ url: "/superheroes", method: "POST", data: hero });
};

const useSuperHeroesData = (onSuccess, onError) => {
    const result = useQuery("super-heroes", fetchSuperHeroes, {
        // enabled: false,
        onSuccess,
        onError,
        select: (data) => {
            console.log(
                data.data.map((hero) => ({
                    ...hero,
                    name: hero.name.toUpperCase(),
                }))
            );
            return data.data.map((hero) => ({
                ...hero,
                name: hero.name.toUpperCase(),
            }));
        },
    });
    return result;
};

export default useSuperHeroesData;

export const useAddSuperHeroData = () => {
    const querClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        //     // querClient.invalidateQueries("super-heroes");
        //     //     another way
        //     querClient.setQueriesData("super-heroes", (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data],
        //         };
        //     });
        // },
        onMutate: async (newHero) => {
            await querClient.cancelQueries("super-heroes");
            const previousHeroData = querClient.getQueryData("super-heroes");
            querClient.setQueryData("super-heroes", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        { id: oldQueryData?.data?.length + 1, ...newHero },
                    ],
                };
            });
            return {
                previousHeroData,
            };
        },
        onError: (_error, _hero, context) => {
            querClient.setQueryData("super-heroes", context.previousHeroData);
        },
        onSettled: () => {
            querClient.invalidateQueries("super-heroes");
        },
    });
};

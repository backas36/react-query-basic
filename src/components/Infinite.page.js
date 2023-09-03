import axios from "axios";
import { Fragment, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

const limit = 2;
const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(
        `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
    );
};
const InfinitePage = () => {
    const {
        fetchNextPage,
        isFetchingNextPage,
        hasPreviousPage,
        hasNextPage,
        isLoading,
        isError,
        error,
        data,
        isFetching,
    } = useInfiniteQuery(["colors"], fetchColors, {
        getNextPageParam: (_lastPage, pages, data) => {
            const totalCount = pages[0]?.headers?.["x-total-count"];
            const totalPage = Math.ceil(totalCount / limit);
            // console.log(pages);
            if (pages.length < totalPage) {
                return pages.length + 1;
            } else {
                return undefined;
            }
        },
    });
    console.log({ isLoading, isFetching });

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }
    return (
        <div>
            {data?.pages.map((group, index) => {
                return (
                    <Fragment key={index}>
                        <div>
                            {group.data.map((c) => {
                                return (
                                    <h2 key={c.id}>
                                        {c.id}.{c.label}
                                    </h2>
                                );
                            })}
                        </div>
                    </Fragment>
                );
            })}

            <button onClick={fetchNextPage} disabled={!hasNextPage}>
                Load more
            </button>
            {isFetchingNextPage && isFetching && <h1>Fetching next page...</h1>}
        </div>
    );
};

export default InfinitePage;

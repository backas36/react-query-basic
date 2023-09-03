import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const limit = 2;
const fetchColors = (page) => {
    return axios.get(
        `http://localhost:4000/colors?_limit=${limit}&_page=${page}`
    );
};
const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { isLoading, isError, error, data, isFetching } = useQuery(
        ["colors", pageNumber],
        () => fetchColors(pageNumber),
        { keepPreviousData: true }
    );
    console.log({ isLoading, isFetching });
    const totalCount = data?.headers?.["x-total-count"];
    const totalPage = Math.ceil(totalCount / limit);
    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }
    return (
        <div>
            {data?.data.map((c) => {
                return (
                    <div key={c.id}>
                        <h2>
                            {c.id} .{c.label}
                        </h2>
                    </div>
                );
            })}

            <button
                onClick={() => setPageNumber((page) => page - 1)}
                disabled={pageNumber === 1}
            >
                Prev
            </button>
            <button
                onClick={() => setPageNumber((page) => page + 1)}
                disabled={pageNumber === totalPage}
            >
                Next
            </button>
            {isFetching && <h1>Fetching ...</h1>}
        </div>
    );
};

export default PaginatedQueriesPage;

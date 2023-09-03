import { ReactQueryDevtools } from "react-query/devtools";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import DependentQueriesPage from "./components/DependentQueries.page";
import DynamicParallelQueriesPage from "./components/DynamicParallelQueries.page";
import { HomePage } from "./components/Home.page";
import InfinitePage from "./components/Infinite.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroPage from "./components/SuperHero.page";
import SuperHeroesPage from "./components/SuperHeroes.page";

function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/super-heroes'>Traditional Super Heroes</Link>
                    </li>
                    <li>
                        <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
                    </li>{" "}
                    <li>
                        <Link to='/rq-parallel'>RQ parallel</Link>
                    </li>{" "}
                    <li>
                        <Link to='/rq-dynamic-parallel'>
                            RQ Dynamic parallel
                        </Link>
                    </li>
                    <li>
                        <Link to='/rq-dependent'>RQ Dependent Queries</Link>
                    </li>{" "}
                    <li>
                        <Link to='/initial-data'>RQ Initial Data</Link>
                    </li>{" "}
                    <li>
                        <Link to='/rq-paginate'>RQ Paginate Queries</Link>
                    </li>{" "}
                    <li>
                        <Link to='/rq-infinite'>
                            RQ Infinite Paginate Queries
                        </Link>
                    </li>
                </ul>
            </nav>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />

            <Routes>
                <Route
                    path='/super-heroes'
                    element={<SuperHeroesPage />}
                ></Route>
                <Route
                    path='/super-heroes/:id'
                    element={<SuperHeroPage />}
                ></Route>
                <Route
                    path='/rq-super-heroes'
                    element={<RQSuperHeroesPage />}
                ></Route>{" "}
                <Route
                    path='/rq-parallel'
                    element={<ParallelQueriesPage />}
                ></Route>{" "}
                <Route
                    path='/rq-dynamic-parallel'
                    element={<DynamicParallelQueriesPage ids={[1, 3]} />}
                ></Route>{" "}
                <Route
                    path='/rq-dependent'
                    element={<DependentQueriesPage email={"ashi@gmail.com"} />}
                ></Route>{" "}
                <Route
                    path='/rq-paginate'
                    element={<PaginatedQueriesPage />}
                ></Route>{" "}
                <Route path='/rq-infinite' element={<InfinitePage />}></Route>
                <Route path='/' element={<HomePage />}></Route>
            </Routes>
        </div>
    );
}

export default App;

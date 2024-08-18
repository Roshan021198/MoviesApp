import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import TrendingMovies from "./Components/TrendingMovie";
import Pagination from "./Components/Pagination";
import WatchList from "./Components/WatchList";
import { useState, useEffect } from "react";
import MovieContext from "./Context/MovieContext";

function App() {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );

  const addToWatchList = (movieToAdd) => {
    const newWatchList = [...watchList, movieToAdd];
    setWatchList(newWatchList);
  };

  const removeFromWatchlist = (movieToRemove) => {
    const filterWatchList = watchList.filter(
      (movieObj) => movieObj.id !== movieToRemove.id
    );
    setWatchList(filterWatchList);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <MovieContext.Provider value={{watchList,addToWatchList,removeFromWatchlist,setWatchList}}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <TrendingMovies
                  // watchList={watchList}
                  // addToWatchList={addToWatchList}
                  // removeFromWatchlist={removeFromWatchlist}
                />
              </>
            }
          />

          <Route
            path="/watchlist"
            element={
              <WatchList
                // movies={watchList}
                // removeFromWatchlist={removeFromWatchlist}
                // setWatchList={setWatchList}
              />
            }
          />
        </Routes>
      </MovieContext.Provider>
    </BrowserRouter>
  );
}
export default App;

/* <Navbar/>
<Banner/>
<TrendingMovies/>
<Pagination/>
<WatchList/> */

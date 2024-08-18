import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function TrendingMovies({watchList,addToWatchList,removeFromWatchlist}) {
  const [movies, setMovies] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  function handlePrev() {
    if (pageNo > 1) setPageNo(pageNo - 1);
  }

  // console.log(movies);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=5c34be914d1ce7c555f72d0d9adac720&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNo]);

  if (!movies) {
    return <h1>...Loading</h1>;
  }

  console.log(watchList);
  return (
    <>
      <h1 className="text-center m-12 text-4xl font-bold">Trending Movies</h1>
      <div className="flex flex-wrap justify-evenly">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              title={movie.title}
              poster={BASE_URL + movie.backdrop_path}
              fav={watchList.some((moviesObj)=> moviesObj.id === movie.id)}
              addToWatchList={addToWatchList}
              removeFromWatchlist={removeFromWatchlist}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </>
  );
}

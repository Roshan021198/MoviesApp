import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../utils/constant";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import MovieContext from "../Context/MovieContext";

export default function TrendingMovies({pageNo,handleNext,handlePrev}) {
  const {watchList} = useContext(MovieContext);
  const [movies, setMovies] = useState(null);
  

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
              fav={watchList.some((moviesObj) => moviesObj.id === movie.id)}
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

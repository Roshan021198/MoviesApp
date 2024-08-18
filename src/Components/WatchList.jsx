import { useEffect, useState } from "react";
import { BASE_URL, ALL_GENRES, GENRES_ID_MAPPING } from "../utils/constant";

export default function WatchList({
  movies,
  removeFromWatchlist,
  setWatchList,
}) {
  //   let genres = ["ALL_GENRES", "Action", "Comedy", "Sci-Fi"];
  const [genres, setGenre] = useState([ALL_GENRES]);
  const [selectedGenre, setselectedGenre] = useState(ALL_GENRES);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const genereList = movies.map((movieObj) => {
      return GENRES_ID_MAPPING[movieObj.genre_ids[0]];
    });
    const uniqueGenereList = new Set(genereList);
    setGenre([ALL_GENRES, ...uniqueGenereList]);
  }, [movies]);

  const sortAscending = (key) => {
    const sortedMovies = [...movies].sort((movieA, movieB) => {
      return movieA[key] - movieB[key];
    });
    setWatchList(sortedMovies);
  };

  const sortDescending = (key) => {
    const sortedMovies = [...movies].sort((movieA, movieB) => {
      return movieB[key] - movieA[key];
    });
    setWatchList(sortedMovies);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[90%] flex-wrap gap-4 justify-evenly">
        {genres.map((genre, index) => {
          return (
            <div
              key={{ index }}
              onClick={() => setselectedGenre(genre)}
              className={`h-[3rem] w-[12rem] bg-slate-400 flex items-center 
              justify-center rounded-lg cursor-pointer text-white font-bold
              ${genre === selectedGenre ? "bg-blue-400" : ""}
            `}
            >
              {genre}
            </div>
          );
        })}
      </div>

      <input
        value={search}
        className="h-[4rem] w-[24rem] p-4 my-8 mt-[4rem] text-2xl bg-slate-200 outline-none border-2"
        placeholder="Search Movie"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="rounded-xl border w-[90%] overflow-hidden">
        <thead className="bg-slate-300 h-12 rounded-lg">
          <tr className="border-b-2 text-left">
            <th className="p-8">Name</th>
            <th>
              <i
                className="fa-solid fa-angle-up mr-2 cursor-pointer"
                onClick={() => sortAscending("vote_average")}
              ></i>
              Ratings
              <i
                className="fa-solid fa-angle-down ml-2 cursor-pointer"
                onClick={() => sortDescending("vote_average")}
              ></i>
            </th>
            <th>
              <i
                className="fa-solid fa-angle-up mr-2 cursor-pointer"
                onClick={() => sortAscending("popularity")}
              ></i>
              Popularity
              <i
                className="fa-solid fa-angle-down ml-2 cursor-pointer"
                onClick={() => sortDescending("popularity")}
              ></i>
            </th>
            <th>Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies
            .filter((movieObj) => {
              if (selectedGenre === ALL_GENRES) {
                return true;
              }

              return selectedGenre === GENRES_ID_MAPPING[movieObj.genre_ids[0]];
            })
            .filter((movieObj) => {
              return movieObj.title
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .map((movie) => {
              return (
                <tr key={movie.id} className="border-2 hover:bg-slate-100">
                  <td className="flex m-4 gap-8 items-center">
                    <img
                      className="h-32 w-36 rounded-lg"
                      src={BASE_URL + movie.backdrop_path}
                      alt="poster"
                    />
                    {movie.title}
                  </td>
                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>
                  <td>{GENRES_ID_MAPPING[movie.genre_ids[0]]}</td>
                  <td
                    className="text-rose-600 cursor-pointer"
                    onClick={() => removeFromWatchlist(movie)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

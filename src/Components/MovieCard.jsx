import { useContext } from "react";
import MovieContext from "../Context/MovieContext";

export default function MovieCard({
  movie,
  fav,
  title,
  poster,
}) {

  const {removeFromWatchlist,addToWatchList} = useContext(MovieContext);

  return (
    <div className="hover:scale-110 duration-300 relative m-5 cursor-pointer rounded-[1rem] overflow-hidden">
      <img className="h-[20rem] w-[12rem] object-cover" src={poster} />
      <p className="absolute text-l text-white bottom-2 left-[50%] translate-x-[-50%] text-center">
        {title}
      </p>
      <div className="absolute top-4 right-4 bg-gray-900/60 h-8 w-8 flex items-center justify-center rounded-lg">
        {fav ? (
          <div
            onClick={() => {
              removeFromWatchlist(movie);
            }}
          >
            ❌
          </div>
        ) : (
          <div
            onClick={() => {
              addToWatchList(movie);
            }}
          >
            😍
          </div>
        )}
      </div>
    </div>
  );
}

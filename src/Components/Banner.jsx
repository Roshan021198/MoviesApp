import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {BASE_URL} from "../utils/constant"


export default function Banner() {
  const [trendingMovie, setTrandingMovie] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=5c34be914d1ce7c555f72d0d9adac720"
      )
      .then(function (res) {
        let randomMovie = res.data.results[Math.floor(Math.random() * 20)];
        setTrandingMovie(randomMovie);
      });
  },[]);

  if (!trendingMovie) {
    return <h1>...Loading</h1>;
  }

  return (
    <div className="relative">
      <img
        className="h-[36rem] w-screen object-cover"
        src={BASE_URL+trendingMovie.backdrop_path}
      />
      <p className="absolute text-4xl text-white bottom-4 left-[50%] translate-x-[-50%] ">
        {trendingMovie.title}
      </p>
    </div>
  );
}

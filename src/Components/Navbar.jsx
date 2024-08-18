import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <div className="flex items-center m-4">
            <img className="h-12" src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png"/>
            <Link to="/" className="m-4 text-blue-400 text-3xl font-bold">Movies</Link>
            <Link to="/watchlist" className="text-blue-400 text-3xl font-bold">WatchList</Link>
        </div>
    )
}
import { useEffect, useState } from "react";
const key = '3a9ca57b'

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(function () {
        callback?.();

        const controller = new AbortController();
        async function fetchMovies() {
            try {

                setIsLoading(true);
                setError("");
                const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, { signal: controller.signal });

                // console.log(res);


                //علشان لو في اي ايرور زي النت قطع مثلاً والافلام لسه مجنش
                if (!res.ok) throw new Error('Something went wrong');

                const data = await res.json();
                console.log(data);
                //لو الفيلم مش موجود في الداتا
                if (data.Response === 'False') throw new Error("movie not Found");

                setMovies(data.Search);
                setError("");


                // console.log(data.Search);
                // setIsLoading(false);

            } catch (err) {
                // console.error(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        };
        // handleCloseMovie();
        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query]);

    return { movies, isLoading, error }

}
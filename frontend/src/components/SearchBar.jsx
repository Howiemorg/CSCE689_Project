import { useEffect, useRef, useState, useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const searchEndpoint = (query) => `http://localhost:8000/search?q=${query}&searchBar=True`;

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length && query === searchRef.current.value) {
        fetch(searchEndpoint(query))
          .then((res) => res.json())
          .then((res) => {
            setResults(res.results);
          });
      } else {
        setResults([]);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [query, searchRef]);

  const submitHandler = () => {
    if (!query) {
      return;
    }
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="relative sm:ml-10 sm:mr-10">
      <input
        type="text"
        id="search"
        ref={searchRef}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={onFocus}
        value={query}
        className="block pl-2.5 pr-56 pb-2.5 pt-4 sm:w-full w-4/5 text-sm text-white-black bg-black-white rounded-lg border border-white dark:border-black focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <span className="absolute inset-y-0 right-12 sm:right-0 flex items-center md:pr-9 sm:pr-8 pr-16">
        <MagnifyingGlassIcon
          className="h-6 absolute w-6"
          onClick={submitHandler}
        />
      </span>
      <label
        htmlFor="search"
        className="absolute text-sm text-white-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black-white px-2 peer-focus:px-2 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Search Questions
      </label>

      {active && results.length > 0 && (
        <div className="grid md:grid-cols-2 absolute md:w-110 lg:w-120 bg-black-white px-2 z-10">
          {results.map(({ id, name }) => (
            <div
              className="flex p-1 m-1 transiton ease-in-out duration-300 border-0 rounded-lg hover:border-2 border-white-black"
              key={id}
            >
              <NavLink to={`/questions/${id}`} className=" w-80 lg:w-88">
                {name}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import { useEffect, useState, useCallback } from "react";

const SearchPage = (props) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [products, setProducts] = useState(props.data);
  const [numPages, setNumPages] = useState(1)
  const [amtPerPage, setAmtPerPage] = useState(15);

  const [page, setPage] = useState(1)

  // const getFilteredProducts = useCallback(async () => {
  //   const response = await fetch(
  //     `/api/questions?q=${props.q ? props.q : ""}&page=${page}&topic=${topic}&difficulty=${difficulty}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await response.json();
  //   setProducts(data.products);
  //   setNumPages(data.pages)
  // }, [difficulty, page, props.q, topic]);

  // useEffect(() => {
  //   getFilteredProducts();
  // }, [getFilteredProducts]);

  return (
    <div className={`bg-white-black h-full`}>
        <main className="bg-white-black">
          <div className="flex flex-wrap flex-none">
            <h2
              className={`text-black-white justify-start ml-[11%] border-b-[10px] w-[45%] pb-8 text-7xl font-Comic_sans pt-32`}
            >
              {props.title[0].toUpperCase() +
                props.title.slice(1, props.title.length)}
            </h2>
          </div>
          {/* <Sorter setSort={setSort} sort={sort} /> */}
          <div
            className={`grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 grid-rows-layout flex-none mt-20 ml-[11%] mr-[10%]`}
          >
            {/* <Filters
              products={props.data}
              sizes={props.sizes}
              genders={props.genders}
            />
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl hover:animate-pickMe border-black border-2 hover:z-40"
                >
                  <Product
                    product={product}
                    sort={sort}
                    gender={gender}
                    size={size}
                  />
                </div>
              ))} */}
            {!products.length && (
              <h2 className="text-black-white text-center text-3xl font-[Georgia] col-span-3">
                No Products Meet These Filters
              </h2>
            )}
          </div>
          <div className="bg-white-black text-center text-black-white h-full">
            <button
              type="button"
              onClick={() => {
                if (page !== 1)
                  setPage((prevPage) => {
                    return Math.max(prevPage - 1, 1);
                  });
              }}
              className="rounded-md m-4 p-2 basis-1/6 text-xl font-medium transiton ease-in-out duration-300 border-0 hover:border-4 border-black-white"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => {
                if (numPages !== page)
                  setPage((prevPage) => {
                    return Math.min(prevPage + 1, numPages);
                  });
              }}
              className="rounded-md m-4 p-2 basis-1/6 text-xl font-medium transiton ease-in-out duration-300 border-0 hover:border-4 border-black-white"
            >
              Next
            </button>
          </div>
        </main>
    </div>
  );
};

export default SearchPage;

const loadQuestions = (query) => {
  
}
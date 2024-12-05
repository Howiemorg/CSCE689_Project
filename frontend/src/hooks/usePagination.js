import { useCallback, useState } from "react";

const usePagination = (url, defaultMaxPage) => {
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(defaultMaxPage || 0);

  const getContent = async () => {
    console.log("Page:", page)
    try {
      const response = await fetch(url + `limit=5&page=${page}`);
      const json = await response.json();

      if (!response.ok || response.status !== 200) {
        return { meassage: "Error fetching data" };
      }

      console.log("PAGINATED JSON:", json)

      if (json.maxPages) {
        setMaxPages(json.maxPages);
      }
      return json;
    } catch (e) {
      return { meassage: "Error fetching data" };
    }
  };

  const firstPage = useCallback(() => {
    setPage(0);
  }, []);

  const prevPage = useCallback(() => {
    setPage((lastPage) => Math.max(0, lastPage - 1));
  }, []);

  const nextPage = useCallback(() => {
    setPage((lastPage) => Math.min(maxPages, lastPage + 1));
  }, [maxPages]);

  const lastPage = useCallback(() => {
    setPage(maxPages);
  }, []);

  return { page, maxPages, prevPage, nextPage, firstPage, lastPage, setMaxPages, getContent };
};

export default usePagination;

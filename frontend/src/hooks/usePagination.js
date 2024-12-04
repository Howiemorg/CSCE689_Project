import { useCallback, useState } from "react";

const usePagination = (url, defaultMaxPage) => {
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(defaultMaxPage || 0);

  const getContent = async () => {};

  const firstPage = useCallback(() => {
    setPage(0);
  }, [])

  const prevPage = useCallback(() => {
    setPage((lastPage) => Math.max(0, lastPage - 1));
  }, []);

  const nextPage = useCallback(() => {
    setPage((lastPage) => Math.min(maxPages, lastPage + 1));
  }, [maxPages]);

  return { page, prevPage, nextPage, firstPage, setMaxPages };
};

export default usePagination;

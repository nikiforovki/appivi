import React, { useEffect, useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const CategoryInfinityScroll = () => {
  const fetchCategories = async ({ pageParam = 1 }) => {
    const response = await axios.get(`/api/categories?page=${pageParam}`);
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const observer = useRef();
  const lastCategoryRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return (
    <div>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.categories.map((category, index) => (
            <div
              key={category.id}
              ref={
                index === group.categories.length - 1 ? lastCategoryRef : null
              }
            >
              {category.name}
            </div>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <div>Загрузка...</div>}
    </div>
  );
};

export default CategoryInfinityScroll;

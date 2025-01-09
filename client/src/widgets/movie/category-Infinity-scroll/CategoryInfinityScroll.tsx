import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SkeletonCard from '@shared/skeleton-card';
import { Category } from './types';

const CategoryInfinityScroll: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data.categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Произошла ошибка при загрузке категорий');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CategoryInfinityScroll;

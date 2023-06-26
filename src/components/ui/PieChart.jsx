import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { sumByCategory } from '../../services/category.services';
import { Pie } from 'react-chartjs-2';
import '../../styles/chartjs.css';
// import { categories } from '../../data/categories';
import { useSelector } from 'react-redux';
import {
  getCategories,
  getCategoriesLoadingStatus,
  getCategoryDisplayNameById,
} from '../../store/categories/categories.slice';
import { getOperationList } from '../../store/operations/operations.slice';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ style }) => {
  const defaultCategories = useSelector(getCategories());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const operations = useSelector(getOperationList());
  const categories = useSelector(getCategories());

  const arrSumByCategory = sumByCategory(operations);

  let labels = arrSumByCategory.map((s) => useSelector(getCategoryDisplayNameById(s.id)));
  let sum = arrSumByCategory.map((s) => s.sum);

  const bacColorForCat = [];

  console.log(categories);

  if (categories) {
    labels.forEach((label) => {
      categories.forEach((category) => {
        if (label === category.name) {
          console.log(category.color);
          bacColorForCat.push(category.color);
        }
      });
    });
  }

  // console.log(bacColorForCat);

  const newData = {
    labels: [...labels],

    datasets: [
      {
        label: '',
        data: [...sum],
        height: '100px',
        width: '100px',
        backgroundColor: [...bacColorForCat],
        borderColor: [...bacColorForCat],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-25" style={style}>
      <Pie data={newData} />
    </div>
  );
};

export default PieChart;

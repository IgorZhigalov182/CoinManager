import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { sumByCategory } from '../../services/category.services';
import { Pie } from 'react-chartjs-2';
import '../../styles/chartjs.css';
import { categories } from '../../data/categories';
import { useSelector } from 'react-redux';
import { getCategories, getCategoriesLoadingStatus } from '../../store/categories/categories.slice';
import { getOperationList } from '../../store/operations/operations.slice';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartJSs = ({ style }) => {
  const [datas, setDatas] = useState([]);
  const defaultCategories = useSelector(getCategories());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const operations = useSelector(getOperationList());

  useEffect(() => {
    setDatas(operations);
  }, []);

  const arrSumByCategory = sumByCategory(datas);

  let labels = arrSumByCategory.map((s) => s.category);
  let sumss = arrSumByCategory.map((s) => s.sum);

  const bacColorForCat = [];
  labels.map((label) => {
    categories.forEach((category) => {
      if (label === category.name) {
        bacColorForCat.push(category.color);
      }
    });
  });

  const newData = {
    labels: [...labels],

    datasets: [
      {
        label: '',
        data: [...sumss],
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

export default ChartJSs;

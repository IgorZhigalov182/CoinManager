import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { sumByCategory } from './services/category.services';
import { Pie } from 'react-chartjs-2';
import './styles/chartjs.css';
import { categories } from './data/categories';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartJSs = () => {
  const [datas, setDatas] = useState([]);

  const getDataOperations = async () => {
    const response = await fetch('http://localhost:3000/operations');
    const dataq = await response.json();
    setDatas(dataq);
  };

  useEffect(() => {
    getDataOperations();
  }, [datas]);

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

  return <Pie data={newData} />;
};

export default ChartJSs;

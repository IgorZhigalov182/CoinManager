import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './styles/chartjs.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   // labels: [],
//   datasets: [
//     {
//       label: 'wq of Votes',
//       data: [34, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

const ChartJSs = () => {
  const [datas, setDatas] = useState([]);

  const getDataOperations = async () => {
    const response = await fetch('http://localhost:3000/operations');
    const dataq = await response.json();
    setDatas(dataq);
  };

  useEffect(() => {
    getDataOperations();
  }, []);

  const sums = datas.map((d) => {
    return d.sum;
  });

  const categories = datas.map((d) => {
    return d.category;
  });

  const getUnique = (arr) => {
    return arr.filter((el, ind) => ind === arr.indexOf(el));
  };

  // console.log(sums);
  // console.log(getUnique(categories));

  const shoes = datas.filter((obj) => {
    return obj.category == 'shoes';
    // console.log(obj.category);
  });

  // const shoesSum = shoes.reduce((acc, value) => {
  //   console.log(value.sum);
  // });

  console.log(datas);

  // Уникальные категории для виджета
  const categoriesArray = [
    ...new Set(
      datas.map((d) => {
        return d.category;
      }),
    ),
  ];

  const la = [
    {
      value: 120,
      color: '#4d0612',
      label: '1',
    },
    {
      value: 11,
      color: '#8b0e19',
      label: '2',
    },
    {
      value: 22,
      color: '#c8102e',
      label: '1',
    },
  ];

  const handleDivideSumByCategories = (arr) => {
    // arr.map(())
    third;
  };

  const labelsArray = [
    ...new Set(
      la.map((obj) => {
        return obj.label;
      }),
    ),
  ];

  const newData = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    // labels: [...categoriesArray],
    labels: [...labelsArray],
    // labels: ['1', '2'],

    datasets: [
      {
        label: 'wq of Votes',
        data: la,
        height: ['100px'],
        width: '100px',
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={newData} />;
};

export default ChartJSs;

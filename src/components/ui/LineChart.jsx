import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function LineChart() {

// }

const LineChart = ({ style }) => {
  const options = {
    responsive: true,
    // width: 100, // задаем ширину графика
    // height: 200,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Даты',
      },
    },
  };

  const labels = [
    'Январь',
    'Ферваль',
    'Март',
    'Апрель',
    'Maй',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Расходы',
        //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        data: [1, 2, 4, 5, 21],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      //   {
      //     label: 'Доходы',
      //     //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //     data: [1, 54, 6, 324, 6],
      //     borderColor: 'rgb(53, 162, 235)',
      //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
      //   },
    ],
  };
  //   let style = { height: '10rem', width: '20rem' };
  //   style={style}
  return (
    <>
      <div style={{ width: '39rem', height: '20rem' }}>
        <Line options={options} data={data} />
      </div>
    </>
  );
};

export default LineChart;

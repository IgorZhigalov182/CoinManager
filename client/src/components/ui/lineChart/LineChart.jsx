import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getSumOperationByMounth } from '../../../store/operations/operations.slice';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './LineChart.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ borderColor, title, backgroundColor }) => {
  const sumOperationByMounth = useSelector(getSumOperationByMounth(title));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false,
        text: 'Даты'
      }
    }
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
    'Декабрь'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: [...sumOperationByMounth],
        borderColor: borderColor,
        backgroundColor: backgroundColor
      }
    ]
  };
  return (
    <div className={styles.wrapper}>
      <Line options={options} data={data} />
    </div>
  );
};

LineChart.propTypes = {
  title: PropTypes.string,
  borderColor: PropTypes.string,
  handler: PropTypes.string
};

export default LineChart;

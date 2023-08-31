import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { sumByCategory } from '../../../services/category.services';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import '../../../styles/chartjs.css';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categories/categories.slice';
import { getOperationList } from '../../../store/operations/operations.slice';
import Button from '../common/button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './PieChart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ typeOperation }) => {
  const navigate = useNavigate();
  const categories = useSelector(getCategories());
  const operationsArray = useSelector(getOperationList());
  let operations = '';
  if (operationsArray.length !== 0) {
    operations = operationsArray.filter((operation) => {
      return operation.typeOperation === typeOperation;
    });
  }

  const operationsWithCategories = [];
  if (categories && operations.length !== 0) {
    operations.forEach((operation) => {
      categories.forEach((category) => {
        if (operation?.category === category._id) {
          operationsWithCategories.push({
            ...operation,
            categoryLabel: category.name,
            categoryColor: category.color,
          });
        }
      });
    });
  }

  const arrSumByCategory = sumByCategory(operationsWithCategories);
  const labels = arrSumByCategory.map((oper) => oper.label);
  const colors = arrSumByCategory.map((oper) => oper.color);
  const sums = arrSumByCategory.map((oper) => oper.sum);

  const newData = {
    labels: [...labels],

    datasets: [
      {
        label: '',
        data: [...sums],
        height: '100px',
        width: '100px',
        backgroundColor: [...colors],
        borderColor: [...colors],
        borderWidth: 1,
      },
    ],
  };

  if (operations.length === 0) {
    return (
      <div className="me-1 mt-3">
        <h3>Добавьте первую операцию</h3>
        <Button
          className="btn btn-success mt-4"
          title={'Добавить операцию'}
          handler={() => navigate('/operations')}
        />
      </div>
    );
  }

  return (
    <div className={styles.pieChartWrapper}>
      <Pie data={newData} />
    </div>
  );
};

Button.propTypes = {
  typeOperation: PropTypes.string,
};

export default PieChart;
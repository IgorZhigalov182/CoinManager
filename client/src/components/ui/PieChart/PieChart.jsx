import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, layouts } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import '../../../styles/chartjs.css';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../store/categories/categories.slice';
import { getOperationList, getSumOperations } from '../../../store/operations/operations.slice';
import Button from '../common/button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './PieChart.module.scss';
import operationService from '../../../services/operations.services';
import categoryService from '../../../services/category.services';
import { externalTooltipHandler } from './customTooltip';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ typeOperation }) => {
  const navigate = useNavigate();
  const operations = useSelector(getOperationList(typeOperation));
  const categories = useSelector(getCategories());
  const totalSum = useSelector(getSumOperations(typeOperation));

  const operationsWithCategories = operationService.getOperationsWithCategories(
    operations,
    categories
  );

  const sumByCategory = categoryService.sumByCategory(operationsWithCategories);
  const labels = sumByCategory.map(({ label }) => label);
  const colors = sumByCategory.map(({ color }) => color);
  const sums = sumByCategory.map(({ sum }) => sum);

  const data = {
    labels: [...labels],

    datasets: [
      {
        label: 'Сумма',
        data: [...sums],
        height: '100px',
        width: '100px',
        backgroundColor: [...colors],
        borderColor: [...colors],
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
        callbacks: {
          label: function (context) {
            const countOper = sumByCategory.find(({ sum }) => sum === context.raw).count;

            return [
              `${context.raw}`,
              `${Math.ceil((context.raw * 100) / totalSum)}`,
              typeOperation,
              countOper
            ];
          }
        }
      }
    }
  };

  if (!operations.length) {
    return (
      <div className={styles.newOperation}>
        <h3>Добавьте первую операцию</h3>
        <Button
          className={styles.newOperationBtn}
          title={'Добавить операцию'}
          handler={() => navigate('/operations')}
        />
      </div>
    );
  }

  return (
    <div className={styles.pieChartWrapper}>
      <Pie options={options} data={data} />
    </div>
  );
};

Button.propTypes = {
  typeOperation: PropTypes.string
};

export default PieChart;

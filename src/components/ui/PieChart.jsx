import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { sumByCategory } from '../../services/category.services';
import { Pie } from 'react-chartjs-2';
import '../../styles/chartjs.css';
// import { categories } from '../../data/categories';
import { useSelector } from 'react-redux';
import {
  getCategories,
  getCategoryById,
  getCategoryColorById,
  getCategoryDisplayNameById,
} from '../../store/categories/categories.slice';
import { getOperationList } from '../../store/operations/operations.slice';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ typeOperation, style }) => {
  const navigate = useNavigate();
  const operationsArray = useSelector(getOperationList());
  const categories = useSelector(getCategories());

  const operations = operationsArray.filter((operation) => {
    return operation.typeOperation === typeOperation;
  });

  const operationsWithCategories = [];
  if (categories) {
    operations.forEach((operation) => {
      categories.forEach((category) => {
        if (operation.category === category.id) {
          operationsWithCategories.push(operation);
        }
      });
    });
  }

  const arrSumByCategory = sumByCategory(operationsWithCategories);

  let labels = arrSumByCategory.map((s) => useSelector(getCategoryDisplayNameById(s.id)));
  let colors = arrSumByCategory.map((s) => useSelector(getCategoryColorById(s.id)));
  let sum = arrSumByCategory.map((s) => {
    return s.sum;
  });

  const newData = {
    labels: [...labels],

    datasets: [
      {
        label: '',
        data: [...sum],
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
    <div className="h-25" style={style}>
      <Pie data={newData} />
    </div>
  );
};

export default PieChart;

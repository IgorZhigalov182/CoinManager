import React from 'react';
import ReactEcharts from 'echarts-for-react';

const Chart = ({ data }) => {
  console.log(data);
  // data.sum, data.category, data.bankAccount, data.comment
  console.log(Object.keys(data));

  const arrayNameData = Object.keys(data);

  const getOptions = () => ({
    title: {
      text: 'Покупки',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      bottom: 'bottom',

      data: arrayNameData.map((item) => item),
    },
    series: [
      {
        name: 'JS FrontEnd',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: [
          {
            value: 50,
            name: 'sum',
          },
          {
            value: 22,
            name: 'category',
          },
          {
            value: 28,
            name: 'bankAccount',
          },
          {
            value: 28,
            name: 'comment',
          },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });

  return (
    <div className="App">
      {/* <ReactEcharts option={getOptions()} style={{ height: 400 }} /> */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
        <Widget title={'Траты за жизнь'} />
      </div>
    </div>
  );
};
export default Chart;

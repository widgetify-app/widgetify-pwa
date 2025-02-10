import React from 'react';
import ReactECharts from 'echarts-for-react';
import moment from 'moment-jalaali';

interface PriceHistory {
  createdAt: string;
  price: number;
}

interface CurrencyChartProp {
  priceHistory: PriceHistory[];
}

export function CurrencyChart({ priceHistory }: CurrencyChartProp) {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      textStyle: {
        color: '#ffffff',
      },
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    xAxis: {
      type: 'category',
      data: priceHistory.map(entry => moment(entry.createdAt).format('jYYYY/jMM/jDD')),
      axisLabel: {
        color: '#666666',
        fontSize: 8,
        fontWeight: 'bold',
      },
      axisLine: {
        lineStyle: {
          color: '#666666',
        },
      },
      inverse: true, 
    },
    yAxis: {
      type: 'value',
      position: 'right',
      axisLabel: {
        color: '#666666',
        fontSize: 10,
        fontWeight: 'bold',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    series: [
      {
        name: 'Price History',
        type: 'line',
        data: priceHistory.map(entry => entry.price),
        smooth: true,
        lineStyle: {
          color: 'rgba(75, 192, 192, 1)',
        },
        areaStyle: {
          color: 'rgba(75, 192, 192, 0.2)',
        },
        symbolSize: 4,
        symbol: 'circle',
      },
    ],
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true,
    },
  };

  return <ReactECharts option={option} style={{ width: '100%', height: '400px' }} />;
}
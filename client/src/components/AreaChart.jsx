import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import Heading from './Heading';
import Chart from 'react-apexcharts';
import { ToastType, showToast } from '../utils/Toast/toast';

const AreaChart = () => {
    const [chartData, setChartData] = useState([]);
    const { data, error } = useApi('/areachart');

    if (error) {
        showToast(error.message, ToastType.Error)
    }

    useEffect(() => {
        if (data && data.chartData) {
            setChartData(data.chartData);
        }
    }, [data]);

    const options = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            },
            stacked: true
        },
        xaxis: {
            categories: chartData.map(item => item._id),
            title: {
                text: 'End year'
            }
        },
        yaxis: {
            title: {
                text: 'value'
            }
        },
        colors: ['#FF6384', '#36A2EB', '#4CAF50'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    };

    const series = [
        {
            name: 'Intensity',
            data: chartData.map(item => item.intensity)
        },
        {
            name: 'Likelihood',
            data: chartData.map(item => item.likelihood)
        },
        {
            name: 'Relevance',
            data: chartData.map(item => item.relevance)
        }
    ];

    return (
        <div className="border p-6 my-5 shadow-md bg-white rounded-md">
            <Heading title={'Area Chart'} description='Displays trends over time with an area chart for intensity, likelihood, and relevance.' />
            <Chart options={options} series={series} type="area" height={400} />
        </div>
    );
};

export default AreaChart;

import { useState } from 'react';

import useApi from '../hooks/useApi';
import Heading from './Heading';
import Chart from 'react-apexcharts';
import { ToastType, showToast } from '../utils/Toast/toast';

const BarChart = () => {
    const [xAxisValue, setXAxisValue] = useState('sector');
    const [yAxisValue, setYAxisValue] = useState('intensity');
    const { data, error } = useApi(`barchart?xAxis=${xAxisValue}&yAxis=${yAxisValue}`);
    if (error) {
        showToast(error.message, ToastType.Error)
    }
    const handleXAxisChange = (event) => {
        setXAxisValue(event.target.value);
    };

    const handleYAxisChange = (event) => {
        setYAxisValue(event.target.value);
    };

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data?.chartData?.map(d => d['_id']),
            title: {
                text: yAxisValue
            }
        },
        yaxis: {
            title: {
                text: xAxisValue
            }
        }
    };

    const series = [{
        name: '_id',
        data: data?.chartData?.map(d => d['yAxis'])
    }];


    return (
        <div className='border p-6 my-6 shadow-md bg-white rounded-md'>
            <div >
                <Heading title={'Horizontal Bar Chart'} description='Visualizes data with a horizontal bar chart, allowing dynamic selection of X and Y axes.' />
                <div>
                    <label htmlFor='xAxis'>X-axis:</label>
                    <select id='xAxis' value={xAxisValue} onChange={handleXAxisChange}>
                        <option value='sector'>Sector</option>
                        <option value='region'>Region</option>
                    </select>
                </div>
                <div className='' >
                    <label htmlFor='yAxis'>Y-axis:</label>
                    <select id='yAxis' value={yAxisValue} onChange={handleYAxisChange} >
                        <option value='likelihood'>Likelihood</option>
                        <option value='intensity'>Intensity</option>
                    </select>
                </div>
                <input type="text" />
            </div>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default BarChart;

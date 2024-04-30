
import Chart from 'react-apexcharts';
import useApi from '../hooks/useApi';
import Heading from './Heading';
import FullScreenLoadingModal from '../utils/Loader/FullScreenLoadingModal';
import { ToastType, showToast } from '../utils/Toast/toast';

const PieChart = () => {
    const { data, error } = useApi('/piechart');
    if (!data || !data.pieChartData) {
        return <FullScreenLoadingModal />;
    }

    if (error) {
        showToast(error.message, ToastType.Error)
    }

    const filteredData = data.pieChartData.filter(item => item.country.trim() !== "");


    const labels = filteredData.map((item) => item.country);
    const percentages = filteredData.map((item) => parseFloat(item.percentage));

    const options = {
        chart: {
            type: 'pie',
        },
        labels: labels,
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5,
                },
            },
        },
    };

    const series = percentages;

    return (
        <div className='border p-6 my-5 shadow-md bg-white rounded-md'>
            <Heading title={'Country Chart'} description='Visualizes data distribution by country percentages' />
            <Chart options={options} series={series} type="pie" width={500} />
        </div>
    );
};

export default PieChart;

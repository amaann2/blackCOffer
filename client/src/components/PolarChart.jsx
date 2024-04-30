import Chart from 'react-apexcharts';
import useApi from '../hooks/useApi';
import Heading from './Heading';
import FullScreenLoadingModal from '../utils/Loader/FullScreenLoadingModal';
import { ToastType, showToast } from '../utils/Toast/toast';

const PieChart = () => {
    const { data, error } = useApi('/polarchart');
    if (!data || !data.topicCounts) {
        return <FullScreenLoadingModal />;
    }

    if (error) {
        showToast(error.message, ToastType.Error)
    }

    const topicNames = data?.topicCounts?.map(topic => topic.topic);
    const topicCounts = data?.topicCounts?.map(topic => topic.count);

    const options = {
        chart: {
            type: 'pie',
        },
        labels: topicNames,
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5,
                },
            },
        },
    };

    const series = topicCounts;

    return (
        <div className='border p-6 my-5 shadow-md bg-white rounded-md '>
            <Heading title={'Topic chart'} description='Visualizes distribution of topics in a pie chart.' />

            <Chart
                options={options}
                series={series}
                type="pie"
                width={500}
            />
        </div>
    );
};

export default PieChart;


import Chart from 'react-apexcharts';
import useApi from '../hooks/useApi';
import Heading from './Heading';
import FullScreenLoadingModal from '../utils/Loader/FullScreenLoadingModal';
import { ToastType, showToast } from '../utils/Toast/toast';

const ScatterChart = () => {
    const { data, error } = useApi('/scatterchart');

    if (!data || !data.scatterPlotData) {
        return <FullScreenLoadingModal />;
    }
    if (error) {
        showToast(error.message, ToastType.Error)
    }


    const { intensities, likelihoods } = data.scatterPlotData;

    const series = [{
        name: 'Scatter Plot',
        data: intensities.map((intensity, index) => [intensity, likelihoods[index]])
    }];

    const options = {
        chart: {
            type: 'scatter',
            zoom: {
                enabled: true,
                type: 'xy'
            }
        },
        xaxis: {
            title: {
                text: 'Intensity'
            }
        },
        yaxis: {
            title: {
                text: 'Likelihood'
            }
        }
    };

    return (
        <div className="border p-6 my-5 shadow-md bg-white rounded-md">
            <Heading title={'Scatter chart'} description='Scatter chart visualizes the distribution of topics based on intensity and likelihood metrics.' />

            <Chart options={options} series={series} type="scatter" height={400} />
        </div>
    );
};

export default ScatterChart;

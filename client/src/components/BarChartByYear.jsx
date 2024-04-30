
import useApi from '../hooks/useApi';
import Chart from 'react-apexcharts';
import FullScreenLoadingModal from '../utils/Loader/FullScreenLoadingModal';
import { ToastType, showToast } from '../utils/Toast/toast';

const BarChartByYear = () => {
    const { data, error } = useApi('/barchartyear'); 

    if (!data || !data.chartData) {
        return <FullScreenLoadingModal />;
    }

    if (error) {
        showToast(error.message, ToastType.Error)
    }

    const categories = data?.chartData.map(item => item._id);
    const avgIntensity = data?.chartData.map(item => item.avgIntensity.toFixed());
    const avgLikelihood = data?.chartData.map(item => item.avgLikelihood.toFixed());
    const avgRelevance = data?.chartData?.map(item => item.avgRelevance.toFixed());

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Year'
            }
        },
        yaxis: {
            title: {
                text: 'Average Value'
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 20,
        },
        fill: {
            opacity: 1
        }
    };

    const series = [
        {
            name: 'Average Intensity',
            data: avgIntensity
        },
        {
            name: 'Average Likelihood',
            data: avgLikelihood
        },
        {
            name: 'Average Relevance',
            data: avgRelevance
        }
    ];

    return (
        <div className="border p-6 my-5 shadow-md bg-white rounded-md">
            <h2 className="text-xl font-semibold mb-3">Bar Chart</h2>
            <Chart options={options} series={series} type="bar" height={400} />
        </div>
    );
}

export default BarChartByYear
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import ReactApexChart from "react-apexcharts";
import Heading from "./Heading";
import FullScreenLoadingModal from "../utils/Loader/FullScreenLoadingModal";
import { ToastType, showToast } from "../utils/Toast/toast";

const LineChart = () => {
    const { data, error } = useApi('/lineChart');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data && data.chartData) {
            setChartData(data.chartData);
        }
    }, [data]);

    if (!data || !data.chartData) {
        return <FullScreenLoadingModal />;
    }

    if (error) {
        showToast(error.message, ToastType.Error)
    }



    const options = {
        chart: {
            type: 'line',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 5
        },
        xaxis: {
            categories: chartData.map(item => item._id),
            title: {
                text: 'Start Year',
                style: {
                    fontSize: '14px'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Value',
                style: {
                    fontSize: '14px'
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            offsetY: 20,
            itemMargin: {
                vertical: 15
            },
            markers: {
                radius: 5,
                shape: 'circle'
            }
        }
    };

    const series = [
        {
            name: 'Intensity',
            data: chartData.map(item => item.intensity)
        },
        {
            name: 'likelihood',
            data: chartData.map(item => item.likelihood)
        }
    ];

    return (
        <div className="border p-6 my-5 shadow-md bg-white rounded-md">
            <Heading title={'Line Chart'} description="This chart visualizes the intensity and likelihood data over time." />
            <ReactApexChart options={options} series={series} type="line" height={400} />
        </div>
    );
};

export default LineChart;

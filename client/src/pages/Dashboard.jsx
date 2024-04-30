
import AreaChart from '../components/AreaChart'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import NumberBox from '../components/NumberBox'
import PolarChart from '../components/PolarChart'
import ScatterChart from '../components/ScatterChart'
import BarChartByYear from '../components/BarChartByYear'
import useApi from '../hooks/useApi'
import FullScreenLoadingModal from '../utils/Loader/FullScreenLoadingModal'
import GeographicalHeatMap from '../components/GeographicalHeatMap'
const Dashboard = () => {
    const { isLoading } = useApi('/area')
    return (
        <>
            {isLoading ?
                <FullScreenLoadingModal />
                :
                <div className="flex flex-col py-12 px-12  ">

                    <NumberBox />
                    <AreaChart />
                    <LineChart />
                    <BarChart />
                    <BarChartByYear />
                    <div className='flex justify-between'>
                        <PieChart />
                        <PolarChart />
                    </div>
                    <ScatterChart />
                    <GeographicalHeatMap />



                </div >
            }

        </>
    )
}

export default Dashboard
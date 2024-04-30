import FullScreenLoadingModal from '../utils/Loader/FullScreenLoadingModal'
import { Building, Database, Donut, Earth, Factory } from 'lucide-react'
import useApi from '../hooks/useApi'

const NumberBox = () => {
    const { data, isLoading } = useApi('/total')
    return (
        <>
            {isLoading ? <FullScreenLoadingModal /> :
                <div className='flex flex-wrap justify-between'>
                    <div className='border  bg-white text-black p-5 rounded-md flex items-center justify-center gap-3 h-[100px] '>
                        <div className='bg-[#9694FF] rounded-xl p-4'>
                            <Database color="#ffffff" />
                        </div>
                        <div>
                            <h1 className='text-[#555555]'>Total Data</h1>
                            <p className='font-bold'>{data?.totalDocuments}</p>
                        </div>
                    </div>
                    <div className='border  bg-white text-black p-5 rounded-md flex items-center justify-center gap-3 h-[100px] '>
                        <div className='bg-[#57CAEB] rounded-xl p-4'>
                            <Building color="#ffffff" />
                        </div>
                        <div>
                            <h1 className='text-[#555555]'>Total Country</h1>
                            <p className='font-bold'>{data?.totalData?.totalCountry}</p>
                        </div>
                    </div>
                    <div className='border  bg-white text-black p-5 rounded-md flex items-center justify-center gap-3 h-[100px] '>
                        <div className='bg-[#5DDAB4] rounded-xl p-4'>
                            <Earth color="#ffffff" />
                        </div>
                        <div>
                            <h1 className='text-[#555555]'>Total Regions</h1>
                            <p className='font-bold'>{data?.totalData?.totalRegions}</p>
                        </div>
                    </div>
                    <div className='border  bg-white text-black p-5 rounded-md flex items-center justify-center gap-3 h-[100px] '>
                        <div className='bg-[#FF7976] rounded-xl p-4'>
                            <Factory color="#ffffff" />
                        </div>
                        <div>
                            <h1 className='text-[#555555]'>Total sector</h1>
                            <p className='font-bold'>{data?.totalData?.totalSectors}</p>
                        </div>
                    </div>
                    <div className='border  bg-white text-black p-5 rounded-md flex items-center justify-center gap-3 h-[100px] '>
                        <div className='bg-[#435EBE] rounded-xl p-4'>
                            <Donut color="#ffffff" />
                        </div>
                        <div>
                            <h1 className='text-[#555555]'>Total topic</h1>
                            <p className='font-bold'>{data?.totalData?.totalTopics}</p>
                        </div>
                    </div>



                </div>
            }
        </>

    )
}

export default NumberBox
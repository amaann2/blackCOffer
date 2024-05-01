import Heading from "../components/Heading";
import GeoHeatMapImage from "../assets/geo.png"; // Import your geo heat map screenshot image

const GeoHeatMap = () => {
    return (
        <div className="flex flex-col py-12 px-12">
            <Heading title={'Implementation of Geo Heat Map'} description="Explanation of the Geo Heat Map Implementation" />

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700">
                    This page provides an explanation of how the geo heat map is implemented to visualize intensity based on country name. The heat map is designed to show the intensity of each country, providing a visual representation of data distribution across regions.
                </p>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Implementation Details</h2>
                <p className="text-gray-700">
                    The implementation involves utilizing geographical data and intensity values to generate the heat map. This is achieved using a combination of frontend and backend technologies.
                </p>
                <p className="text-gray-700 mt-2">
                    Below is a screenshot of the geo heat map:
                </p>
                <img src={GeoHeatMapImage} alt="Geo Heat Map Screenshot" className="mt-4" />
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
                <p className="text-gray-700">
                    In conclusion, the geo heat map implementation offers a visual representation of intensity based on country name. It enhances data analysis and comprehension by providing a clear visualization of data distribution across geographical regions.
                </p>
            </div>
        </div>
    )
}

export default GeoHeatMap;

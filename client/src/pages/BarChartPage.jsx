import Heading from "../components/Heading";

const BarChartPage = () => {
    return (
        <div className="flex flex-col py-12 px-12">
            <Heading title={'How I Implemented the Bar Chart?'} description="Explanation of the Bar Chart Implementation" />

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700">
                    This page provides an explanation of how the bar chart is implemented using the MERN stack (MongoDB, Express, React, Node.js).
                </p>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Backend Implementation</h2>
                <p className="text-gray-700">
                    The backend implementation involves creating an API endpoint to fetch data for the bar chart. This endpoint, located at '/api/v1/dashboard/barchart', accepts query parameters for the X and Y axes. The backend code aggregates data from the MongoDB collection using Mongoose and returns the aggregated data as JSON.
                </p>
                <p className="text-gray-700 mt-2">
                    Below is the backend code snippet for fetching bar chart data:
                </p>
                {/* Insert backend code snippet here */}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Frontend Implementation</h2>
                <p className="text-gray-700">
                    The frontend implementation involves creating a React component to display the bar chart. This component fetches data from the backend API based on the selected X and Y axis values using the 'useApi' custom hook. It then uses the 'react-apexcharts' library to render the bar chart dynamically.
                </p>
                <p className="text-gray-700 mt-2">
                    Below is the frontend code snippet for the bar chart component:
                </p>
                {/* Insert frontend code snippet here */}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
                <p className="text-gray-700">
                    In conclusion, the bar chart implementation involves fetching data from the backend, aggregating it based on the selected axes, and then visualizing it on the frontend using a React component.
                </p>
            </div>
        </div>
    )
}

export default BarChartPage;

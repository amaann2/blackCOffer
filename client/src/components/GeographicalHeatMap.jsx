import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useApi from '../hooks/useApi';
import Heading from './Heading';
const GeographicalHeatMap = () => {
    const { data, isLoading } = useApi('/geoheatmap')
    console.log(data)
    useEffect(() => {
        const map = L.map('map').setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);


        const getColor = (intensity) => {
            return intensity > 5 ? 'red' :
                intensity > 3 ? 'orange' :
                    'yellow';
        };

        data?.geoHeatMapData?.forEach(({ _id, intensity, latitude, longitude }) => {
            console.log(intensity)
            console.log(latitude)
            console.log(longitude)
            const circle = L.circleMarker([latitude, longitude], {
                color: 'black',
                fillColor: getColor(intensity),
                fillOpacity: 0.7,
                radius: 10
            }).addTo(map);

            circle.bindPopup(`<b>${_id}</b><br>Intensity: ${intensity}`).openPopup();
        });


        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend');
            return div;
        };
        legend.addTo(map);

        return () => {
            map.remove();
        };
    }, [data]);

    return (

        <div className='border p-6 my-5 shadow-md bg-white rounded-md'>

            <Heading title={'Exploring Global Intensity: Geographical Heat Map'} description="Discover global intensity trends and spatial distributions through our Geographical Heat Map, showcasing color-coded markers representing varying data intensities across different regions. " />
            {isLoading ?
                <>
                    <hr />
                    <Heading title={''} description="It will take time to load this data as this is calling from free external api.... please wait for a minute  " />

                </>
                :
                ''}
            <div id="map" style={{ height: '500px' }} />


        </div>



    );
};

export default GeographicalHeatMap;

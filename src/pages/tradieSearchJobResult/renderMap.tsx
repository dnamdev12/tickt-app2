import { useState, useCallback, useRef } from 'react';
// @ts-ignore
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import jobIconDemo from "../../assets/images/jobicon.png";

const libraries: any = ["places", "geometry"];

// const center = {
//     lat: -37.840935,
//     lng: 144.946457
//     // lat: 21.17021,
//     // lng: 72.831062
// }

const mapContainerStyle = {
    width: "100%",
    height: "100vh"
}

const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const RenderMap = (props: any) => {
    const [center, setCenter] = useState<any>('');

    // var mapCenterCoordinates;
    // const jobResultsParam = new URLSearchParams(props.location?.search).get('jobResults');
    // if (props.searchByFilter) {
    //     mapCenterCoordinates = props.homeSearchJobData?.slice(0, 1);
    // } else if (jobResultsParam == 'viewNearByJob') {
    //     mapCenterCoordinates = props.viewNearByJobData?.slice(0, 1);
    // } else {
    //     mapCenterCoordinates = props.homeSearchJobData?.slice(0, 1);
    // }
    // console.log(mapCenterCoordinates, "mapCenterCoordinates");
    // const center = {
    //     lat: mapCenterCoordinates?.length > 0 ? mapCenterCoordinates[0]?.location?.coordinates[1] : -37.840935,
    //     lng: mapCenterCoordinates?.length > 0 ? mapCenterCoordinates[0]?.location?.coordinates[0] : 144.946457
    //     // lat: 21.17021,
    //     // lng: 72.831062
    // }
    const setMapCenter = () => {
        var mapCenterCoordinates;
        const jobResultsParam = new URLSearchParams(props.location?.search).get('jobResults');
        if (props.searchByFilter) {
            mapCenterCoordinates = props.homeSearchJobData?.slice(0, 1);
        } else if (jobResultsParam == 'viewNearByJob') {
            mapCenterCoordinates = props.viewNearByJobData?.slice(0, 1);
        } else {
            mapCenterCoordinates = props.homeSearchJobData?.slice(0, 1);
        }
        console.log(mapCenterCoordinates, "mapCenterCoordinates");
        const newCenter = {
            lat: mapCenterCoordinates?.length > 0 ? mapCenterCoordinates[0]?.location?.coordinates[1] : -37.840935,
            lng: mapCenterCoordinates?.length > 0 ? mapCenterCoordinates[0]?.location?.coordinates[0] : 144.946457
        }
        if (JSON.stringify(center) == JSON.stringify(newCenter)) {
            return;
        } else {
            setCenter(newCenter);
            console.log('map center fn clicked 1111', newCenter,"mapCenterCoordinates", mapCenterCoordinates);
        }
        console.log('map center fn clicked 22222', newCenter,"mapCenterCoordinates", mapCenterCoordinates);
    }
    const [markers, setMarkers] = useState<Array<any>>([]);
    const [selected, setSelected] = useState<any>(null);

    const onMapClick = useCallback((event) => {
        setMarkers(current => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }])
    }, [])

    // console.log(props, "renderMap screen", mapCenterCoordinates[0]?.location?.coordinates[1], mapCenterCoordinates[0]?.location?.coordinates[0]);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    // if (loadError) return <span>Error loading maps</span>;
    // if (!isLoaded) return <span>Loading maps</span>;
    console.log(props, "props renderMap");

    const renderJobsData = () => {
        setMapCenter();
        var jobsData;
        const jobResultsParam = new URLSearchParams(props.location?.search).get('jobResults');
        // if (props.filterByPrice) {
        if (props.searchByFilter) {
            jobsData = props.homeSearchJobData;
            return jobsData;
        }
        if (jobResultsParam == 'viewNearByJob') {
            jobsData = props.viewNearByJobData;
            return jobsData;
        } else {
            jobsData = props.homeSearchJobData;
            return jobsData;
        }
        return null;
    }

    const jobClickHandler = (item: any) => {
        props.history.push(`/job-details-page?jobId=${item.jobId}&tradeId=${item.tradeId}&specializationId=${item.specializationId}`);
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {renderJobsData()?.map((item: any) => (
                    <Marker
                        key={item.jobId}
                        position={{ lat: item.location.coordinates[1], lng: item.location.coordinates[0] }}
                        icon={{
                            url: jobIconDemo,
                            scaledSize: new window.google.maps.Size(45, 45),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(20, 20)
                        }}
                        onClick={() => {
                            const lat = item.location.coordinates[1];
                            const lng = item.location.coordinates[0];
                            setSelected(item);
                        }}
                    />
                ))}
                {selected ? (<InfoWindow position={{ lat: selected.location.coordinates[1], lng: selected.location.coordinates[0] }}
                    onCloseClick={() => setSelected(null)}
                >
                    <div className="preview_card" data-aos="fade-in" data-aos-delay="40" data-aos-duration="1000">
                        <div className="tradie_card">
                            <a href="javascript:void(0)" className="more_detail circle" onClick={() => jobClickHandler(selected)}></a>
                            <div className="user_wrap">
                                <figure className="u_img">
                                    <img src={selected.tradeSelectedUrl ? selected.tradeSelectedUrl : ""} alt="traide-img" />
                                </figure>
                                <div className="details">
                                    <span className="name">{selected.tradeName}</span>
                                    <span className="prof">{selected.jobName}</span>
                                </div>
                            </div>
                            <div className="job_info">
                                <ul>
                                    <li className="icon clock">{selected.time}</li>
                                    <li className="icon dollar">{selected.amount}</li>
                                    <li className="icon location line-1">{selected.locationName}</li>
                                    <li className="icon calendar">{selected.durations}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}

export default RenderMap;

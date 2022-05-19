import { useContext, useEffect, useState } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";

/* API keys */
import { GOOGLE_MAP_API_KEY } from "../../common";

/* Types */
import { ColledgeDataType } from "../../common";

/* Context */
import { CollegeDataContext } from "../../context";

/* Utils */
import { calculateCenter } from "./MapSection.utils";

const containerStyle = {
	width: "100%",
	height: "85vh",
};

type CenterType = {
	lat: number;
	lng: number;
}

// custom center of the USA (as middle as possible)
const center: CenterType = {
	lat: 38.05458,
	lng: -98.870322,
};

type ContentType = Partial<ColledgeDataType>;

function CollegeMap() {
	const { collegeData } = useContext(CollegeDataContext);
	// to set the center of the map to the coordinates average of the search coordinates
	const [mapCenter, setMapCenter] = useState<CenterType>(center);
	// Info Window States
	const [open, setOpen] = useState<boolean>(false);
	const [content, setContent] = useState<ContentType>({});

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: GOOGLE_MAP_API_KEY || "",
	});

	const handleMarkerMouseOver = (name: string, lat: number, lng: number) => {
		setContent({ name, lat, lng });
		setOpen(true);
	};

	const infoContent = <div>{content.name}</div>;

	useEffect(() => {
		if (collegeData.length) {
			const newCenter = calculateCenter(collegeData);
			setMapCenter(newCenter);
		}
	}, [collegeData]);

	return isLoaded ? (
		<div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={mapCenter}
				zoom={5}
			>
				{collegeData.map(({ name, lat, lng }, index) => {
					// Sometimes the lat and lon values are coming as 'null' from the API
					return (
						lat &&
						lng && (
							<Marker
								key={index}
								position={{ lat, lng }}
								draggable={false}
								onMouseOver={() => handleMarkerMouseOver(name, lat, lng)}
								onMouseOut={() => setOpen(false)}
							></Marker>
						)
					);
				})}
				{open && (
					<InfoWindow
						position={{
							lat: content.lat as number,
							lng: content.lng as number,
						}}
						options={{ pixelOffset: new google.maps.Size(0, -40) }}
					>
						{infoContent}
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	) : null;
}

export default CollegeMap;

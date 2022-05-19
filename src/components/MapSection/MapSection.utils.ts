import { ColledgeDataType } from "../../common";

/**
 * Calculates a center average based on lat and lng from the provided list
 * @param collegeData the data containing the coordenates info
 * @returns a { lat: number, lng: number } point
 */
export const calculateCenter = (
	collegeData: ColledgeDataType[]
): { lat: number; lng: number } => {
	const centerAve = collegeData.reduce(
		(acc, { lat, lng }) => {
			let latAve = acc.lat + lat;
			let lngAve = acc.lng + lng;
			return { lat: latAve, lng: lngAve };
		},
		{ lat: 0, lng: 0 }
	);

	return {
		lat: centerAve.lat / collegeData.length,
		lng: centerAve.lng / collegeData.length,
	};
};

import { ColledgeDataType } from "../../common";

/**
 * Calculates a center average based on lat and lng from the provided list
 * @param collegeData the data containing the coordenates info
 * @returns a { lat: number, lng: number } point
 */
export const calculateCenter = (
	collegeData: ColledgeDataType[]
): { lat: number; lng: number } => {
	const latAve =
		collegeData.reduce((acc, { lat }) => {
			return acc + lat;
		}, 0) / collegeData.length;
	const lngAve =
		collegeData.reduce((acc, { lng }) => {
			return acc + lng;
		}, 0) / collegeData.length;

	return { lat: latAve, lng: lngAve };
};

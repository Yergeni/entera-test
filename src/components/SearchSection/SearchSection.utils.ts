import { ColledgeDataType } from "../../common";

/**
 * Transforms an array of type any to an array of type ColledgeDataType
 * @param input an array of type any
 * @returns an Array of type ColledgeDataType
 */
export const mapToCollegeDataType = (input: any[]): ColledgeDataType[] => {
	const collegeData: ColledgeDataType[] = [];

	for (const item of input) {
		const data: ColledgeDataType = {
			id: item.id,
			name: item["school.name"],
			lat: item["location.lat"],
			lng: item["location.lon"],
		};

		collegeData.push(data);
	}
	return collegeData;
};

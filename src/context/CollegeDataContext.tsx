import { createContext, useState } from "react";

import { ColledgeDataType } from "../common/types";

type CollegeDataContextProps = {
	collegeData: ColledgeDataType[];
	updateCollegeData: (data: ColledgeDataType[]) => void;
};

const DEFAULT_VALUE: CollegeDataContextProps = {
	collegeData: [],
	updateCollegeData: () => {},
};

export const CollegeDataContext =
	createContext<CollegeDataContextProps>(DEFAULT_VALUE);

// The provider
export default function CollegeDataContextProvider({ children }: any) {
	const [collegeData, updateCollegeData] = useState<ColledgeDataType[]>([]);

	return (
		<CollegeDataContext.Provider value={{ collegeData, updateCollegeData }}>
			{children}
		</CollegeDataContext.Provider>
	);
}

import React, { useContext, useState } from "react";
import axios from "axios";

/* COntext */
import { CollegeDataContext } from "../../context";

/* Constants */
import { COLLEGE_API_URL, COLLEGE_SCORECARD_API_KEY } from "../../common";

/* Utils */
import { mapToCollegeDataType } from "./SearchSection.utils";

/* Components */
import Spinner from "../UI/atoms";

/* CSS */
import "./SearchSection.css";

function SearchButton() {
	const { collegeData, updateCollegeData } = useContext(CollegeDataContext);
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const disabledButton = !search || loading;

	const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(evt.target.value);
	};

	const handleInputEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.key === 'Enter') {
			handleExecuteSerch();
		}
	}

	const handleExecuteSerch = async () => {
		setLoading(true);
		const params = {
			api_key: COLLEGE_SCORECARD_API_KEY || "",
			fields: "id,school.name,location",
			"school.name": `${encodeURI(search)}}`,
		};

		axios
			.get(COLLEGE_API_URL, { params })
			.then((response) => {
				const mappedData = mapToCollegeDataType(response.data.results);
				updateCollegeData(mappedData);
				setLoading(false);
				setErrorMsg(null);
			})
			.catch((error) => {
				setLoading(false);
				setErrorMsg(error.message);
			});
	};

	return (
		<>
			<div className="search-section-container">
				<input
					className="search-section-input"
					type="search"
					value={search}
					onChange={handleSearchChange}
					onKeyDown={handleInputEnter}
					placeholder="Enter a College name"
				/>
				<button
					className="search-section-button"
					disabled={disabledButton}
					onClick={handleExecuteSerch}
				>
					Search
				</button>
				{loading && <Spinner />}
			</div>
			{errorMsg && <div className="search-section-error">{errorMsg}</div>}
		</>
	);
}

export default SearchButton;

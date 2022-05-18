import React from "react";
import MapContainer from "../components/MapSection/MapContainer";
import SearchButton from "../components/SearchSection/SearchSection";

function Home() {

	return (
		<div>
			<SearchButton />
      <br />
      <MapContainer />
		</div>
	);
}

export default Home;

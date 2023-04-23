import { useState } from "react";
import "./App.css";
import List from "./List";

function App() {
	return (
		<>
			<List
				items={[
					{ text: "Hello" },
					{ text: "World" },
					{ text: "World" },
				]}
			/>
		</>
	);
}

export default App;

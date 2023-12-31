import React from "react";
import { Canvas } from "@react-three/fiber";
import Blob from "./Blob";

const Camera = () => {
	return (
		<Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
			<Blob />
		</Canvas>
	);
};

export default Camera;

import React, { useMemo, useRef } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const Blob = () => {
	const mesh = useRef(null);
	const hover = useRef(false);
	//@ts-ignore
	const uniforms = useMemo(() => {
		return {
			u_time: { value: 0 },
			u_intensity: { value: 0 },
		};
	}, []);

	useFrame((state) => {
		const { clock } = state;
		if (mesh.current) {
			//@ts-ignore
			mesh.current.material.uniforms.u_time.value =
				0.4 * clock.getElapsedTime();
			//@ts-ignore
			mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
				//@ts-ignore
				mesh.current.material.uniforms.u_intensity.value,
				hover.current ? 0.2 : 0.1,
				0.02,
			);
		}
	});
	return (
		<mesh
			ref={mesh}
			scale={2}
			position={[0, 0, 0]}
			onPointerOver={() => (hover.current = true)}
			onPointerOut={() => (hover.current = false)}>
			<icosahedronGeometry attach='geometry' args={[2, 20]} />
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
			/>
		</mesh>
	);
};

export default Blob;

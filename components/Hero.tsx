"use client";

import React, { useRef, useEffect, Suspense } from "react";
import gsap, { Power0, Sine } from "gsap";
import Camera from "./3d/Camera";

const Hero = () => {
	let textRef = useRef(null);
	let camera = useRef(null);

	const tl = gsap.timeline();
	useEffect(() => {
		tl.from(camera.current, {
			opacity: 0,
			y: -100,
			scale: 1,
			duration: 2,
			ease: Sine.easeIn,
		});

		tl.from(textRef.current, {
			y: 100,
			opacity: 0,
			duration: 1,
			ease: Power0.easeInOut,
			stagger: {
				amount: 0.4,
			},
		});
		return () => {};
	}, [tl]);

	return (
		<div className='min-h-screen flex items-center justify-center relative'>
			{/* <Suspense fallback={<></>}> */}
			<div ref={camera} className='flex items-center w-full h-screen'>
				<Camera />
			</div>
			{/* </Suspense> */}
			<h1
				ref={textRef}
				className='absolute text-[3rem] md:text-[4rem] font-bold text-center'>
				Hello, I&apos;m Darshan Vinchi. I develop 3D visuals, user interfaces
				and web applications.
			</h1>
		</div>
	);
};

export default Hero;

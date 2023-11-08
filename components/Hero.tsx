"use client";

import React, { useRef, useEffect, Suspense } from "react";
import gsap, { Power0, Sine } from "gsap";
import Camera from "./3d/Camera";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const Hero = () => {
	let textRef = useRef(null);
	let camera = useRef(null);

	// const tl = gsap.timeline();
	const tl = useRef(gsap.timeline({ paused: true }));

	useEffect(() => {
		const animation = tl.current;

		animation
			.from(
				camera.current,
				{
					opacity: 0,
					y: -100,
					scale: 1,
					duration: 2,
					ease: Sine.easeIn,
				},
				"-=0.5",
			)
			.from(
				textRef.current,
				{
					y: 100,
					opacity: 0,
					duration: 1,
					ease: Power0.easeInOut,
					stagger: {
						amount: 0.4,
					},
				},
				"-=0.5",
			)
			.play();
	}, []);

	return (
		<div className='min-h-screen flex flex-col items-center justify-center relative'>
			{/* <Suspense fallback={<></>}> */}
			<div ref={camera} className='flex items-center w-full h-screen'>
				<Camera />
			</div>
			{/* </Suspense> */}
			<h1
				ref={textRef}
				className='absolute text-[2.4rem] md:text-[4rem] font-bold text-center'>
				Hello, I&apos;m Darshan Vinchi. I develop 3D visuals, user interfaces
				and web applications.
			</h1>
			<div className='absolute bottom-7'>
				<HiOutlineChevronDoubleDown />
			</div>
		</div>
	);
};

export default Hero;

"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap, { Power1, Power3, Power4, Sine, TimelineMax } from "gsap";
import { cn } from "@/lib/utils";
import { BsArrowRightShort } from "react-icons/bs";

const Header = () => {
	const fullMenu = useRef<HTMLDivElement | null>(null);

	const item1 = useRef<HTMLDivElement | null>(null);
	const item2 = useRef<HTMLDivElement | null>(null);
	const item3 = useRef<HTMLDivElement | null>(null);
	const menuClose = useRef<HTMLDivElement | null>(null);
	const menuItem1 = useRef<HTMLDivElement | null>(null);
	const menuItem2 = useRef<HTMLDivElement | null>(null);
	const menuItem3 = useRef<HTMLDivElement | null>(null);
	const menuItem4 = useRef<HTMLDivElement | null>(null);

	const menuOpen = useRef<HTMLDivElement | null>(null);
	const tl = useRef(gsap.timeline({ paused: true }));
	const menuItemTl = useRef(gsap.timeline({ paused: true }));
	const tl1 = gsap.timeline();

	const [openMenu, setOpenMenu] = useState(false);
	const [menuItemsPlayed, setMenuItemsPlayed] = useState(false);

	useEffect(() => {
		tl1.from(fullMenu.current, {
			y: -100,
			opacity: 0,
			duration: 1,
			ease: Power1.easeIn,
		});
	}, []);

	useEffect(() => {
		const menuOpenRef = menuOpen.current;
		const animation = tl.current;
		const closeMenuOnClickOutside = (event: MouseEvent) => {
			if (
				menuClose.current &&
				!menuClose.current.contains(event.target as Node) &&
				menuOpenRef &&
				//@ts-ignore
				!menuOpenRef.contains(event.target as Node)
			) {
				setOpenMenu(false);
			}
		};

		if (openMenu) {
			animation.clear();
			animation
				.to(menuOpenRef, {
					duration: 0.5,
					width: "12rem",
					height: "17rem",
				})
				.to(
					item1.current,
					{
						y: 0,
						rotateZ: 120,
						width: 14,
						ease: Sine.easeIn,
					},
					"-=0.5",
				)
				.to(
					item2.current,
					{
						y: -5,
						width: 14,
						rotateZ: 60,
						ease: Sine.easeIn,
					},
					"-=0.5",
				)
				.to(
					item3.current,
					{
						y: 0,
						opacity: 0,
						ease: Sine.easeIn,
					},
					"-=0.5",
				)
				.play();

			if (!menuItemsPlayed) {
				menuItemTl.current
					.fromTo(
						[
							menuItem1.current,
							menuItem2.current,
							menuItem3.current,
							menuItem4.current,
						],
						{
							y: -5,
							opacity: 0,
							display: "hidden",
						},
						{
							y: 0,
							opacity: 1,
							duration: 1,
							ease: Sine.easeInOut,
							display: "flex",
							stagger: 0.1,
						},
					)
					.play();
			}
		} else {
			animation.clear();
			animation
				.to(menuOpenRef, {
					duration: 0.6,
					width: "2.3rem",
					height: "2.2rem",
				})
				.to(
					item1.current,
					{
						y: 0,
						rotateZ: 0,
						width: 12,
						ease: Sine.easeIn,
					},
					"-=0.6",
				)
				.to(
					item2.current,
					{
						y: 0,
						width: 12,
						rotateZ: 0,
						ease: Sine.easeIn,
					},
					"-=0.6",
				)
				.to(
					item3.current,
					{
						y: 0,
						opacity: 1,
						ease: Sine.easeIn,
					},
					"-=0.6",
				)
				.play();
		}

		document.addEventListener("click", closeMenuOnClickOutside);

		return () => {
			document.removeEventListener("click", closeMenuOnClickOutside);
		};
	}, [openMenu, tl, menuItemTl, menuItemsPlayed]);

	const MouseEnertItem1 = () => {
		const animation = new TimelineMax({ paused: true });
		// const animation = tl.current;

		animation
			.staggerTo(
				menuItem1.current,
				0.1,
				{
					text: "HOME",
					y: "-100%",
					ease: Power4.easeOut,
				},
				-0.025,
			)
			.play();
	};

	const onMovesEnter = () => {
		const animation = tl.current;
		animation
			.add("start")
			.to(
				item1.current,
				{
					y: -2,
					duration: 0.5,
					ease: Power3.easeIn,
				},
				"start",
			)
			.to(
				item3.current,
				{
					y: 2,
					duration: 0.5,
					ease: Power3.easeIn,
				},
				"start",
			);
	};

	const onMovesLeave = () => {
		tl.current.to([item1.current, item3.current], {
			duration: 0.5,
			y: 0,
			ease: Power3.easeIn,
		});
	};

	return (
		<div ref={fullMenu} className='flex flex-col items-end justify-end gap-4'>
			<div className='mr-2 mb-2 relative'>
				{openMenu && (
					<div
						className={cn(
							"absolute right-12 top-7 w-24",
							// openMenu ? "block" : "hidden",
						)}>
						<div className='my-2 cursor-pointer'>
							<div
								ref={menuItem1}
								className='hidden justify-between items-center'>
								<div className='uppercase'>Home</div>
								<div>
									<BsArrowRightShort />
								</div>
							</div>
						</div>
						<div className='my-2 cursor-pointer'>
							<div
								ref={menuItem2}
								className='hidden justify-between items-center'>
								<div className='uppercase'>about</div>
								<div>
									<BsArrowRightShort />
								</div>
							</div>
						</div>
						<div className='my-2 cursor-pointer'>
							<div
								ref={menuItem3}
								className='hidden justify-between items-center'>
								<div className='uppercase'>work</div>
								<div>
									<BsArrowRightShort />
								</div>
							</div>
						</div>
						<div className='my-2 cursor-pointer'>
							<div
								ref={menuItem4}
								className='hidden justify-between items-center'>
								<div className='uppercase'>contact</div>
								<div>
									<BsArrowRightShort />
								</div>
							</div>
						</div>
					</div>
				)}
				<div
					onClick={() => {
						setOpenMenu(!openMenu);
					}}
					ref={menuClose}
					onMouseEnter={onMovesEnter}
					onMouseLeave={onMovesLeave}
					className='p-3 absolute bottom-0 right-0 w-[2.3rem] h-[2.2rem] cursor-pointer rounded-md'>
					<div className='absolute bottom-3 right-3 flex flex-col gap-1'>
						<div
							ref={item1}
							className='bg-white border border-white w-[12px]'
						/>
						<div
							ref={item2}
							className='bg-white border border-white w-[12px]'
						/>
						<div
							ref={item3}
							className='bg-white border border-white w-[12px]'
						/>
					</div>
				</div>
				<div
					//@ts-ignore
					ref={menuOpen}
					className='border w-[2.3rem] h-[2.2rem] rounded-md p-4 bg-slate-800'></div>
			</div>
		</div>
	);
};

export default Header;

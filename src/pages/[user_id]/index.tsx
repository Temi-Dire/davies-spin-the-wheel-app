import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { useElements } from "@/hooks/useElements";


export default function Home() {
    const [rotateWheel, setRotateWheel] = useState<number>(0);
    const wheelRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState<boolean>(false);
    
    const router = useRouter();
    
    // const [spins, setSpins] = useState<number>(5);
    const [open, setOpen] = useState<string | null | undefined | number>(null);
    
    const { query } = useRouter();
    const { user_id } = query;
    
    const { data } = useElements(user_id as string);
    
    const segments = data?.wheels.map((item) => item.value);

    const handleClick = () => {
        // Generate a random rotation angle between 0 and 3600 degrees
        const newRotation = rotateWheel + Math.ceil(Math.random() * 3600);
        setSpinning(true);
        setRotateWheel(newRotation);
        // setSpins((prev) => (prev > 0 ? prev - 1 : 0));

        const totalSegments = segments?.length;
        const rotationPerSegment = totalSegments && 360 / totalSegments;
        const normalizedRotation = newRotation % 360; // Ensure angle is between 0 and 359 degrees

        // Determine the segment index using a more accurate approach
        // Use `Math.floor` to get the segment index directly
        const segmentIndex = rotationPerSegment && Math.floor((normalizedRotation + rotationPerSegment / 2) / rotationPerSegment) % totalSegments;

        // Log the value that the pointer lands on
        const value = segments && segmentIndex && segments[segmentIndex];
        console.log(`The pointer lands on: ${value} ${JSON.stringify(router.query)}`);
        console.log(data, process.env.NEXT_PUBLIC_BASE_URL)
    };

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (wheelRef.current) {
                // Calculate the index of the segment the pointer lands on
                const totalSegments = segments?.length;
                const rotationPerSegment = totalSegments && 360 / totalSegments;
                const normalizedRotation = (rotateWheel ?? 0) % 360; // Ensure angle is between 0 and 359 degrees

                // Determine the segment index using a more accurate approach
                const segmentIndex = rotationPerSegment && Math.floor((normalizedRotation + rotationPerSegment / 2) / rotationPerSegment) % totalSegments;

                // Log the value that the pointer lands on
                const value = segments && segmentIndex && segments[segmentIndex];
                setSpinning(false);
                console.log(`The pointer lands on: ${value}`);
                setOpen(value);
            }
        };

        if (wheelRef.current) {
            wheelRef.current.addEventListener("transitionend", handleTransitionEnd);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (wheelRef.current) {
                wheelRef.current.removeEventListener("transitionend", handleTransitionEnd);
            }
        };
    }, [rotateWheel]);

    return (
        <main className="">
            <SEO title="Home" />
            <h1 className=" pt-2 text-center text-5xl font-bold text-black">SPIN-THE-WHEEL</h1>
            <div className="flex h-[60vh] w-full  items-center justify-center ">
                <div className="container">
                    <div className={"spinBtn"}>{data?.spins}</div>
                    <div ref={wheelRef} className="wheel" style={{ transform: `rotate(${rotateWheel}deg)` }}>
                    <div className="number number--one">
                            <span>{data?.wheels[0]?.value}</span>
                        </div>
                        <div className="number number--two">
                            <span>{data?.wheels[1]?.value}</span>
                        </div>
                        <div className="number number--three">
                            <span>{data?.wheels[2]?.value}</span>
                        </div>
                        <div className="number number--four">
                            <span>{data?.wheels[3]?.value}</span>
                        </div>
                        <div className="number number--five">
                            <span>{data?.wheels[4]?.value}</span>
                        </div>
                        <div className="number number--six">
                            <span>{data?.wheels[5]?.value}</span>
                        </div>
                        <div className="number number--seven ">
                            <span>{data?.wheels[6]?.value}</span>
                        </div>
                        <div className="number number--eight">
                            <span>{data?.wheels[7]?.value}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center text-2xl font-bold text-white">
                {data?.spins !== 0 && (
                    <button disabled={spinning} className={`rounded-md bg-black px-4 py-2 ${spinning && "cursor-not-allowed"}`} onClick={handleClick}>
                        SPIN
                    </button>)}
                    {/* <button onClick={() => console.log(data?.wheels.map((item) => item.value))}>click</button> */}
                {/* ) : ( */}
                    {/* <p>You have no spins left</p> */}
                {/* )} */}
            </div>
            <Modal message={`You won a ${open}`} isOpen={open ? true : false} onClose={() => setOpen(null)} />
        </main>
    );
}

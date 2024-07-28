import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import Modal from "@/components/Modal";

const segments = ["100", "20", "5", "10", "1000", "0", "50", "1"];

export default function Home() {
    const [rotateWheel, setRotateWheel] = useState<number>(0);
    const wheelRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState<boolean>(false);

    const [spins, setSpins] = useState<number>(5);
    const [open, setOpen] = useState<string | null>(null);

    const handleClick = () => {
        // Generate a random rotation angle between 0 and 3600 degrees
        const newRotation = rotateWheel + Math.ceil(Math.random() * 3600);
        setSpinning(true);
        setRotateWheel(newRotation);
        setSpins((prev) => (prev > 0 ? prev - 1 : 0));
    };

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (wheelRef.current) {
                // Calculate the index of the segment the pointer lands on
                const totalSegments = segments.length;
                const rotationPerSegment = 360 / totalSegments;
                const normalizedRotation = (rotateWheel ?? 0) % 360; // Ensure angle is between 0 and 359 degrees

                // Determine the segment index using a more accurate approach
                const segmentIndex = Math.floor((normalizedRotation + rotationPerSegment / 2) / rotationPerSegment) % totalSegments;

                // Log the value that the pointer lands on
                const value = segments[segmentIndex];
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
            <h1 className=" pt-2 text-center text-5xl font-bold text-black">DAVIES SPIN-THE-WHEEL APP</h1>
            <div className="flex h-[60vh] w-full  items-center justify-center ">
                <div className="container">
                    <div className={"spinBtn"}>{spins}</div>
                    <div ref={wheelRef} className="wheel" style={{ transform: `rotate(${rotateWheel}deg)` }}>
                        <div className="number number--one">
                            <span>100</span>
                        </div>
                        <div className="number number--two">
                            <span>1</span>
                        </div>
                        <div className="number number--three">
                            <span>50</span>
                        </div>
                        <div className="number number--four">
                            <span>0</span>
                        </div>
                        <div className="number number--five">
                            <span>1000</span>
                        </div>
                        <div className="number number--six">
                            <span>10</span>
                        </div>
                        <div className="number number--seven ">
                            <span>5</span>
                        </div>
                        <div className="number number--eight">
                            <span>20</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center text-2xl font-bold text-white">
                {spins !== 0 ? (
                    <button disabled={spinning} className={`rounded-md bg-black px-4 py-2 ${spinning && "cursor-not-allowed"}`} onClick={handleClick}>
                        SPIN
                    </button>
                ) : (
                    <p>You have no spins left</p>
                )}
            </div>
            <Modal message={`You won a ${open}`} isOpen={open ? true : false} onClose={() => setOpen(null)} />
        </main>
    );
}

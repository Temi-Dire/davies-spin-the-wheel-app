import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { useElements } from "@/hooks/useElements";
import { useSendData } from "@/hooks/useSendData";
type GiftData = {
    value: string;
    type: string;
};

export default function Home() {
    const [rotateWheel, setRotateWheel] = useState<number>(0);
    const wheelRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState<boolean>(false);

    const router = useRouter();

    // const [spins, setSpins] = useState<number>(5);
    const [open, setOpen] = useState<GiftData | null | undefined>(null);

    const { query } = useRouter();
    const { user_id, bot_id } = query;

    let { data } = useElements(user_id as string, bot_id as string);
    const { mutate } = useSendData(user_id as string, bot_id as string);

    const segments = data?.wheels;

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
        const s = segments && segmentIndex && segments[segmentIndex];
        data.spins--;
        // Send post request to /api/{bot_id}/{user_id}/spin
        mutate(s);
        console.log(`The pointer lands on: ${s.value} ${s.type}`);
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
    useEffect(() => {
        if (segments && wheelRef.current) {
            const wheel = wheelRef.current;
            const colors = ["#d25353", "purple", "yellow", "green", "blue", "orange", "brown", "wheat", "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#F5FF33", "#FF8C00", "#8B0000", "#2E8B57", "#4682B4", "#DAA520", "#4B0082", "#FF4500"];
            const segmentCount = segments.length;

            segments.forEach((segment: GiftData, index: number) => {
                const segmentDiv = document.createElement("div");
                segmentDiv.className = `number`;
                segmentDiv.style.background = colors[index % colors.length];
                segmentDiv.style.transform = `rotate(${(360 / segmentCount) * index}deg)`;
                segmentDiv.innerHTML = `<span>${segment.value}</span>`;
                wheel.appendChild(segmentDiv);
            });
        }
    }, [segments]);
    return (
        <main className="">
            <SEO title="Home" />
            <h1 className=" pt-2 text-center text-5xl font-bold text-black">SPIN-THE-WHEEL</h1>
            <div className="flex h-[60vh] w-full  items-center justify-center ">
                <div className="container">
                    <div className={"spinBtn"}>{data?.spins}</div>
                    <div ref={wheelRef} className="wheel" style={{ transform: `rotate(${rotateWheel}deg)` }}></div>
                </div>
            </div>
            <div className="flex items-center justify-center text-2xl font-bold text-white">
                {data?.spins !== 0 && (
                    <button disabled={spinning} className={`rounded-md bg-black px-4 py-2 ${spinning && "cursor-not-allowed"}`} onClick={handleClick}>
                        SPIN
                    </button>
                )}
                {/* <button onClick={() => console.log(data?.wheels.map((item) => item.value))}>click</button> */}
                {/* ) : ( */}
                {/* <p>You have no spins left</p> */}
                {/* )} */}
            </div>
            <Modal message={`You won a ${open?.value}`} isOpen={open ? true : false} onClose={() => setOpen(null)} />
        </main>
    );
}

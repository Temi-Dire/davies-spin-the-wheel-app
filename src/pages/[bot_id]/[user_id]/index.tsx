import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { useElements } from "@/hooks/useElements";
import { useSendData } from "@/hooks/useSendData";

type GiftData = {
    value: string;
    type: string;
    text?: string;
};

export default function Home() {
    const [rotateWheel, setRotateWheel] = useState<number>(0);
    const wheelRef = useRef<HTMLDivElement>(null);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [open, setOpen] = useState<GiftData | null | undefined>(null);

    const { query } = useRouter();
    const { user_id, bot_id } = query;

    const { data } = useElements(user_id as string, bot_id as string);
    const { mutate } = useSendData(user_id as string, bot_id as string);

    const segments = data?.wheels;

    const getSegmentIndex = (rotation: number, totalSegments: number) => {
        const rotationPerSegment = 360 / totalSegments;
        const normalizedRotation = rotation % 360;
        const segmentIndex = Math.floor(normalizedRotation / rotationPerSegment);
        return segmentIndex;
    };

    const handleClick = () => {
        const newRotation = rotateWheel + Math.ceil(Math.random() * 3600);
        setSpinning(true);
        setRotateWheel(newRotation);

        const totalSegments = segments?.length ?? 12; // Default to 12 segments if not defined
        const segmentIndex = getSegmentIndex(newRotation, totalSegments);
        const s = segments ? segments[segmentIndex] : null;

        if (data) {
            data.spins--;
        }

        mutate(s);
        console.log(`New rotation: ${newRotation}`);
        console.log(`Normalized rotation: ${newRotation % 360}`);
        console.log(`Segment index: ${segmentIndex}`);
        console.log(`The pointer lands on: ${s?.value} ${s?.type}`);
    };

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (wheelRef.current) {
                const totalSegments = segments?.length ?? 12;
                const segmentIndex = getSegmentIndex(rotateWheel, totalSegments);
                const value = segments ? segments[segmentIndex] : null;

                setSpinning(false);
                setOpen(value);

                console.log(`Transition end - Total segments: ${totalSegments}`);
                console.log(`Transition end - Normalized rotation: ${rotateWheel % 360}`);
                console.log(`Transition end - Segment index: ${segmentIndex}`);
                console.log(`Transition end - The pointer lands on: ${value?.value} ${value?.type}`);
            }
        };

        if (wheelRef.current) {
            wheelRef.current.addEventListener("transitionend", handleTransitionEnd);
        }

        return () => {
            if (wheelRef.current) {
                wheelRef.current.removeEventListener("transitionend", handleTransitionEnd);
            }
        };
    }, [rotateWheel, segments]);

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
                segmentDiv.innerHTML = `<span style="transform: rotate(-143deg); margin-top: 6rem; margin-left: 2.5rem">${segment.text || segment.value}</span>`;
                wheel.appendChild(segmentDiv);
            });
        }
    }, [segments]);

    return (
        <main className="">
            <SEO title="Home" />
            <h1 className="pt-2 text-center text-5xl font-bold text-black">סובב את הגלגל</h1>
            <div className="flex h-[50vh] w-full items-center justify-center ">
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
            </div>
            <Modal
                message={`זכית ב ${open?.value}` + (open?.type === "product" ? `\nהמוצר יצורף באופן אוטומטי להזמנה הקרובה שלך ☑️` : "")}
                isOpen={open ? true : false}
                onClose={() => {
                    setOpen(null);
                    if (data?.spins === 0) window?.Telegram?.WebApp?.close();
                }}
            />
        </main>
    );
}
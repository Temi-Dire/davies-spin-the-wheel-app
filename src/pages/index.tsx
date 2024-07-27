import { useState } from "react";
import SEO from "@/components/SEO";

const segments = ["100", "20", "5", "10", "1000", "0", "50", "1"];

export default function Home() {
    const [rotateWheel, setRotateWheel] = useState<number | null>(null);

    const handleClick = () => {
        // Generate a random rotation angle between 0 and 3600 degrees
        const newRotation = Math.ceil(Math.random() * 3600);
        setRotateWheel(newRotation);

        // Calculate the index of the segment the pointer lands on
        const totalSegments = segments.length;
        const rotationPerSegment = 360 / totalSegments;
        const normalizedRotation = newRotation % 360; // Ensure angle is between 0 and 359 degrees

        // Determine the segment index using a more accurate approach
        // Use `Math.floor` to get the segment index directly
        const segmentIndex = Math.floor((normalizedRotation + rotationPerSegment / 2) / rotationPerSegment) % totalSegments;

        // Log the value that the pointer lands on
        const value = segments[segmentIndex];
        console.log(`The pointer lands on: ${value}`);
    };

    return (
        <>
            <SEO title="Home" />

            <div className="container">
                <div className="spinBtn" onClick={handleClick}>
                    Spin
                </div>
                <div className="wheel" style={{ transform: rotateWheel !== null ? `rotate(${rotateWheel}deg)` : "none" }}>
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
        </>
    );
}

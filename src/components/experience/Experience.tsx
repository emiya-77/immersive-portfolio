import Forest from "./Forest";
import Particles from "./Particles";
import CameraRig from "./CameraRig";
import ScrollController from "./ScrollController";
import ScrollSync from "./ScrollSync";

export default function Experience() {
    return (
        <>
            {/* Smooth scroll engine */}
            <ScrollController />
            <ScrollSync />

            {/* Background */}
            <color attach="background" args={["#061016"]} />

            {/* Fog */}
            <fog attach="fog" args={["#061016", 8, 30]} />

            {/* Lights */}
            <ambientLight intensity={0.25} />

            <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                color="#b9d5ff"
            />

            {/* Camera */}
            <CameraRig />

            {/* World */}
            <Particles />
            <Forest />
        </>
    );
}
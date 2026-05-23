import CameraRig from "./CameraRig";
import Forest from "./Forest";
import Particles from "./Particles";

export default function Experience() {
    return (
        <>
            {/* Background */}
            <color attach="background" args={["#061016"]} />

            {/* Fog */}
            <fog attach="fog" args={["#061016", 8, 30]} />

            {/* Lighting */}
            <ambientLight intensity={0.25} />

            <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                color="#b9d5ff"
            />

            {/* Environment */}
            <Particles />
            <Forest />

            {/* Camera movement */}
            <CameraRig />

            {/* Temporary center object */}
            <mesh position={[0, 1, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#88ccff" />
            </mesh>
        </>
    );
}
import Forest from "./Forest";
import Particles from "./Particles";
import CameraRig from "./CameraRig";
import ScrollController from "./ScrollController";
import ScrollSync from "./ScrollSync";
import ProjectStones from "./ProjectStones";
import { useScene } from "./useScene";

export default function Experience() {
    const scene = useScene();
    return (
        <>
            {/* Smooth scroll engine */}
            <ScrollController />
            <ScrollSync />

            {/* Background */}
            <color attach="background" args={["#061016"]} />

            {/* Fog */}
            {/* <fog attach="fog" args={["#061016", 8, 30]} /> */}
            <fog attach="fog" args={["#061016", scene.fogNear, scene.fogFar]} />

            {/* Lights */}
            {/* <ambientLight intensity={0.25} /> */}
            <ambientLight intensity={scene.light} />

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

            <ProjectStones />
        </>
    );
}
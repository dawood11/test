import { useEffect, useRef } from 'react';
import { NeatGradient } from "@firecms/neat";

type NeatConfig = {
    colors: Array<{
        color: string;
        enabled: boolean;
    }>;
    speed: number;
    horizontalPressure: number;
    verticalPressure: number;
    waveFrequencyX: number;
    waveFrequencyY: number;
    waveAmplitude: number;
    shadows: number;
    highlights: number;
    colorBrightness: number;
    colorSaturation: number;
    wireframe: boolean;
    colorBlending: number;
    backgroundColor: string;
    backgroundAlpha: number;
    grainScale: number;
    grainSparsity: number;
    grainIntensity: number;
    grainSpeed: number;
    resolution: number;
    showCredit: boolean;
}

function NeatBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const config: NeatConfig = {
            colors: [
                {
                    color: '#F2FF00',
                    enabled: true,
                },
                {
                    color: '#6B00FF',
                    enabled: true,
                },
                {
                    color: '#D5ECEB',
                    enabled: true,
                },
                {
                    color: '#E4E4E4',
                    enabled: false,
                },
                {
                    color: '#F6FFFF',
                    enabled: false,
                },
            ],
            speed: 1.5,
            horizontalPressure: 4,
            verticalPressure: 5,
            waveFrequencyX: 1,
            waveFrequencyY: 2,
            waveAmplitude: 10,
            shadows: 4,
            highlights: 7,
            colorBrightness: 1,
            colorSaturation: 0,
            wireframe: false,
            colorBlending: 7,
            backgroundColor: '#00A2FF',
            backgroundAlpha: 1,
            grainScale: 4,
            grainSparsity: 0,
            grainIntensity: 0.2,
            grainSpeed: 2.2,
            resolution: 0.65,
            showCredit: false
        };

        if (canvasRef.current) {
            const neat = new NeatGradient({
                ref: canvasRef.current,
                ...config
            });

            const handleResize = () => {
                if (canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                }
            };
            
            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                neat.destroy();
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1
            }}
        />
    );
}

export default NeatBackground;

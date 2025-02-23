import { ThreeElements } from '@react-three/fiber'

declare global {
    interface Window {
        adsbygoogle: any[];
    }

    namespace React {
        namespace JSX {
            interface IntrinsicElements extends ThreeElements {}
        }
    }
}

export {};

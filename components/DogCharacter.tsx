import React from 'react';
import Image from 'next/image';
import { TideState } from '@/types/tide';

interface DogCharacterProps {
    tideState: TideState;
    className?: string;
}

export const DogCharacter: React.FC<DogCharacterProps> = ({ tideState, className = '' }) => {
    const getImageSrc = () => {
        switch (tideState) {
            case 'low':
                return '/dog-happy.png';
            case 'high':
                return '/dog-sad.png';
            default:
                return '/dog-neutral.png';
        }
    };

    const getAltText = () => {
        switch (tideState) {
            case 'low':
                return 'Happy Cocker Spaniel playing on the beach';
            case 'high':
                return 'Sad Cocker Spaniel looking at high water';
            default:
                return 'Cocker Spaniel waiting';
        }
    };

    return (
        <div className={`relative transition-all duration-500 transform hover:scale-105 ${className}`}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl filter">
                <Image
                    src={getImageSrc()}
                    alt={getAltText()}
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
};

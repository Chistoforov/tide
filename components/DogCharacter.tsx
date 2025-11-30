import React from 'react';
import Image from 'next/image';
import type { TideData } from '@/types/tide';

interface DogCharacterProps {
    tideData: TideData | null;
    className?: string;
}

export const DogCharacter: React.FC<DogCharacterProps> = ({ tideData, className = '' }) => {
    // Вычисляем, сколько времени прошло с начала текущего состояния
    const getHoursSinceStart = (): number | null => {
        if (!tideData?.currentStateStart) return null;
        const now = new Date();
        const startTime = new Date(tideData.currentStateStart.timestamp * 1000);
        const diffMs = now.getTime() - startTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours;
    };

    const getImageSrc = () => {
        // 1. null - загрузка (нейтральное состояние)
        if (!tideData) {
            return '/dog-neutral.png';
        }

        const hoursSinceStart = getHoursSinceStart();
        const isHigh = tideData.currentState === 'high';
        const isLessThan3Hours = hoursSinceStart === null || hoursSinceStart < 3;

        // 2. high + < 3 часов - "Пока еще можно играть" -> dog-happy
        if (isHigh && isLessThan3Hours) {
            return '/dog-happy.png';
        }

        // 3. high + >= 3 часов - "Высокая вода" -> dog-sad
        if (isHigh && !isLessThan3Hours) {
            return '/dog-sad.png';
        }

        // 4. low + < 3 часов - "Скоро можно играть!" -> dog-neutral
        if (!isHigh && isLessThan3Hours) {
            return '/dog-neutral.png';
        }

        // 5. low + >= 3 часов - "Можно играть!" -> dog-happy
        if (!isHigh && !isLessThan3Hours) {
            return '/dog-happy.png';
        }

        // Fallback
        return '/dog-neutral.png';
    };

    const getAltText = () => {
        if (!tideData) {
            return 'Cocker Spaniel waiting';
        }

        const hoursSinceStart = getHoursSinceStart();
        const isHigh = tideData.currentState === 'high';
        const isLessThan3Hours = hoursSinceStart === null || hoursSinceStart < 3;

        if (isHigh && isLessThan3Hours) {
            return 'Happy Cocker Spaniel - tide is rising but still can play';
        }
        if (isHigh && !isLessThan3Hours) {
            return 'Sad Cocker Spaniel looking at high water';
        }
        if (!isHigh && isLessThan3Hours) {
            return 'Cocker Spaniel waiting for low tide';
        }
        if (!isHigh && !isLessThan3Hours) {
            return 'Happy Cocker Spaniel playing on the beach';
        }

        return 'Cocker Spaniel';
    };

    return (
        <div className={`relative transition-all duration-500 transform hover:scale-105 ${className}`}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden drop-shadow-2xl filter">
                <Image
                    src={getImageSrc()}
                    alt={getAltText()}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
};

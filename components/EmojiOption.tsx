
import React from 'react';
import type { EmojiOptionType } from '../types';

interface EmojiOptionProps {
    option: EmojiOptionType;
    isSelected: boolean;
    onSelect: () => void;
}

export const EmojiOption: React.FC<EmojiOptionProps> = ({ option, isSelected, onSelect }) => {
    const baseClasses = "bg-primary/20 border-2 border-primary rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ease-in-out";
    const hoverClasses = "hover:bg-primary/40 hover:-translate-y-1";
    const selectedClasses = "bg-primary/60 shadow-lg shadow-primary/30 ring-2 ring-secondary";

    return (
        <div
            className={`${baseClasses} ${isSelected ? selectedClasses : hoverClasses}`}
            onClick={onSelect}
        >
            <div className="text-4xl mb-2">{option.emoji}</div>
            <div className="font-bold text-sm">{option.label}</div>
        </div>
    );
};


import React from 'react';
import { EMOJI_OPTIONS } from '../constants';
import { EmojiOption } from './EmojiOption';

interface InputSectionProps {
    selectedEmotion: string | null;
    setSelectedEmotion: (emotion: string | null) => void;
    userInput: string;
    setUserInput: (input: string) => void;
    onAnalyze: () => void;
    onClear: () => void;
    isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
    selectedEmotion,
    setSelectedEmotion,
    userInput,
    setUserInput,
    onAnalyze,
    onClear,
    isLoading
}) => {
    return (
        <div className="bg-brand-card rounded-2xl p-6 shadow-2xl flex flex-col">
            <h2 className="text-primary text-2xl font-bold mb-5 pb-3 border-b-2 border-primary">
                Como ela está reagindo?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                {EMOJI_OPTIONS.map((option) => (
                    <EmojiOption
                        key={option.key}
                        option={option}
                        isSelected={selectedEmotion === option.key}
                        onSelect={() => setSelectedEmotion(option.key)}
                    />
                ))}
            </div>

            <div className="custom-input mt-5 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2">O que ela disse exatamente?</h3>
                <textarea
                    id="user-input"
                    placeholder="Cole aqui a mensagem dela..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full bg-white/10 border border-primary rounded-xl p-4 text-light text-base resize-vertical min-h-[120px] focus:ring-2 focus:ring-secondary focus:outline-none transition-all flex-grow"
                    disabled={isLoading}
                />

                <div className="flex gap-3 mt-4">
                    <button
                        onClick={onAnalyze}
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-bold rounded-lg py-3 px-5 text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-secondary hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? 'Analisando...' : 'Analisar e Gerar Resposta'}
                    </button>
                    <button
                        onClick={onClear}
                        disabled={isLoading}
                        className="w-full bg-gray-600 text-white font-bold rounded-lg py-3 px-5 text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-500 hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        Limpar
                    </button>
                </div>
            </div>
        </div>
    );
};

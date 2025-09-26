import React, { useState } from 'react';
import type { AIResponse } from '../types';
import { Loader } from './Loader';

interface OutputSectionProps {
    response: AIResponse | null;
    isLoading: boolean;
    error: string | null;
}

const ResponseOption: React.FC<{ text: string; onCopy: (text: string) => void }> = ({ text, onCopy }) => {
    return (
        <div 
            onClick={() => onCopy(text)}
            className="bg-white/10 border border-white/20 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-primary"
        >
            {text}
        </div>
    );
};

export const OutputSection: React.FC<OutputSectionProps> = ({ response, isLoading, error }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess('Copiado com sucesso!');
            setTimeout(() => setCopySuccess(''), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            setCopySuccess('Falha ao copiar.');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex flex-col items-center justify-center h-full"><Loader /><p className="mt-4 text-lg">A IA está pensando...</p></div>;
        }
        if (error) {
            return <div className="text-center text-red-400 text-lg">{error}</div>;
        }
        if (response) {
            return (
                <div className="animate-fade-in">
                    <h3 className="text-success text-xl font-bold mb-3">Análise da IA:</h3>
                    <p className="line-height-relaxed mb-4 bg-black/30 p-3 rounded-lg">{response.analysis}</p>

                    <div className="bg-success/10 border-l-4 border-success p-4 rounded-r-lg mb-6">
                        <strong className="text-success">Próxima Ação Estratégica:</strong>
                        <p>{response.nextAction}</p>
                    </div>

                    <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg mb-6">
                        <strong className="text-warning">🚨 Armadilha a Evitar:</strong>
                        <p>{response.commonPitfall}</p>
                    </div>

                    <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded-r-lg">
                        <strong className="text-secondary">Respostas Sugeridas pela IA:</strong>
                        <div className="flex flex-col gap-3 mt-3">
                           {response.suggestedResponses.map((res, index) => (
                               <ResponseOption key={index} text={res} onCopy={handleCopy} />
                           ))}
                        </div>
                         {copySuccess && <p className="text-center mt-4 text-success">{copySuccess}</p>}
                    </div>
                </div>
            );
        }
        return <p className="text-center text-lg opacity-70">Selecione como ela está reagindo e insira a mensagem dela para receber a análise da IA.</p>;
    };

    return (
        <div className="bg-brand-card rounded-2xl p-6 shadow-2xl">
            <h2 className="text-primary text-2xl font-bold mb-5 pb-3 border-b-2 border-primary">
                O que fazer agora:
            </h2>
            <div className="bg-black/30 rounded-xl p-5 min-h-[400px] flex items-center justify-center">
                {renderContent()}
            </div>
        </div>
    );
};
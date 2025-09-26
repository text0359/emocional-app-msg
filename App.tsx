
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { FlowSection } from './components/FlowSection';
import { Footer } from './components/Footer';
import { generateAIResponse } from './services/geminiService';
import type { AIResponse } from './types';

const App: React.FC = () => {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [userInput, setUserInput] = useState<string>('');
    const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!selectedEmotion) {
            alert('Por favor, selecione como ela está reagindo primeiro.');
            return;
        }
        if (!userInput.trim()) {
            alert('Por favor, insira a mensagem dela.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAiResponse(null);

        try {
            const response = await generateAIResponse(selectedEmotion, userInput);
            setAiResponse(response);
        } catch (err) {
            setError('Ocorreu um erro ao gerar a resposta. Tente novamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [selectedEmotion, userInput]);

    const handleClear = () => {
        setSelectedEmotion(null);
        setUserInput('');
        setAiResponse(null);
        setError(null);
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto p-5 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                    <InputSection
                        selectedEmotion={selectedEmotion}
                        setSelectedEmotion={setSelectedEmotion}
                        userInput={userInput}
                        setUserInput={setUserInput}
                        onAnalyze={handleAnalyze}
                        onClear={handleClear}
                        isLoading={isLoading}
                    />
                    <OutputSection
                        response={aiResponse}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
                <FlowSection />
            </main>
            <Footer />
        </div>
    );
};

export default App;

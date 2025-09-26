
import React from 'react';

const steps = [
    { number: 1, title: 'Quebra de Padrão', description: 'Surpreenda com algo inesperado para sair da mesmice' },
    { number: 2, title: 'Observação Personalizada', description: 'Mostre que você vê ela como única, não só mais uma' },
    { number: 3, title: 'Provocação Leve', description: 'Crie aquele friozinho na barriga com humor e desafio' },
    { number: 4, title: 'Virada Emocional', description: 'Alterna entre humor, curiosidade e profundidade' },
];

const FlowStep: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
    <div className="bg-primary/20 rounded-xl p-5 flex-1 min-w-[220px] text-center flex flex-col items-center">
        <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold text-lg">
            {number}
        </div>
        <h3 className="text-secondary mb-2 text-lg font-bold">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
    </div>
);

export const FlowSection: React.FC = () => (
    <section className="bg-brand-card rounded-2xl p-6 shadow-2xl">
        <h2 className="text-primary text-2xl font-bold mb-5 pb-3 border-b-2 border-primary">
            Fluxo da Química Emocional
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mt-5">
            {steps.map(step => (
                <FlowStep key={step.number} {...step} />
            ))}
        </div>
    </section>
);

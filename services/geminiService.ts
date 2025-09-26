import { GoogleGenAI, Type } from "@google/genai";
import type { AIResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        analysis: {
            type: Type.STRING,
            description: "Análise breve e perspicaz da dinâmica atual e do que a mensagem dela realmente significa."
        },
        nextAction: {
            type: Type.STRING,
            description: "O objetivo estratégico para a próxima mensagem do homem. Ex: 'Introduzir tensão sexual leve', 'Criar mistério', 'Virar o jogo com um desafio brincalhão'."
        },
        commonPitfall: {
            type: Type.STRING,
            description: "O erro mais comum que homens cometem nesta situação e que deve ser evitado. Por exemplo: 'Virar o amigo engraçadinho', 'Responder de forma lógica e matar o mistério'."
        },
        suggestedResponses: {
            type: Type.ARRAY,
            description: "Uma lista de 3 a 4 respostas de texto sugeridas que sejam espirituosas, confiantes e eficazes.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["analysis", "nextAction", "commonPitfall", "suggestedResponses"]
};

export const generateAIResponse = async (emotion: string, message: string): Promise<AIResponse> => {
    const prompt = `
        Você é um coach de relacionamentos especialista em criar conversas de texto espirituosas, confiantes e atraentes. Seu objetivo é ajudar um homem a responder a uma mulher de uma forma que gere química emocional e desejo, indo além da 'friend zone'.

        **Contexto:**
        - O estado emocional atual da mulher é: **${emotion}**.
        - A mensagem exata dela foi: **"${message}"**.

        **Sua Tarefa:**
        Baseado neste contexto, forneça o seguinte:
        1.  **Análise:** Uma análise breve e perspicaz da dinâmica atual.
        2.  **Próxima Ação:** O objetivo estratégico para a próxima mensagem.
        3.  **Armadilha Comum a Evitar:** O erro mais comum que homens cometem nesta situação específica (ex: para 'rindo', a armadilha é 'virar o amigo engraçadinho').
        4.  **Respostas Sugeridas:** 3 a 4 respostas de texto que executam a estratégia.

        **Princípios Orientadores (O Fluxo da Química Emocional):**
        1.  **Quebra de Padrão:** Evite respostas chatas e previsíveis. Surpreenda-a.
        2.  **Observação Personalizada:** Mostre que você a vê como única.
        3.  **Provocação Leve:** Crie tensão de forma divertida.
        4.  **Virada Emocional:** Alterne entre humor, curiosidade e profundidade.

        **Regras Importantes:**
        - As respostas devem ser concisas e naturais para mensagens de texto.
        - Use emojis de forma sutil e eficaz (ex: 😏, 😉, 🤔).
        - O tom deve ser confiante e charmoso, nunca arrogante, carente ou desrespeitoso.
        - Forneça a resposta estritamente no formato JSON solicitado.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
                topP: 0.95
            },
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        // Basic validation
        if (
            !parsedResponse.analysis ||
            !parsedResponse.nextAction ||
            !parsedResponse.commonPitfall ||
            !Array.isArray(parsedResponse.suggestedResponses)
        ) {
            throw new Error("Formato de resposta da IA inválido.");
        }

        return parsedResponse as AIResponse;
    } catch (error) {
        console.error("Erro ao chamar a API Gemini:", error);
        throw new Error("Falha ao gerar resposta da IA. Verifique o console para mais detalhes.");
    }
};
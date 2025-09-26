export interface AIResponse {
  analysis: string;
  nextAction: string;
  commonPitfall: string;
  suggestedResponses: string[];
}

export interface EmojiOptionType {
    key: string;
    emoji: string;
    label: string;
}
import { analyzeSentiment } from './sentimentService';

export const processArticlesForSentiment = (articles: any[]) => {
    return articles.map(article => {
        const text = article.description || article.content || '';
        const { sentiment, score } = analyzeSentiment(text);
        return { ...article, sentiment, score };
    });
};

import leoProfanity from 'leo-profanity';

const ruDictionary = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDictionary);

export const filterProfanity = (text) => leoProfanity.clean(text);

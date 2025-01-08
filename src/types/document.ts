export interface TranslationDocument {
  id: string;
  title: string;
  sourceLanguage: string;
  targetLanguage: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
  lastUpdated: string;
  translator: string;
}
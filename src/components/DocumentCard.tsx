import React from 'react';
import { Clock, Check, Loader2, Languages, User, Calendar } from 'lucide-react';
import { TranslationDocument } from '../types/document';

interface DocumentCardProps {
  document: TranslationDocument;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getStatusIcon = () => {
    switch (document.status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (document.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{document.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {document.status.replace('_', ' ')}
          </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Languages className="w-4 h-4 mr-2" />
              <span>{document.sourceLanguage} → {document.targetLanguage}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>{document.translator}</span>
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(document.lastUpdated).toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${document.progress}%`,
                    background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)'
                  }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {document.progress}% Complete
            </p>
          </div>
        </div>
      </div>
  );
}

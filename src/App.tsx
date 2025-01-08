import React from 'react';
import { Globe2 } from 'lucide-react';
import { useWebSocket } from './hooks/useWebSocket';
import { DocumentCard } from './components/DocumentCard';

export default function App() {
  const { documents } = useWebSocket('ws://localhost:8080/progress'); // Conectando ao WebSocket


  return (

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Globe2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">TranslateHub</h1>
                  <p className="text-sm text-gray-500">Professional Translation Services</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Active Projects</h2>
            <p className="text-gray-600 mt-1">Track your translation projects in real-time</p>
          </div>

          {/* Grid de Documentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
            ))}


            {/* Mensagem quando não houver documentos */}
            {documents.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No documents found</p>
                </div>
            )}
          </div>
        </main>
      </div>
  );
}

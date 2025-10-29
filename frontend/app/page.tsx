'use client';

import { useEffect, useState } from 'react';
import { AvailableModel, Prediction, listModels, listPredictions, predictSync } from '@/lib/api/rails-server';

export default function Home() {
  const [models, setModels] = useState<AvailableModel[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [inputText, setInputText] = useState('');
  const [rules, setRules] = useState('');
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [recentPredictions, setRecentPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const modelsData = await listModels();
        setModels(modelsData);
        if (modelsData.length > 0) {
          setSelectedModel(modelsData[0].id.toString());
        }

        const predictionsData = await listPredictions();
        setRecentPredictions(predictionsData);
      } catch (e: any) {
        setError(e.message);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictionResult(null);
    setError(null);

    try {
      const result = await predictSync({
        available_model_id: selectedModel,
        input_text: inputText,
        rules: rules,
      });
      setPredictionResult(result);

      // Refresh recent predictions
      const predictionsData = await listPredictions();
      setRecentPredictions(predictionsData);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 bg-white py-16 px-8 dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          ML Rule Check
        </h1>

        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Create a new Prediction</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Available Models</label>
              <select id="model" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                {models.map((model) => (
                  <option key={model.id} value={model.id}>{model.display_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Input Text</label>
              <textarea id="inputText" value={inputText} onChange={(e) => setInputText(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label htmlFor="rules" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rules</label>
              <textarea id="rules" value={rules} onChange={(e) => setRules(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white" />
            </div>
            <button type="submit" disabled={isLoading} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
              {isLoading ? 'Predicting...' : 'Predict'}
            </button>
          </form>
        </div>

        {predictionResult && (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Prediction Result</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <pre className="text-sm text-gray-800 dark:text-gray-200">{JSON.stringify(predictionResult, null, 2)}</pre>
            </div>
          </div>
        )}

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Recent Predictions</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentPredictions.map((prediction) => (
              <li key={prediction.id} className="py-4">
                <p><strong>Model:</strong> {prediction.model}</p>
                <p><strong>Status:</strong> {prediction.status}</p>
                <p><strong>Compliant:</strong> {prediction.is_compliant ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        </div>

      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { AvailableModel, Prediction, listModels, listPredictions, predictSync } from '@/lib/api/rails-server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Terminal } from 'lucide-react';

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
    <main className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          ML Rule Check
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A simple interface to test and verify machine learning model compliance with a given set of rules.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Create a new Prediction</CardTitle>
              <CardDescription>Select a model, provide input, and define rules to check against.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="model">Available Models</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id.toString()}>{model.display_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inputText">Input Text</Label>
                  <Textarea id="inputText" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter the text to be analyzed." rows={6} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rules">Rules</Label>
                  <Textarea id="rules" value={rules} onChange={(e) => setRules(e.target.value)} placeholder="Define the rules for the model to check, one per line." rows={6} />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Predicting...' : 'Predict'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {predictionResult && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{JSON.stringify(predictionResult, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Compliant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPredictions.length > 0 ? (
                    recentPredictions.map((prediction) => (
                      <TableRow key={prediction.id}>
                        <TableCell className="font-medium">{prediction.model}</TableCell>
                        <TableCell>
                          <Badge variant={prediction.status === 'completed' ? 'default' : 'secondary'}>{prediction.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant={prediction.is_compliant ? 'default' : 'destructive'}>
                            {prediction.is_compliant ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">No recent predictions.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
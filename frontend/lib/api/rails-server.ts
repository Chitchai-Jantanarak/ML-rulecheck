'use server';

import { cookies } from "next/headers";

export interface AvailableModel {
    id: number;
    name: string;
    display_name: string;
    description: string | null;
}

export interface Prediction {
  id: number;
  model: string;
  input_text: string;
  rules: string;
  status: string;
  result: any;
  is_compliant: boolean | null;
  confidence_score: number | null;
  error_message: string | null;
  created_at: string;
}

export interface CreatePredictionInput {
  available_model_id: string;
  input_text: string;
  rules: string;
}

export interface PredictSyncInput {
  available_model_id: string;
  input_text: string;
  rules: string;
}

const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost:8000';

async function railsFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const cookieStore = await cookies();

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieStore.toString(),
            ...options?.headers
        }
    })

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
}

export async function listModels() {
  return railsFetch<AvailableModel[]>('/api/available_models');
}

export async function listPredictions() {
  return railsFetch<Prediction[]>('/api/predictions');
}

export async function getPrediction(id: number) {
  return railsFetch<Prediction>(`/api/predictions/${id}`);
}

export async function createPrediction(data: CreatePredictionInput) {
  return railsFetch<Prediction>('/api/predictions', {
    method: 'POST',
    body: JSON.stringify({ prediction: data }),
  });
}

export async function predictSync(data: PredictSyncInput) {
  return railsFetch<Prediction>('/api/predictions/predict_sync', {
    method: 'POST',
    body: JSON.stringify({ prediction: data }),
  });
}

export async function safeApiCall<T>(
  apiCall: () => Promise<T>
): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await apiCall();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
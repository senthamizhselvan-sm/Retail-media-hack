import api from './api';

export interface GenerateImageParams {
  prompt: string;
  style?: string;
  size?: string;
  count?: number;
}

export interface EditImageParams {
  imageUrl?: string;
  imageBase64?: string;
  editType: string;
  prompt?: string;
  params: any;
}

export interface OrchestratorParams {
  userRequest: string;
  inputData?: any;
}

export const aiService = {
  generateImage: async (params: GenerateImageParams) => {
    const response = await api.post('/ai/generate', params);
    return response.data;
  },

  editImage: async (params: EditImageParams) => {
    const response = await api.post('/ai/edit', params);
    return response.data;
  },

  // Enhanced AI Orchestrator - processes natural language requests
  orchestrateAI: async (params: OrchestratorParams) => {
    const response = await api.post('/orchestrator/enhanced', params);
    return response.data;
  },

  // Basic AI Orchestrator
  processRequest: async (params: OrchestratorParams) => {
    const response = await api.post('/orchestrator/process', params);
    return response.data;
  },
};

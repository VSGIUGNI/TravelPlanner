import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiBase = 'https://mobile-api-one.vercel.app/api';

  // Função para listar todas as viagens
  async getTravels() {
    try {
      const response = await axios.get(`${this.apiBase}/travels`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter viagens da API:', error);
      throw error;
    }
  }

  // Função para obter uma viagem específica
  async getTravelById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiBase}/travels/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter os detalhes da viagem:', error);
      throw error;
    }
  }

  // Criar nova viagem
  async createTravel(travelData: any) {
    const response = await axios.post(`${this.apiBase}/travels`, travelData);
    return response.data;
  }

  // Atualizar uma viagem
  async updateTravel(id: string, travelData: any) {
     try {
    const response = await axios.put(`${this.apiBase}/travels/${id}`, travelData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar viagem:', error);
    throw error;
  }
}

  // Deletar uma viagem
  async deleteTravel(id: string) {
    await axios.delete(`${this.apiBase}/travels/${id}`);
  }

  // Método para obter os comentários de uma viagem
async getCommentsByTravelId(travelId: string): Promise<any[]> {
  try {
    const response = await axios.get(`${this.apiBase}/travels/${travelId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter comentários:', error);
    throw error;
  }
}

// Método para criar um novo comentário
async createComment(travelId: string, comment: string) {
  try {
    const response = await axios.post(`${this.apiBase}/travels/${travelId}/comments`, { comment });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    throw error;
  }
}

// Obter opiniões
async getOpinions(): Promise<any[]> {
  try {
    const response = await axios.get(`${this.apiBase}/opinions`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter opiniões:', error);
    throw error;
  }
}

// Criar uma nova opinião
async createOpinion(comment: string) {
  try {
    const response = await axios.post(`${this.apiBase}/opinions`, { comment });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar opinião:', error);
    throw error;
  }
}

// Atualizar opinião
async updateOpinion(id: string, comment: string) {
  try {
    const response = await axios.put(`${this.apiBase}/opinions/${id}`, { comment });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar opinião:', error);
    throw error;
  }
}

// Deletar opinião
async deleteOpinion(id: string) {
  try {
    await axios.delete(`${this.apiBase}/opinions/${id}`);
  } catch (error) {
    console.error('Erro ao excluir opinião:', error);
    throw error;
  }
}

}

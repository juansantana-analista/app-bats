// Arquivo da conexao API services/api.js
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.bats.com', // ou seu backend local
})

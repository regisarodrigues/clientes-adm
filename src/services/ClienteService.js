import api from '../lib/axios';

export default {
  obterClientes() {
    return api.get('/clientes');
  },

  adicionarCliente(data) {
    return api.post('/clientes', data);
  },

  obterCliente(id) {
    return api.get('/clientes/' + id);
  },

  editarCliente(id, data) {
    return api.patch('/clientes/' + id, data);
  },

  mudarStatus(id, status) {
    return api.patch('/clientes/' + id, status);
  },

  deletarCliente(id) {
    return api.delete('/clientes/' + id);
  }
};

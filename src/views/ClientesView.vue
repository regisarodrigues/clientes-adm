<script setup>
import ListarCliente from '@/components/ListarCliente.vue';
import HeadingPage from '@/components/UI/HeadingPage.vue';
import RouterLink from '@/components/UI/RouterLink.vue';
import { computed, onMounted, ref } from 'vue';
import ClienteService from '../services/ClienteService';

const clientes = ref([]);

defineProps({
  titulo: {
    type: String
  }
});

onMounted(() => {
  ClienteService.obterClientes()
    .then(({ data }) => (clientes.value = data))
    .catch((err) => console.log('Erro!' + err));
});

const existeClientes = computed(() => {
  return clientes.value.length > 0;
});

const atualizarStatus = ({ id, status }) => {
  ClienteService.mudarStatus(id, { status: !status })
    .then(() => {
      const i = clientes.value.findIndex((cliente) => cliente.id === id);
      clientes.value[i].status = !status;
    })
    .catch((err) => console.log(err));
};

const deletarCliente = (id) => {
  ClienteService.deletarCliente(id)
    .then(() => {
      clientes.value = clientes.value.filter((cliente) => cliente.id !== id);
    })
    .catch((err) => console.log(err));
};
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="novo-cliente">Novo Cliente</RouterLink>
    </div>
    <HeadingPage>{{ titulo }}</HeadingPage>

    <div v-if="existeClientes" class="flow-root mx-auto mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nome</th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">
                  Empresa
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">
                  Status
                </th>
                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <ListarCliente
                v-for="cliente in clientes"
                :key="cliente.id"
                :cliente="cliente"
                @atualizar-status="atualizarStatus"
                @deletar-cliente="deletarCliente"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p class="text-center mt-10" v-else>Não tem clientes</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  cliente: {
    type: Object,
    required: true
  }
});

defineEmits(['atualizar-status', 'deletar-cliente']);

const nomeCliente = computed(() => {
  return `${props.cliente.nome} ${props.cliente.sobrenome}`;
});

const statusCliente = computed(() => {
  return props.cliente.status;
});
</script>

<template>
  <tr>
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ nomeCliente }}</p>
      <p class="text-gray-500">{{ cliente.email }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ cliente.empresa }}</p>
      <p class="text-gray-600">{{ cliente.cargo }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
        class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
        :class="[statusCliente ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
        @click="$emit('atualizar-status', { id: cliente.id, status: cliente.status })"
      >
        {{ statusCliente ? 'Ativo' : 'Inativo' }}
      </button>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <RouterLink
        class="text-indigo-600 hover:text-indigo-900 mr-5"
        :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
        >Editar</RouterLink
      >
      <button class="text-red-600 hover:text-red-900" @click="$emit('deletar-cliente', cliente.id)">
        Excluir
      </button>
    </td>
  </tr>
</template>

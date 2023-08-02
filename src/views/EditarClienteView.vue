<script setup>
import HeadingPage from '@/components/UI/HeadingPage.vue';
import RouterLink from '@/components/UI/RouterLink.vue';
import { FormKit } from '@formkit/vue';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ClienteService from '../services/ClienteService';

defineProps({
  titulo: {
    type: String
  }
});

const route = useRoute();
const router = useRouter();

const { id } = route.params;

const formData = reactive({});
// const formData = reactive({
//   nome: '',
//   sobrenome: '',
//   email: '',
//   telefone: '',
//   empresa: '',
//   cargo: ''
// });

onMounted(() => {
  ClienteService.obterCliente(id)
    .then(({ data }) => {
      // formData.nome = data.nome;
      // formData.sobrenome = data.sobrenome;
      // formData.email = data.email;
      // formData.telefone = data.telefone;
      // formData.empresa = data.empresa;
      // formData.cargo = data.cargo;
      Object.assign(formData, data);
    })
    .catch((err) => console.log(err));
});

const handleSubmit = (data) => {
  ClienteService.editarCliente(id, data)
    .then(() => router.push({ name: 'home' }))
    .catch((err) => console.log(err));
};
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="home">Voltar</RouterLink>
    </div>
    <HeadingPage>{{ titulo }}</HeadingPage>

    <div class="mx-auto mt-5 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Salvar"
          incomplete-message="Não pode enviar! Revise as mensagens."
          @submit="handleSubmit"
          :value="formData"
        >
          <FormKit
            type="text"
            label="Nome:"
            name="nome"
            placeholder="Nome do Cliente"
            validation="required"
            :validation-messages="{ required: 'O nome do cliente é obrigatório.' }"
            v-model="formData.nome"
          />
          <FormKit
            type="text"
            label="Sobrenome:"
            name="sobrenome"
            placeholder="Sobrenome do Cliente"
            validation="required"
            :validation-messages="{ required: 'O sobrenome do cliente é obrigatório.' }"
            v-model="formData.sobrenome"
          />
          <FormKit
            type="email"
            label="E-mail:"
            name="email"
            placeholder="E-mail do Cliente"
            validation="required|email"
            :validation-messages="{
              required: 'O e-mail do cliente é obrigatório.',
              email: 'E-mail inválido.'
            }"
            v-model="formData.email"
          />
          <FormKit
            type="text"
            label="Telefone:"
            name="telefone"
            placeholder="Telefone xx-xxxxx-xxxx"
            validation="*matches:/^[0-9]{2}-[0-9]{5}-[0-9]{4}$/"
            :validation-messages="{ matches: 'O formato não é válido.' }"
            v-model="formData.telefone"
          />
          <FormKit
            type="text"
            label="Empresa:"
            name="empresa"
            placeholder="Empresa do Cliente"
            v-model="formData.empresa"
          />
          <FormKit
            type="text"
            label="Cargo:"
            name="cargo"
            placeholder="Cargo do Cliente"
            v-model="formData.cargo"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
}
</style>

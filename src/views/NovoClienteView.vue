<script setup>
import RouterLink from '@/components/UI/RouterLink.vue';
import HeadingPage from '@/components/UI/HeadingPage.vue';
import { FormKit } from '@formkit/vue';
import ClienteService from '../services/ClienteService';
import { useRouter } from 'vue-router';

defineProps({
  titulo: {
    type: String
  }
});

const router = useRouter();

const handleSubmit = (data) => {
  data.status = 1;
  ClienteService.adicionarCliente(data)
    .then((resp) => {
      console.log(resp);

      router.push('/');
    })
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
        >
          <FormKit
            type="text"
            label="Nome:"
            name="nome"
            placeholder="Nome do Cliente"
            validation="required"
            :validation-messages="{ required: 'O nome do cliente é obrigatório.' }"
          />
          <FormKit
            type="text"
            label="Sobrenome:"
            name="sobrenome"
            placeholder="Sobrenome do Cliente"
            validation="required"
            :validation-messages="{ required: 'O sobrenome do cliente é obrigatório.' }"
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
          />
          <FormKit
            type="text"
            label="Telefone:"
            name="telefone"
            placeholder="Telefone xx-xxxxx-xxxx"
            validation="*matches:/^[0-9]{2}-[0-9]{5}-[0-9]{4}$/"
            :validation-messages="{ matches: 'O formato não é válido.' }"
          />
          <FormKit type="text" label="Empresa:" name="empresa" placeholder="Empresa do Cliente" />
          <FormKit type="text" label="Cargo:" name="cargo" placeholder="Cargo do Cliente" />
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

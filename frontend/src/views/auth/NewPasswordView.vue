<script setup></script>

<template>
	<h1 class="text-6xl font-extrabold text-white text-center mt-10">
		Nuevo Password
	</h1>
	<p class="text-2xl text-white text-center my-5">Coloca tú nuevo Password</p>

	<FormKit
		id="newpasswordForm"
		type="form"
		:actions="false"
		incomplete-message="No se pudo enviar, revisa las notificaciones"
		@submit="handleSubmit"
	>
		<FormKit
			type="password"
			label="Password"
			name="password"
			placeholder="Password de Usuario - Min 8 caracteres"
			validation="required | length:8"
			:validation-messages="{
					required:'El Password es obligatorio',
					length: 'El Password debe contener al menos 8 caracteres'
				}"
		/>

		<FormKit type="submit">Guardar Password</FormKit>
	</FormKit>
</template>

<style scoped></style>

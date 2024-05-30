<script setup>
import Appointments from '../../components/Appointments.vue'
import { useUseStore } from '@/stores/user'

const user = useUseStore()
</script>

<template>
	<h2 class="text-4xl font-extrabold text-white mt-10">Mis Citas</h2>
	<p class="text-white text-lg mt-5">
		A continuación podrás administrar tus próximas citas
	</p>

	<p v-if="user.loading" class="text-white text-2xl text-center mt-5">
		Cargando...
	</p>

	<div v-else>
		<p
			v-if="user.noAppointments"
			class="text-white text-2xl text-center mt-5"
		>
			No tienes póximas citas
		</p>

		<div v-else class="grid grid-col-1 gap-5 mt-10">
			<Appointments
				v-for="appointment in user.userAppointments"
				:key="appointment._id"
				:appointment="appointment"
			/>
		</div>
	</div>
</template>

<style scoped></style>

<script setup>
import { useUseStore } from '../../stores/user.js';
import AdminAppointment from '@/components/AdminAppointment.vue'

const user = useUseStore()
console.log(user.userAppointments)
console.log(user.noAppointments)
// console.log(object)
</script>

<template>
	<p class="text-white text-lg mt-5 text-center">
		Acontinuación podrás administrar tus próximas citas
	</p>
	<p v-if="user.loading" class="text-2xl text-white mt-5 text-center">
		Cargando...
	</p>

	<div v-else class="grid grid-cols-1 gap-5 mt-10">
		<p
			v-if="user.noAppointments"
			class="text-2xl text-white mt-5 text-center"
		>
			<AdminAppointment
				v-for="appointment in user.userAppointments"
				:key="appointment._id"
				:appointment="appointment"
			/>
		</p>
	</div>
</template>

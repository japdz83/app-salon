<script setup>
import { ref } from 'vue';
import SelectedService from '@/components/SelectedService.vue'
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments'
import VueTailwindDetepicker from 'vue-tailwind-datepicker'

const appointments = useAppointmentsStore()

const formatter = ref({
        date: 'DD/MM/YYYY',
        month: 'MMM'
    })

const disableDate = (date) => {
	const today = new Date()
	return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes( date.getDay() )
}
</script>

<template>
	<h2 class="text-4xl font-extrabold text-white ">Detalles Cita y Resumen</h2>
	<p class="text-white text-lg ">
		A continuación verificala información yconfirma tu cita
	</p>
	<h3 class="text-3xl font-extrabold text-white">Servicios</h3>

	<p
		v-if="appointments.noServicesSelected"
		class="text-white text-2xl text-center border border-gray-600 rounded-lg p-5 "
	>
		No hay servicio seleccionado
	</p>

	<div v-else class="grid gap-5 ">
		<SelectedService
			v-for="service in appointments.services"
			:key="service._id"
			:service="service"
		/>
		<p class="text-white text-right text-2xl ">
			Total a pagar: {{ formatCurrency(appointments.totalAmount) }}
		</p>
	</div>

	<div class="space-y-8" v-if="!appointments.noServicesSelected">
		<h3 class="text-3xl text-extrabold text-white">Fecha y Hora</h3>

		<div class="lg:flex gap-5 items-start">
			<div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
				<VueTailwindDetepicker
					:disable-date="disableDate"
					i18n="es-mx"
					as-single
					no-input
					:formatter="formatter"
					v-model="appointments.date"
				/>
			</div>

			<div
				v-if="appointments.isDateSelected"
				class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
			>
				<button
					v-for="hour in appointments.hours"
					class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
					:class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
					@click="appointments.time = hour"
					:disabled="appointments.disableTime(hour) ? true : false"
				>
					{{ hour }}
				</button>
			</div>
		</div>

		<div class="flex justify-end">
			<button
				v-if="appointments.isValidReservation"
				class="w-full md:w-auto bg-blue-500 p-4 rounded-lg uppercase font-black text-white transition-colors hover:bg-blue-600"
				@click="appointments.saveAppointment"
			>
				Confirmar Reservación
			</button>
		</div>
	</div>
</template>

<style scoped></style>

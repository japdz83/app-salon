// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentsRoutes from './routes/appointmentsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar la app
const app = express()

// Leer datos via body
app.use(express.json())


// Conectar a BD
db()


// Configurar CORS
// const whitelist = [process.env.FRONTEND_URL]

// if (process.argv[2] === '--postman') {
//     whitelist.push(undefined)
// }

// const corsOptions = {

//     origin: function (origin, callback) {
//         if (whitelist.includes(origin)) {
//             // Permite la conexión
//             callback(null, true)
//         } else {
//             // No permitir la conexión
//             callback(new Error('Error de CORS'))
//         }
//     }
// }

// app.use(cors(corsOptions))


app.use(cors({
    credentials: true,
    origin: '*'
}))


// Definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/users', usersRoutes)



// Definir puerto
const PORT = process.env.PORT || 4000


// arrancar la app
app.listen(PORT, () => {
    console.log(colors.bgBlue('El servidor se está ejecutando en el:', colors.bold(PORT)))
})

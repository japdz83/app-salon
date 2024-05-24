import express from 'express'
import { createService, deleteService, getServices, getServiceById, updateService } from '../controllers/servicesController.js'

const router = express.Router()

router.route('/')
    .post(createService)
    .get(getServices)

router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService)

// router.post('/', createService)
// router.get('/', getServices)
// router.get('/:id', getServicesById)
// router.put('/:id', updateService)
// router.delete('/:id', deleteService)

export default router

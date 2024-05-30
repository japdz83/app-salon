import Appoinment from "../models/Appointment.js"

const getUsersAppointments = async (req, res) => {
    const { user } = req.params

    if (user !== req.user._id.toString()) {
        const error = new Error('Acceso Denegado')
        return res.status(400).json({
            msg: error.message
        })

    }

    try {
        const appointment = await Appoinment.find({
            user: user,
            date: {
                $gte: new Date()
            }
        }).populate('services').sort({ date: 'asc' })
        res.json(appointment)
    } catch (error) {
        console.log(error)
    }
}

export {
    getUsersAppointments
}
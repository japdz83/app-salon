import { createTransport } from "../config/nodemailer.js"

export async function sendEmailVerification({ name, email, token }) {
    const trasporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "f6977cd836b855",
        "b62773da20d98e"
    )

    const info = await trasporter.sendMail({
        from: 'AppSalon',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'AppSalon - Confirma tu cuenta',
        html: `
            <p>Hola ${name}, confirma tu cuenta en AppSalon</p>
            <p>Tu cuenta esta casi lista solo debes confirmala en el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}"> Confirma tu cuenta </a>
            <p>Si tu no creaste está cuenta ignora este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}
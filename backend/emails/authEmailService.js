import { createTransport } from "../config/nodemailer.js"

export async function sendEmailVerification({ name, email, token }) {
    const trasporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )

    const info = await trasporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com>',
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


export async function sendEmailPasswordReset({ name, email, token }) {
    const trasporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )

    const info = await trasporter.sendMail({
        from: 'AppSalon <cuentas@appsalon.com>',
        to: email,
        subject: 'AppSalon - Restablece tu password',
        text: 'AppSalon - Restablece tu password',
        html: `
            <p>Hola ${name}, has solicitado restablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password: </p>
            <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}"> Restablecer Contraseña </a>
            <p>Si tu no solicitaste esto, ignora este mensaje</p>
        `
    })

    console.log('Mensaje enviado', info.messageId)
}
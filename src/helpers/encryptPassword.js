import bcrypt from 'bcrypt';

export const encryptPassword = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordEncriptada = bcrypt.hashSync(password, salt);
        return passwordEncriptada;
    } catch (error) {
        console.log("Error en el encriptPassword", error.message);
    }
};
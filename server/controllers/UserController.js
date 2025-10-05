import validator from "validator";
import UserModel from "../models/UserModel.js";

export const registerUser = async (req, res) => {
    try {
        const errors = {}
        const {
            name,
            lastname,
            email,
            password,
            has_asthma,
            has_allergies,
            has_cardiovascular_conditions,
            is_pregnant,
            is_athlete,
            has_kids_at_home,
            has_seniors_at_home,
            spends_time_outdoors
        } = req.body;

        if (!email || !validator.isEmail(email)) {
            errors.email = "Error en el email"
        } else {
            const isDuplicate = await UserModel.findOne({where: {email: email}})

            if (isDuplicate) {
                errors.duplicadoEmail = "Email Duplicado"
            }
        }

        if (!password || !validator.isStrongPassword(password)) {
            errors.password = "Error en la contraseña"
        }


        if (!name || !validator.isAlpha(name, 'es-ES', {ignore: ' '}) || name.length < 3) {
            errors.nombre = "Error en el Nombre"
        }

        if (!lastname || !validator.isAlpha(lastname, 'es-ES', {ignore: ' '}) || lastname.length < 3) {
            errors.nombre = "Error en el Apellido"
        }


        if (Object.keys(errors) <= 0) {
            const userCreated = await UserModel.create({
                first_name: name,
                last_name: lastname,
                email: email,
                password: password,
                has_asthma: has_asthma,
                has_cardiovascular_conditions: has_cardiovascular_conditions,
                is_pregnant: is_pregnant,
                is_athlete: is_athlete,
                has_kids_at_home: has_kids_at_home,
                has_seniors_at_home: has_seniors_at_home,
                has_allergies: has_allergies,
                spends_time_outdoors: spends_time_outdoors,
            })

            return res.status(200).json({
                Usuario: userCreated,
                msg: "Se registro el usuario correctamente",
                success: true,
            })
        }

        return res.status(400).json({errors: errors, msg: "errors en la informacion ingresada", success: false})

    } catch (error) {
        res.status(500).json({success: false, msg: error, errors: []})
    }
};

export const logInUser = async (req, res) => {
    try {
        const errors = {}
        const {email, password} = req.body;

        const usuarioEncontrado = await UserModel.findOne({where: {email: email}})

        if (usuarioEncontrado) {
            if (usuarioEncontrado.password !== password) {
                errors.password = "Contraseña Incorrecta"
            }
        } else {
            errors.email = "No existe este Usuario"
        }

        if (Object.keys(errors) <= 0) {
            return res.status(200).json({
                Usuario: usuarioEncontrado,
                msg: "Se inicio sesión Correctamente",
                success: true,
            })
        }


        return res.status(400).json({errors: errors, msg: "Credenciales Invalidas", success: false})
        e
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: error, errors: []})
    }
};
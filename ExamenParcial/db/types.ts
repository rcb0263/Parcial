// types.ts
import mongoose from "npm:mongoose@7.6.3";


const Schema = mongoose.Schema;


const regionschema = new mongoose.Schema({
    official: String,
});

const CountrySchema = new mongoose.Schema({
    region: String,
    name: regionschema,
});
const CitySchema = new Schema({
    place_name: String,
    state: String
})
const Names = new Schema({
    name: String
})



const ContactoSchema = new Schema({
DNI: String,
Nombre_y_apellidos: String,
eMail: String,
Codigo_Postal: String,
Ciudad: String,
País: String,
Hora: String,
Temporal: String
})
const CityModel = mongoose.model("City", CitySchema);
const ContactoModel = mongoose.model("Contacto", ContactoSchema);
const CountryModel = mongoose.model("Loclalizacion", CountrySchema);

export {  ContactoModel, CityModel,  CountryModel};
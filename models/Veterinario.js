import mongoose from 'mongoose';
import bcrypt from 'bcrypt';  
import generarId from '../helpers/generarId.js';

const veterinarioSchema = mongoose.Schema({
  nombre:{
    type: String,
    required: true,
    trim:true//Elimina los espacios en blanco
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true,
  },
  telefono: {
    type : String,
    default: null,
    trim:true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generarId()
  },
  confirmado: {
    type: Boolean,
    default: false,
  },

});

//hasheamos la contraseña
veterinarioSchema.pre('save', async function(next){
  if(!this.isModified('password')){
     next();//Evitamos que lo que las siguientes linea de codigo se ejecuten
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//De esta forma creamos metodos que se ejecuten en este shema de veterinario
veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario,this.password)
}

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);//Registramos el Schema en la base de datos
export default Veterinario; 
import { Schema, models, model} from 'mongoose'

const machineSchema = new Schema({
    nombre: String,
    avatar: String,
    codBienes: String,
    marcamodelo: String,
    nSerie: String,
    status: String,
    costo: Number,
    custodio: String
})

const Machines = models.machine || model('machine', machineSchema)
export default Machines;
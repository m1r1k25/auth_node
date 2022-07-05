import { Schema, model } from "mongoose";

const User = new Schema({
  usename: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  roles: [{type: Strinng, ref: 'Role'}]

})

export default mongoose.model('User', User)
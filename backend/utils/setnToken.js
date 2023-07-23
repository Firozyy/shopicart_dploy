
import  jwt  from "jsonwebtoken";


export const token = (id) => {
  
  return  jwt.sign({ id }, process.env.JwtKey, {
        expiresIn: "30d"
    })
}


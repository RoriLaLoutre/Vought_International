import { HeroError } from "../errors/index.error.js";

export async function errorHandler(error , req , res , next){
    if (error instanceof HeroError.ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } 
    else {
        res.status(500).json({ error: error.message });
    }

}
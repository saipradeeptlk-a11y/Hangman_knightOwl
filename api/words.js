import { getSql } from "./_db.js";
export default async function handler(req,res){

    

    if(req.method !== "GET"){
         return res.status(400).json({error :"Invalid method!"})
    }

   const {category} = req.query;
   
   try{
    
   const sql = getSql(); 
   
   const data = await sql `SELECT word,hint FROM words WHERE category = ${category} `;
   return res.status(200).json(data);
   }catch(err){
    console.error(err)
    return res.status(500).json({error : "something went wrong"});
   }

}
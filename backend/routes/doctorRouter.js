const express = require("express");
const { DoctorModel } = require("../model/doctorModel");


const doctorRouter = express.Router();
doctorRouter.post("/appointments",async(req,res)=>{
const formData=req.body
  try{
const data= new DoctorModel(formData)
await data.save()
res.status(200).json({"message":" data added succesffuly"})
  }catch(error){
res.status(400).json({"message":'some dificulties on adding data'})
  }
})

doctorRouter.get("/appointments",async(req,res)=>{

try{
  const {  sort, filter } = req.query;
const data = DoctorModel.find(filter).sort(sort);
const datas = await data.exec();
return res.json({
datas
});
}catch(err){
res.status(400).json({"message":"somthing wronge"})
}
})

doctorRouter.delete('/appointments/:id', async (req, res) => {
  try {
    const userID  = req.params.id;

    const item = await DoctorModel.findByIdAndDelete(userID);

    return res.json({ message:"data removed successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

doctorRouter.patch("/appointments/:id", async (req, res) => {
  const data = req.body;
  const id=req.params.id
  
  try {

   await DoctorModel.findByIdAndUpdate({"_id":id},data)
    res.send(" data updated successfully");
  } catch (err) {
    console.log({ error: `${err}` });
  }
});



module.exports={
          doctorRouter
}




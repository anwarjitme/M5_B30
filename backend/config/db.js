const mongoose =require("mongoose")

const connection = mongoose.connect(
  "mongodb+srv://anwarjitme:anwarjitme@cluster0.wdgpysq.mongodb.net/doctorData?retryWrites=true&w=majority"
,{
          useNewUrlParser:true,
          useUnifiedTopology:true
});

module.exports={
          connection
}
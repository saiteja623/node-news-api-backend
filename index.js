const express=require('express');
const app= express();
const dotenv=require("dotenv");
const cors=require("cors");
const fetch=require("node-fetch");
// const bodyParser=require("body-parser");

app.use(cors({
    origin:"*",
    credentials:true
}))

dotenv.config({path:"config.env"});

app.use(express.json())

app.get("/",(req,res)=>res.send("changes have updated for the second time"))



const fetchNews=async (category,query) =>{
    var FECTH_URL;
    if (category == "random") {
         FECTH_URL =
          "https://newsapi.org/v2/everything?q=" +
          query +"&language=en&apiKey=" + process.env.WEATHER_SECRET_API_KEY;
      } else {
         FECTH_URL =
          "https://newsapi.org/v2/top-headlines?country=in&language=en&category=" +
          category +
          "&apiKey=" + process.env.WEATHER_SECRET_API_KEY;
      }
      var data={};
      try{
         var response=await fetch(FECTH_URL);
         data=await response.json();
    }
    catch(err){
        console.log("error occured",err);
    }
    return data;

}

app.post('/api', async (req,res )=>{
    const {category,query} = req.body;

    const data=await fetchNews(category,query);
    res.json({news:data});

})

const PORT= process.env.PORT || 5000
app.listen(PORT,()=>console.log("listening on port",PORT));
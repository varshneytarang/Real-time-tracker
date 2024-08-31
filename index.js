const express=require("express");
const app=express();
const {Server}=require("socket.io");
const http=require("http");
const server=http.createServer(app);
const io=new Server(server);
const path=require("path");

const PORT=1234;

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "public")));
app.set("views",path.resolve("./views"));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data})
    })
    console.log("connected");
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})

app.get("/",(req,res)=>{
    res.render("index");
})


server.listen(PORT,()=>console.log("server is started"));
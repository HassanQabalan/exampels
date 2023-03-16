module.exports=socket => {
    socket.on("joinChat", chatId=>{
        socket.join(chatId),
        console.log("joined", chatId)
    })
}
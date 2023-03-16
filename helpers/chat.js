const Message= require('../model/Message')

module.exports= (socket)=>{
    socket.on('message', data=>{
        console.log(data)
        var newMessage = new Message({
            chatId:data.chatId,
            sender:data.sender,
            message:data.message,
            sendAt:data.time
        }).save()
        io.to(data.chatId).emit('message', data)
      })
}
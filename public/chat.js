//this will be serving as a front end

var socket = io.connect("http://localhost:5000");
// with this connection  has been made between client and server

var message=document.getElementById('message');
 handle=document.getElementById('handle');
 btn=document.getElementById('send');
 output=document.getElementById('output');
 feedback=document.getElementById('feedback');


 btn.addEventListener('click',function(){
     //ths emit function will emit out the message down tos server
     socket.emit('chat',{
         handle:handle.value,
         message:message.value
     })
 })

 message.addEventListener('keypress',function(){
     socket.emit('typing',handle.value);
 })

//to listen for events

socket.on('chat',function(data){
    feedback.innerHTML="";
    output.innerHTML+='<p><strong>'+data.handle+':</strong>'+ data.message + '</p>'
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+ data+'is typing...</em></p>'
})
const Client=require('../models/Client');

const addClient=(req,res)=>{
    const client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id,
        phone: req.body.phone,
        ip: req.body.ip,
        })
        client.save()
        .then(client => {
            res.json({ client: client }) 
            console.log(client); 
        }).catch(err => {
            res.send(err);
        });
}

const removeClient=(req,res)=>{
    Client.findOneAndDelete({id:req.params.id})
    .then(()=>{
        res.status(200).json("client deleted");
    }). catch ((error) =>{
		res.status(500).json(error);
	})
}

const getAllClients=(req,res)=>{
    Client.find().then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(500).json({message:err})
    })
}
const addAllClient = (item) => {
    console.log("addAllClient");
    const client = new Client({
      firstName: item.firstName,
      lastName: item.lastName,
      id: item.id,
      phone: item.phone,
      ip: item.ip,
    });
    client
      .save()
      .then((client) => {
        console.log("נוסף בהצלחה!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

module.exports={addClient,getAllClients,removeClient,addAllClient}
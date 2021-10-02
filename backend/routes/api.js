const router=require('express').Router();
const client=require('../controllers/clientController')

router.post('/addClient',client.addClient)
router.get('/getAllClient',client.getAllClients);
router.delete('/deleteClient/:id',client.removeClient);

module.exports=router;
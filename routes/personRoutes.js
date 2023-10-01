import { Router } from "express";
import Person from "../models/Person.js"; 

const router = Router(); 

//API routes
//crete
router.post('/', async (req, res) => {
    //req 
    const { name, email, salary, approved } = req.body;

    if(!name) {
        res.status(422).json({ message: "Name is required" }); 
        return ;
    }

    const person = { name, email, salary, approved } ;

    try {
        await Person.create(person); 
        res.status(201).json({ message: "User created" })
    } catch(error) {
        res.status(500).json({ message: error}); 
    }
    
});

//read
router.get('/', async(req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people); 
    } catch (error) {
        res.status(500).json({ message: error }); 
    }
}); 

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findOne({_id: id});        
        if(!person) {
            res.status(422).json({ message: "User not foud" }); 
            return ;
        }
        res.status(200).json(person);  
    
    } catch (error) {
        res.status(500).json({ message: error }); 
    }
});


//update
router.patch('/:id', async(req, res) => {
    const id = req.params.id; 
    const { name, email, salary, approved } = req.body; 

    if(!id) {
        res.status(422).json({message: "ID is required"}); 
        return ;
    }

    if(!name && !email && !salary && !approved) {
        res.status(422).json({message: "Update failed"}); 
        return ;
    }

    const person = { name, email, salary, approved };

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person);

        if(updatedPerson.matchedCount == 0) {
            res.status(422).json({ message: "User not foud" }); 
            return;
        }

        res.status(200).json({message: "User updated successfully"}); 
    } catch (error) {
        res.status(500).json({ message: error }); 
    }
}); 


//delete
router.delete('/:id', async(req, res) => {
    const id = req.params.id; 

    if(String(id).length == 0 || !id) {
        res.status(422).json({ message: "User not found" }); 
        return ;
    }

    const person = await Person.findOne({_id: id}); 
    if(!person) {
        res.status(422).json({ message: "User not found" }); 
        return ;
    }

    try {   
        await Person.deleteOne({_id: id}); 
        res.status(200).json({ message: "User deleted successfully" }); 
    } catch (error) {
        res.status(500).json({ message: error }); 
    }
});


export default router;
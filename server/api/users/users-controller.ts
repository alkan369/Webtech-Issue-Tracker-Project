import { Router } from "express";
import { UserModel } from "../../database/models/user.model";
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserByFirstName, getUserByLastName, getUserByUsername, loginUser, updateUser } from "../../database/methods/user.methods";

const usersController = Router();

usersController.get('/', async (req, res) => {
    await getAllUsers(req, res);
});

usersController.get('/view_by_username/:username', async (req, res) => {

    await getUserByUsername(req, res);
});

usersController.get('/view_by_firstName/:firstName', async (req, res) =>{

    await getUserByFirstName(req, res);
});

usersController.get('/view_by_lastName/:lastName', async (req, res) =>{

    await getUserByLastName(req, res);
});

usersController.get('/view_by_email/:email', async (req, res) =>{

    await getUserByEmail(req, res);
});

usersController.post('/create', async (req, res) => {
    
    if(!req.body.firstName || req.body.firstName === "" ){
        return res.status(400).json({ message: 'First Name Not Entered' });
    }

    if(!req.body.lastName || req.body.lastName === ""){
        return res.status(400).json({ message: 'Last Name Not Entered' });
    }

    if(!req.body.username || req.body.username === ""){
        return res.status(400).json({ message: 'Username Not Entered' });
    }

    if(!req.body.email || req.body.email === ""){
        return res.status(400).json({ message: 'Email Not Entered' });
    }

    if(!req.body.password || req.body.password === ""){
        return res.status(400).json({ message: 'Password Not Entered' });
    }

    // this is handled in FE
    // if(req.body.password !== req.body.confirmPassword){
    //     // message 'return' is returned because the custom message is handled by the frontend
    //     return res.status(400).json({ message: 'return' });
    // }

    if(req.body.password.length < 8){
        return res.status(400).json({ message: 'Password Length Must Be Atleast 8 Characters' });
    }

    let regex: RegExp = new RegExp('^[A-Za-z0-9]{6,}$');    
    if(!regex.test(req.body.username)) {
        return res.status(400).json({ message: 'Username Must Be Atleast 6 Non Special Characters Long' });
    }

    regex = new RegExp('([a-z0-9]+\.)*[a-z0-9]+@([a-z0-9]+\.)+[a-z0-9]+');
    if(!regex.test(req.body.email)) {
        return res.status(400).json({ message: 'Invalid E-mail Format' });
    }
    
    const userWithSuchUsername = await UserModel.findOne({ username: req.body.username });
    if (userWithSuchUsername) {
        return res.status(400).json({ message: 'Username already taken.' });
    }
    
    const userWithSuchEmail = await UserModel.findOne({ email: req.body.email });
    if (userWithSuchEmail) {
        return res.status(400).json({ message: 'E-mail already registered.' });
    }

    await createUser(req, res);
});

usersController.post('/login', async (req, res) =>{
    const username = req.body.loginUsername;
    if(!username || username === ''){
        return res.status(400).json({ message: 'Username Not Entered' });
    }

    const password = req.body.loginPassword;
    if(!password || password === ''){
        return res.status(400).json({ message: 'Password Not Entered' });
    }

    await loginUser(req, res);
});

usersController.put('/edit/:username', async (req, res) => {
    
    const userToBeUpdated = await UserModel.findOne({ username: req.params.username });
    if (!userToBeUpdated) {
        return res.status(400).json({ message: 'No User With Such Username' });
    }
    
    if(req.body.email){
        const searchedEmail = await UserModel.findOne({ email: req.body.email });
        if(searchedEmail){
            return res.status(400).json({ message: 'User With Such Email Already Exists' });
        }

        let regex: RegExp = new RegExp('([a-z0-9]+\.)*[a-z0-9]+@([a-z0-9]+\.)+[a-z0-9]+');
        if (!regex.test(req.body.email)) {
            return res.status(400).json({ message: 'Invalid E-mail Format' });
        }

    }
    
    if(req.body.username){
        const searchedUsername = await UserModel.findOne({ username: req.body.username });
        if(searchedUsername){
            return res.status(400).json({ message: 'User With Such Username Already Exists' });
        }

        let regex: RegExp = new RegExp('^[A-Za-z0-9]{6,}$');  
        if(!regex.test(req.body.username)) {
            return res.status(400).json({ message: 'Username Must Be Atleast 6 Non Special Characters Long' });
        }

    }
    
    if(req.body.password && req.body.password.length < 8){
        return res.status(400).json({ message: 'Password Must Be Atleast 8 Characters Long' });
    }

    await updateUser(req, res);
});

usersController.delete('/delete/:username', async (req, res) => {

    await deleteUser(req, res);
});

export default usersController;
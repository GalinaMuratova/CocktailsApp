import express from "express";
import Cocktail from '../models/Cocktail';
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";


const cocktailsRouter =express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
    try {
        const cocktails = await Cocktail.find();
        return res.send(cocktails);
    } catch {
         return res.sendStatus(500);
    }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req,  res, next) => {
    const user = (req as RequestWithUser).user;
    console.log(user);
    try {
       const cocktail = new Cocktail({
           user: user._id,
           name:req.body.name,
           recipe: req.body.recipe,
           ingredients: req.body.ingredients,
           image: req.file ? req.file.filename : null,
       })
        await cocktail.save();
       res.send(cocktail);

   } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default cocktailsRouter;
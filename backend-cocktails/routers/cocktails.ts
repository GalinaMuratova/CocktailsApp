import express from "express";
import Cocktail from '../models/Cocktail';
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import permit from "../middleware/permit";


const cocktailsRouter =express.Router();

cocktailsRouter.get('/', auth, permit('admin'), async (req, res) => {
    try {
        const cocktails = await Cocktail.find();
        return res.send(cocktails);
    } catch {
         return res.sendStatus(500);
    }
});

cocktailsRouter.get('/published', async (req, res) => {
    try {
        const cocktails = await Cocktail.find({ published: true })
            .sort({ name: 1 });
        return res.send(cocktails);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});

cocktailsRouter.get('/user', auth, async (req, res) => {
    const user = (req as RequestWithUser).user;
    try {
        if (!user._id) {
            return res.status(400).send({error: 'Invalid user ID'});
        }

        const cocktails = await Cocktail.find({user: user._id});

        return res.send(cocktails);
    } catch (error) {
        console.error(error);
        return
    }
});

cocktailsRouter.get('/:id', async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        if (!cocktail) {
            return  res.sendStatus(404);
        }
        return res.send(cocktail);
    } catch {
        return res.sendStatus(500);
    }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req,  res) => {
    const user = (req as RequestWithUser).user;
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

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const publishedCocktail = await Cocktail.findById(req.params.id);

        if (!publishedCocktail) {
            return res.sendStatus(404);
        }

        publishedCocktail.published = !publishedCocktail.published;

        await publishedCocktail.save();

        return res.send({ published: publishedCocktail.published });
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Cocktail.findOne({ _id: req.params.id });

        if (!album) {
            return res.sendStatus(403);
        }
        await Cocktail.deleteOne({ _id: req.params.id });

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
});
export default cocktailsRouter;
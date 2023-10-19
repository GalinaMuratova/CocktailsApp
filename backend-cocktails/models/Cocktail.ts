import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'There is no such user',
        },
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    recipe: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    ingredients: [
        {
            ingredientName: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            }
        }
    ]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;
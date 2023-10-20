import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Cocktail from "./models/Cocktail";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('cocktails')
    } catch (e) {
        console.log('Collection were not present');
    }
    const [user1, user2] = await User.create(
        {
            email: 'anna@gmail.com',
            displayName: 'Anna Gavalda',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            avatar:'anna.jpeg'
        },
        {
            email: 'sam@gmail.com',
            displayName: 'Sam Smith',
            password: '456',
            token: crypto.randomUUID(),
            role: 'user',
            avatar:'sam.jpg'
        },
    );

    await Cocktail.create(
        {
            name: 'Bloody Mary',
            recipe: 'Combine vodka and tomato juice in a mixing glass. Add salt, black pepper, cayenne pepper, lemon juice, and Worcestershire sauce. Add ice and stir well. Strain the mixture into a highball glass over ice. Garnish with a celery stalk and lemon wedge.',
            ingredients: [
                {
                    ingredientName: "Vodka",
                    quantity: "2 ounces"
                },
                {
                    ingredientName: "Tomato juice",
                    quantity: "4 ounces"
                },
                {
                    ingredientName: "Salt",
                    quantity: "1 pinch"
                },
                {
                    ingredientName: "Black pepper",
                    quantity: "1 pinch"
                },
                {
                    ingredientName: "Cayenne pepper",
                    quantity: "1 pinch"
                },
                {
                    ingredientName: "Lemon juice",
                    quantity: "1 dash"
                },
                {
                    ingredientName: "Worcestershire sauce",
                    quantity: "1 dash"
                },
                {
                    ingredientName: "Celery stalk",
                    quantity: "1 piece"
                },
                {
                    ingredientName: "Lemon wedge",
                    quantity: "1 piece"
                }
            ],
            image: 'bloody-mary.jpg',
            user: user1._id,
            published: true
        },
        {
            name: 'Margarita',
            recipe: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
            ingredients: [
                {
                    ingredientName: "Tequila",
                    quantity: "1 1/2 ounces"
                },
                {
                    ingredientName: "Cointreau",
                    quantity: "1/2 ounce"
                },
                {
                    ingredientName: "Lime juice",
                    quantity: "1 ounce"
                },
                {
                    ingredientName: "Salt",
                    quantity: "1 tablespoon"
                }
            ],
            image: 'Margarita.jpg',
            user: user1._id,
            published: false
        },
        {
            name: 'Daiquiri',
            recipe: 'Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.',
            ingredients: [
                {
                    ingredientName: 'White rum',
                    quantity: '1 1/2 ounces'
                },
                {
                    ingredientName: 'Lime juice',
                    quantity: '1/2 ounce'
                },
                {
                    ingredientName: 'Simple syrup',
                    quantity: '1 teaspoon'
                }
            ],
            image: 'Daiquiri.jpg',
            user: user1._id,
            published: true
        },
        {
            name: 'Martini',
            recipe: 'Stir the gin and vermouth in a mixing glass with ice. Strain into a chilled cocktail glass. Garnish with an olive or a twist of lemon.',
            ingredients: [
                {
                    ingredientName: 'Gin',
                    quantity: '1 1/2 ounces'
                },
                {
                    ingredientName: 'Dry vermouth',
                    quantity: '1/2 ounce'
                }
            ],
            image: 'martini.jpg',
            user: user2._id,
            published: false
        },
        {
            name: 'Mojito',
            recipe: 'Muddle the mint leaves with simple syrup and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish with sprig of mint leaves and lemon slice.',
            ingredients: [
                {
                    ingredientName: "White rum",
                    quantity: "2 ounces"
                },
                {
                    ingredientName: "Lime juice",
                    quantity: "1 ounce"
                },
                {
                    ingredientName: "Simple syrup",
                    quantity: "2 teaspoons"
                },
                {
                    ingredientName: "Mint leaves",
                    quantity: "4 sprigs"
                },
                {
                    ingredientName: "Soda water",
                    quantity: "1/2 cup"
                }
            ],
            image: 'mojito.webp',
            user: user2._id,
            published: true,
        }
    );

    await db.close();
};
run().catch(console.error);
import * as functions from "firebase-functions";
import * as https from "https";
import { FieldValue, Firestore } from "@google-cloud/firestore";
import { InvitePartyRequestData } from "./interfaces";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const PROJECTID = "dinnercookingplanner";

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
  // NOTE: Don't hardcode your project credentials here.
  // If you have to, export the following to your shell:
  //   GOOGLE_APPLICATION_CREDENTIALS=<path>
  // keyFilename: '/cred/cloud-functions-firestore-000000000000.json',
});

function fetchRandomRecipes(count: number) {
  // https.get("https://api.ipify.org?format=json", (res) => {
  //   let body = '';
  //   res.on('data', (d) => body += d)
  //   res.on('end', () => {
  //     let responseData = JSON.parse(body);
  //     response.json(responseData);
  //   })
  // })

  // TODO: use spoonacular API
  const recipes = [];
  for (let index = 0; index < count; index++) {
    recipes.push({
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: true,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      lowFodmap: true,
      weightWatcherSmartPoints: 1,
      gaps: "GAPS_5",
      preparationMinutes: -1,
      cookingMinutes: -1,
      aggregateLikes: 10,
      healthScore: 20,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 70.93,
      extendedIngredients: [
        {
          id: 11529,
          aisle: "Produce",
          image: "tomato.png",
          consistency: "SOLID",
          name: "tomatoes",
          nameClean: "tomato",
          original: "4 round tomatoes (we grow & use grappolo for this dish)",
          originalName: "round tomatoes (we grow & use grappolo for this dish)",
          amount: 4.0,
          unit: "",
          meta: ["for this dish)"],
          measures: {
            us: { amount: 4.0, unitShort: "", unitLong: "" },
            metric: { amount: 4.0, unitShort: "", unitLong: "" },
          },
        },
        {
          id: 1002044,
          aisle: "Produce;Spices and Seasonings",
          image: "mixed-fresh-herbs.jpg",
          consistency: "SOLID",
          name: "herbs",
          nameClean: "lemon basil",
          original:
            "small handful of any fresh herbs you like, chopped - we use oregano but you can also use basil, thyme, etc.",
          originalName:
            "any fresh herbs you like, chopped - we use oregano but you can also use basil, thyme, etc",
          amount: 1.0,
          unit: "small handful",
          meta: ["fresh", "chopped", "canned"],
          measures: {
            us: {
              amount: 1.0,
              unitShort: "small handful",
              unitLong: "small handful",
            },
            metric: {
              amount: 1.0,
              unitShort: "small handful",
              unitLong: "small handful",
            },
          },
        },
        {
          id: 1102047,
          aisle: "Spices and Seasonings",
          image: "salt-and-pepper.jpg",
          consistency: "SOLID",
          name: "Salt & Pepper",
          nameClean: "salt and pepper",
          original: "salt & pepper",
          originalName: "salt & pepper",
          amount: 1.0,
          unit: "serving",
          meta: [],
          measures: {
            us: { amount: 1.0, unitShort: "serving", unitLong: "serving" },
            metric: { amount: 1.0, unitShort: "serving", unitLong: "serving" },
          },
        },
        {
          id: 1034053,
          aisle: "Oil, Vinegar, Salad Dressing",
          image: "olive-oil.jpg",
          consistency: "LIQUID",
          name: "extra virgin olive oil",
          nameClean: "extra virgin olive oil",
          original: "good quality extra virgin olive oil",
          originalName: "good quality extra virgin olive oil",
          amount: 1.0,
          unit: "serving",
          meta: [],
          measures: {
            us: { amount: 1.0, unitShort: "serving", unitLong: "serving" },
            metric: { amount: 1.0, unitShort: "serving", unitLong: "serving" },
          },
        },
        {
          id: 15001,
          aisle: "Seafood",
          image: "anchovies.jpg",
          consistency: "SOLID",
          name: "anchovy filets",
          nameClean: "boquerones",
          original:
            "8 high quality anchovy filets, (we use anchovies from Sardegna packed in salt)",
          originalName:
            "high quality anchovy filets, (we use anchovies from Sardegna packed in salt)",
          amount: 8.0,
          unit: "",
          meta: ["packed in salt)"],
          measures: {
            us: { amount: 8.0, unitShort: "", unitLong: "" },
            metric: { amount: 8.0, unitShort: "", unitLong: "" },
          },
        },
      ],
      id: 631757,
      title: "Savory Slow Roasted Tomatoes with Filet of Anchovy",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
        "https://www.foodista.com/recipe/C5N57BZC/savory-slow-roasted-tomatoes-with-filet-of-anchovy",
      image: "https://spoonacular.com/recipeImages/631757-556x370.jpg",
      imageType: "jpg",
      summary:
        'If you have roughly <b>about 45 minutes</b> to spend in the kitchen, Savory Slow Roasted Tomatoes with Filet of Anchovy might be a tremendous <b>gluten free, dairy free, paleolithic, and primal</b> recipe to try. For <b>71 cents per serving</b>, you get a side dish that serves 4. One portion of this dish contains about <b>3g of protein</b>, <b>4g of fat</b>, and a total of <b>64 calories</b>. 10 people found this recipe to be delicious and satisfying. A mixture of round tomatoes, any herbs you like, extra virgin olive oil, and a handful of other ingredients are all it takes to make this recipe so yummy. It is brought to you by Foodista. With a spoonacular <b>score of 73%</b>, this dish is solid. Similar recipes include <a href="https://spoonacular.com/recipes/savory-slow-roasted-tomatoes-with-filet-of-anchovy-17">Savory Slow Roasted Tomatoes with Filet of Anchovy</a>, <a href="https://spoonacular.com/recipes/slow-roasted-filet-of-beef-and-basil-parmesan-mayonnaise-362274">Slow-Roasted Filet of Beef and Basil Parmesan Mayonnaise</a>, and <a href="https://spoonacular.com/recipes/slow-roasted-pork-shoulder-with-savory-apple-gravy-247332">Slow Roasted Pork Shoulder with Savory Apple Gravy</a>.',
      cuisines: [],
      dishTypes: ["side dish"],
      diets: [
        "gluten free",
        "dairy free",
        "paleolithic",
        "primal",
        "fodmap friendly",
        "whole 30",
        "pescatarian",
      ],
      occasions: [],
      instructions:
        "Preheat oven to 150 C or 280 F\nCut the top 3rd off the tomatoes & discard top.\nPlace tomatoes on a baking tray, lined with parchment paper. Sprinkle generously with salt, pepper & herbs. Drizzle with a generous amount of olive oil.  Place in the oven for 4-6 hours depending on the size of your tomatoes. Every once in a while as you pass the kitchen, baste the tomatoes in the juices & olive oil in the pan.\nOnce the tomatoes shrivel up a bit & start to look sun-dried, they are ready. They should still hold their shape & not become mush.\nRemove from oven, top each tomato with a whole anchovy filet. Serve warm or room temperature with olive oil from the baking pan drizzled over the top.",
      analyzedInstructions: [
        {
          name: "",
          steps: [
            {
              number: 1,
              step: "Preheat oven to 150 C or 280 F",
              ingredients: [],
              equipment: [
                {
                  id: 404784,
                  name: "oven",
                  localizedName: "oven",
                  image: "oven.jpg",
                  temperature: { number: 150.0, unit: "Celsius" },
                },
              ],
            },
            {
              number: 2,
              step: "Cut the top 3rd off the tomatoes & discard top.",
              ingredients: [
                {
                  id: 11529,
                  name: "tomato",
                  localizedName: "tomato",
                  image: "tomato.png",
                },
              ],
              equipment: [],
            },
            {
              number: 3,
              step: "Place tomatoes on a baking tray, lined with parchment paper.",
              ingredients: [
                {
                  id: 11529,
                  name: "tomato",
                  localizedName: "tomato",
                  image: "tomato.png",
                },
              ],
              equipment: [
                {
                  id: 404770,
                  name: "baking paper",
                  localizedName: "baking paper",
                  image: "baking-paper.jpg",
                },
                {
                  id: 404646,
                  name: "baking pan",
                  localizedName: "baking pan",
                  image: "roasting-pan.jpg",
                },
              ],
            },
            {
              number: 4,
              step: "Sprinkle generously with salt, pepper & herbs.",
              ingredients: [
                {
                  id: 1002030,
                  name: "pepper",
                  localizedName: "pepper",
                  image: "pepper.jpg",
                },
                {
                  id: 1002044,
                  name: "herbs",
                  localizedName: "herbs",
                  image: "mixed-fresh-herbs.jpg",
                },
                {
                  id: 2047,
                  name: "salt",
                  localizedName: "salt",
                  image: "salt.jpg",
                },
              ],
              equipment: [],
            },
            {
              number: 5,
              step: "Drizzle with a generous amount of olive oil.",
              ingredients: [
                {
                  id: 4053,
                  name: "olive oil",
                  localizedName: "olive oil",
                  image: "olive-oil.jpg",
                },
              ],
              equipment: [],
            },
            {
              number: 6,
              step: "Place in the oven for 4-6 hours depending on the size of your tomatoes. Every once in a while as you pass the kitchen, baste the tomatoes in the juices & olive oil in the pan.",
              ingredients: [
                {
                  id: 4053,
                  name: "olive oil",
                  localizedName: "olive oil",
                  image: "olive-oil.jpg",
                },
                {
                  id: 11529,
                  name: "tomato",
                  localizedName: "tomato",
                  image: "tomato.png",
                },
              ],
              equipment: [
                {
                  id: 404784,
                  name: "oven",
                  localizedName: "oven",
                  image: "oven.jpg",
                },
                {
                  id: 404645,
                  name: "frying pan",
                  localizedName: "frying pan",
                  image: "pan.png",
                },
              ],
              length: { number: 360, unit: "minutes" },
            },
            {
              number: 7,
              step: "Once the tomatoes shrivel up a bit & start to look sun-dried, they are ready. They should still hold their shape & not become mush.",
              ingredients: [
                {
                  id: 11529,
                  name: "tomato",
                  localizedName: "tomato",
                  image: "tomato.png",
                },
              ],
              equipment: [],
            },
            {
              number: 8,
              step: "Remove from oven, top each tomato with a whole anchovy filet.",
              ingredients: [
                {
                  id: 15001,
                  name: "anchovies",
                  localizedName: "anchovies",
                  image: "anchovies.jpg",
                },
                {
                  id: 11529,
                  name: "tomato",
                  localizedName: "tomato",
                  image: "tomato.png",
                },
              ],
              equipment: [
                {
                  id: 404784,
                  name: "oven",
                  localizedName: "oven",
                  image: "oven.jpg",
                },
              ],
            },
            {
              number: 9,
              step: "Serve warm or room temperature with olive oil from the baking pan drizzled over the top.",
              ingredients: [
                {
                  id: 4053,
                  name: "olive oil",
                  localizedName: "olive oil",
                  image: "olive-oil.jpg",
                },
              ],
              equipment: [
                {
                  id: 404646,
                  name: "baking pan",
                  localizedName: "baking pan",
                  image: "roasting-pan.jpg",
                },
              ],
            },
          ],
        },
      ],
      originalId: null,
      spoonacularSourceUrl:
        "https://spoonacular.com/savory-slow-roasted-tomatoes-with-filet-of-anchovy-631757",
    });
  }
  return recipes;
}

// TODO: only allow as admin
export const fetchRecipes = functions.https.onRequest((request, response) => {
  const recipes = fetchRandomRecipes(10);
  firestore.collection("partys").doc("uLiPkMnK1NJnN9e2MjIr").update({
    recipes,
    state: "VOTING",
  });
  response.send("success");
});

export const inviteToParty = functions.https.onRequest((request, response) => {
  // extract params
  const method = request.method.toUpperCase();
  const contentType = request.get("content-type");

  // Validate the request
  if (method !== "POST") {
    response.sendStatus(405);
    return;
  }
  if (contentType !== "application/json") {
    response.sendStatus(415);
    return;
  }

  // extract data
  const data = request.body as InvitePartyRequestData;
  const partyID = data.partyID;
  const newMembers = data.newMembers;

  // validate invite party request data
  if (!partyID || !newMembers) {
    response.sendStatus(400);
    return;
  }

  // create member entries
  const members = [];
  for (const newMember of newMembers) {
    members.push({
      userID: newMember,
      role: "USER",
      vote: null,
      state: "INVITED",
    });
  }

  // add member to party
  firestore
    .collection("partys")
    .doc(partyID)
    .set(
      {
        members: FieldValue.arrayUnion(...members),
      },
      { merge: true }
    );

  // TODO: trigger push notification on device of invited user!

  response.send("successfully invited!");
});

// handle this in the app code later!!!
export const createDinner = functions.https.onRequest((request, response) => {
  firestore
    .collection("partys")
    .add({
      partyName: "Jonas Party",
      state: "INVITING",
      recipes: [],
      members: [
        { userID: 1, role: "OWNER", vote: null, state: "ACCEPTED" },
        { userID: 2, role: "ADMIN", vote: null, state: "INVITED" },
        { userID: 3, role: "USER", vote: null, state: "ACCEPTED" },
      ],
    })
    .then((doc) => {
      console.log(`stored new doc with id: ${doc.id}`);
    })
    .catch((error) => {
      console.log(error);
    });
  response.send("success");
});

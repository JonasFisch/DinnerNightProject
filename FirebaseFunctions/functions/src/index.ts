import * as functions from "firebase-functions";
import * as https from "https";
import * as admin from "firebase-admin";

/* eslint-disable */

admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// const PROJECTID = "dinnercookingplanner";

// const firestore = new Firestore({
//   projectId: PROJECTID,
//   timestampsInSnapshots: true,
//   // NOTE: Don't hardcode your project credentials here.
//   // If you have to, export the following to your shell:
//   //   GOOGLE_APPLICATION_CREDENTIALS=<path>
//   // keyFilename: '/cred/cloud-functions-firestore-000000000000.json',
// });

const spoonacularAPI = {
    key: '4caed3953aab44a3a3324c769e47c9ff',
    baseURL: 'https://api.spoonacular.com',
};

export const fetchRandomRecipes = async (
    count: number,
    diets: string[],
    allergies: string[],
    excludeIngredients: string[]
): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const transformedExcludeIngredients = excludeIngredients
            ? excludeIngredients.join(',')
            : '';
        const transformedDients = diets ? diets.join(',') : '';
        const transformedAllergies = allergies ? allergies.join(',') : '';

        https.get(
            `${spoonacularAPI.baseURL}/recipes/complexSearch?` +
                `apiKey=${spoonacularAPI.key}&number=${count}&diet=${transformedDients}&excludeIngredients=${transformedExcludeIngredients}&intolerances${transformedAllergies}&addRecipeInformation=true&fillIngredients=true&sort=random`,
            (res) => {
                let body = '';
                res.on('data', (d) => (body += d));
                res.on('end', () => {
                    const result = JSON.parse(body);
                    resolve(result.results);
                });
                res.on('error', (error) => {
                    reject(error);
                });
            }
        );
    });
};
exports.fetchRecipes = functions.https.onRequest(async (request, response) => {
    const body = request.body;

    const diets: string[] = body.diets ?? [];
    const allergies: string[] = body.allergies ?? [];
    const excludeIngredients: string[] = body.excludedIngredients ?? [];

    let recipes = [];
    try {
        recipes = await fetchRandomRecipes(
            5,
            diets,
            allergies,
            excludeIngredients
        );
    } catch (error) {
        console.log(error);
        response.status(500).send({ error });
        return;
    }

    const recipeData = [];
    for (const recipe of recipes) {
        recipeData.push(
            await admin
                .firestore()
                .collection('Recipes')
                .add({
                    ...recipe,
                })
        );
    }

    response.send({
        recipes: recipeData.map((recipe) => recipe.id),
    });
});

// export const inviteToParty =
// functions.https.onRequest((request, response) => {
//   // extract params
//   const method = request.method.toUpperCase();
//   const contentType = request.get("content-type");

//   // Validate the request
//   if (method !== "POST") {
//     response.sendStatus(405);
//     return;
//   }
//   if (contentType !== "application/json") {
//     response.sendStatus(415);
//     return;
//   }

//   // extract data
//   const data = request.body as InvitePartyRequestData;
//   const partyID = data.partyID;
//   const newMembers = data.newMembers;

//   // validate invite party request data
//   if (!partyID || !newMembers) {
//     response.sendStatus(400);
//     return;
//   }

//   // create member entries
//   const members = [];
//   for (const newMember of newMembers) {
//     members.push({
//       userID: newMember,
//       role: "USER",
//       vote: null,
//       state: "INVITED",
//     });
//   }

//   // add member to party
//   firestore
//     .collection("partys")
//     .doc(partyID)
//     .set(
//       {
//         members: FieldValue.arrayUnion(...members),
//       },
//       { merge: true }
//     );

//   // TODO: trigger push notification on device of invited user!

//   response.send("successfully invited!");
// });

// handle this in the app code later!!!
// export const createDinner =
// functions.https.onRequest((request, response) => {
//   firestore
//     .collection("partys")
//     .add({
//       partyName: "Jonas Party",
//       state: "INVITING",
//       recipes: [],
//       members: [
//         { userID: 1, role: "OWNER", vote: null, state: "ACCEPTED" },
//         { userID: 2, role: "ADMIN", vote: null, state: "INVITED" },
//         { userID: 3, role: "USER", vote: null, state: "ACCEPTED" },
//       ],
//     })
//     .then((doc) => {
//       console.log(`stored new doc with id: ${doc.id}`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   response.send("success");
// });

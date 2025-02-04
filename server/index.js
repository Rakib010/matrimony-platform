require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// payment method
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.bmcuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://biya-sadi.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// verify jwt middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("Token received:", token);

  if (!token) return res.status(401).send({ message: "Unauthorized access" });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(402).send({ message: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // await client.connect();

    // write code here
    const database = client.db("Matrimony-Collection");
    const biodatasCollection = database.collection("biodatas");
    const userCollection = database.collection("users");
    const favoritesCollection = database.collection("favorites");
    const paymentCollection = database.collection("payments");
    const successStoryCollection = database.collection("successStory");

    // JWT Generate
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // clear token with logout
    app.get("/logoutJwt", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });

    /*  // use verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    }; */

    // payment method (stripe)
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      //Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    // save payment request
    app.post("/payments", async (req, res) => {
      const paymentData = req.body;
      const result = await paymentCollection.insertOne(paymentData);
      res.send({ paymentResult: result });
    });

    /*  // get biodatas
    app.get("/biodatas", async (req, res) => {
      const result = await biodatasCollection.find().toArray();
      res.send(result);
    }); */

    // get biodatas with pagination
    app.get("/biodatas", async (req, res) => {
      const { page = 1, limit = 6 } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const skip = (pageNum - 1) * limitNum;

      const biodatas = await biodatasCollection
        .find({})
        .skip(skip)
        .limit(limitNum)
        .toArray();
      const totalItems = await biodatasCollection.countDocuments();

      res.send({
        data: biodatas,
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
        currentPage: pageNum,
      });
    });

    // biodata details specif user
    app.get("/biodata/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const query = { _id: new ObjectId(id) };
      const result = await biodatasCollection.findOne(query);
      res.send(result);
    });

    // biodata details page show similer biodata
    app.get("/biodata-similar", async (req, res) => {
      const { gender } = req.query;

      const similarData = await biodatasCollection
        .find({ biodataType: gender })
        .limit(3)
        .toArray();
      res.send(similarData);
    });

    // biodata filter
    app.get("/biodatas", async (req, res) => {
      const { minAge, maxAge, type, division } = req.query;

      // Build the query object dynamically
      let query = {};

      if (minAge && maxAge) {
        query.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge) };
      }

      if (type) {
        query.biodataType = type;
      }

      if (division) {
        query.presentDivision = division;
      }

      try {
        const result = await biodatasCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching biodatas:", error);
        res.status(500).send({ error: "Failed to fetch biodatas" });
      }
    });

    //  Add to Favourites
    app.post("/biodata-favorites", verifyToken, async (req, res) => {
      const { biodataId } = req.body;
      const userEmail = req.user?.email;

      if (!biodataId || !userEmail) {
        return res
          .status(400)
          .send({ message: "Biodata ID and User Email are required." });
      }

      // if user already add to favorites
      const favoriteExists = await favoritesCollection.findOne({
        biodataId,
        userEmail,
      });

      if (favoriteExists) {
        return res.status(400).send({ message: "Already in favorites." });
      }

      const result = await favoritesCollection.insertOne({
        biodataId,
        userEmail,
        addedAt: new Date(),
      });

      res.send(result);
    });

    // premium contact information
    app.get("/contact-biodatasData/:id", verifyToken, async (req, res) => {
      try {
        const biodata = await biodatasCollection.findOne({
          biodataId: req.params.id,
        });
        if (!biodata) return res.status(404).send("Biodata not found");

        const isPremiumUser = req.user.premiumRequested === "approved";
        if (isPremiumUser) {
          return res.status(200).json(biodata);
        }

        biodata.mobile = null;
        biodata.email = null;

        res.status(200).json(biodata);
      } catch (err) {
        res.status(500).send("Server Error");
      }
    });

    // Premium Card show
    app.get("/premium-card", async (req, res) => {
      const sort = req.query.sort === "descending" ? -1 : 1;
      const premiumMembers = await biodatasCollection
        .find({ premiumRequested: "approved" })
        .sort({ age: sort })
        .limit(6)
        .toArray();

      res.send(premiumMembers);
    });

    // success counter section (Home)
    app.get("/success-counter", async (req, res) => {
      const totalBiodata = await biodatasCollection.countDocuments();
      const maleBiodata = await biodatasCollection.countDocuments({
        biodataType: "Male",
      });
      const femaleBiodata = await biodatasCollection.countDocuments({
        biodataType: "Female",
      });

      const marriageComplete = await successStoryCollection.countDocuments({
        marriageDate: { $exists: true, $ne: null },
      });

      res.send({
        totalBiodata,
        maleBiodata,
        femaleBiodata,
        marriageComplete,
      });
    });

    /* ------------- user dashboard ---------- */

    // submit form
    app.post("/add-biodata", verifyToken, async (req, res) => {
      const formData = req.body;
      const lastBiodata = await biodatasCollection
        .find()
        .sort({ biodataId: -1 })
        .limit(1)
        .toArray();
      // Generate the new biodataId
      const newBiodataId =
        lastBiodata.length > 0 ? lastBiodata[0].biodataId + 1 : 1;
      formData.biodataId = newBiodataId;

      const result = await biodatasCollection.insertOne(formData);

      res.send(result);
    });

    // view bio data
    app.get("/boidata/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await biodatasCollection.findOne(query);
      res.send(result);
    });

    // Request to make biodata premium (view data)
    app.post("/request-premium", async (req, res) => {
      const { email } = req.body;

      // Check if the biodata exists
      const biodata = await biodatasCollection.findOne({ email });
      if (!biodata) {
        return res.status(404).send({ message: "Biodata not found!" });
      }
      // Check if the user has already requested for premium
      if (biodata.premiumRequested) {
        return res
          .status(400)
          .send({ message: "Premium request already sent!" });
      }
      const result = await biodatasCollection.updateOne(
        { email },
        { $set: { premiumRequested: "pending" } }
      );
      res.send(result);
    });

    // user data insert db
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      // insert email if user doesn't exists
      const query = { email: user?.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists" });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // user data get
    app.get("/users", verifyToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // favorite biodata get
    app.get("/favorites/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await favoritesCollection
        .aggregate([
          {
            $match: {
              userEmail: email,
            },
          },
          {
            $lookup: {
              from: "biodatas",
              localField: "biodataId",
              foreignField: "biodataId",
              as: "biodataDetails",
            },
          },
          {
            $unwind: "$biodataDetails",
          },
          {
            $project: {
              biodataId: 1,
              name: "$biodataDetails.name",
              permanentDivision: "$biodataDetails.permanentDivision",
              occupation: "$biodataDetails.occupation",
            },
          },
        ])
        .toArray();

      res.send(result);
    });

    // specific favorite item delete
    app.delete("/favorite/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await favoritesCollection.deleteOne(query);
      res.send(result);
    });

    // contact request data get
    app.get("/contact-requests-user/:email", verifyToken, async (req, res) => {
      const userEmail = req.params.email;
      const decodedEmail = req.user?.email;

      if (userEmail !== decodedEmail) {
        return res.status(403).send({
          success: false,
          message: "Access denied: Unauthorized request.",
        });
      }
      const contactRequests = await paymentCollection
        .find({ contactRequest: "approved", email: userEmail })
        .toArray();

      // Convert string to integer
      const biodataIds = contactRequests.map((request) =>
        parseInt(request.biodataId)
      );
      const biodatas = await biodatasCollection
        .find({ biodataId: { $in: biodataIds } })
        .toArray();

      const result = contactRequests.map((request) => {
        const biodata = biodatas.find(
          (b) => b.biodataId === parseInt(request.biodataId)
        );
        return {
          _id: request._id,
          name: biodata?.name || "N/A",
          biodataId: request.biodataId,
          status: request.contactRequest,
          mobile: biodata?.mobile || "N/A",
          email: biodata?.email || "N/A",
        };
      });

      res.send({ success: true, data: result });
    });

    // contact request data delete
    app.delete("/contact-requests/:id", async (req, res) => {
      const { id } = req.params;
      const result = await paymentCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // success Story post
    app.post("/success-Story", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await successStoryCollection.insertOne(data);
      res.send(result);
    });

    // success Story get data
    app.get("/success-Stories", async (req, res) => {
      const result = await successStoryCollection.find().toArray();
      res.send(result);
    });

    /* --------- admin dashboard -------------- */

    // Make Admin
    app.patch("/users/make-admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Make Premium
    app.patch("/users/make-premium/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          premium: true,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // admin
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      // check admin or not
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    // premium requests
    app.get("/request-premium", async (req, res) => {
      const premiumRequests = await biodatasCollection
        .find({ premiumRequested: "pending" })
        .toArray();
      res.status(200).send(premiumRequests);
    });

    //approve premium request
    app.patch("/approve-premium/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { premiumRequested: "approved" } };
      const result = await biodatasCollection.updateOne(filter, update);
      res.send(result);
    });

    //user search
    app.get("/users", verifyToken, async (req, res) => {
      const search = req.query.search;
      console.log(search);
      let query = {};
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      const result = await userCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });

    // contact request data get
    app.get("/contact-requests", verifyToken, async (req, res) => {
      const result = await paymentCollection.find().toArray();
      res.send(result);
    });

    // contact request data approve
    app.patch("/approve-contact-request/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const update = { $set: { contactRequest: "approved" } };
      const result = await paymentCollection.updateOne(filter, update);
      res.send(result);
    });

    // admin dashboard
    app.get("/biodata-stats", verifyToken, async (req, res) => {
      const totalBiodata = await biodatasCollection.countDocuments();
      const maleBiodata = await biodatasCollection.countDocuments({
        biodataType: "Male",
      });
      const femaleBiodata = await biodatasCollection.countDocuments({
        biodataType: "Female",
      });
      const premiumBiodata = await biodatasCollection.countDocuments({
        premiumRequested: "approved",
      });
      res.send({
        totalBiodata,
        maleBiodata,
        femaleBiodata,
        premiumBiodata,
      });
    });

    // admin dashboard revenue
    app.get("/revenue", verifyToken, async (req, res) => {
      const payments = await paymentCollection.find().toArray();
      const totalRevenue = payments.reduce((sum, payment) => {
        return sum + payment.price;
      }, 0);

      res.json({ totalRevenue });
    });

    //await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

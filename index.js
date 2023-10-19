const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


// dimKhaa
// LV96oQ9ewxTGb7Sg


const uri = "mongodb+srv://dimKhaa:LV96oQ9ewxTGb7Sg@cluster0.6eaz3fu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const brandCollection = client.db('brandDB').collection('brand');
    await client.connect();
    app.get('/brand', async(req, res) =>{
      const cursor = brandCollection.find();
      const result = await cursor.toArray()
      res.send(result)
    })
    app.post('/brand', async(req, res) =>{
      const newBrand = req.body;
      console.log(newBrand)
      const result = await brandCollection.insertOne(newBrand); 
      res.send(result)
    })
      app.get('/brand/samsung', async(req, res) =>{
        const brand = 'Samsung';
        const query = {brandName :brand}
        const result = await brandCollection.find(query).toArray()
        res.send(result)
      })
      app.get('/brand/apple', async(req, res) =>{
        const brand = 'Apple';
        const query = {brandName :brand}
        const result = await brandCollection.find(query).toArray()
        res.send(result)
      })
      app.get('/brand/macbook', async(req, res) =>{
        const brand = 'Macbook';
        const query = {brandName :brand}
        const result = await brandCollection.find(query).toArray()
        res.send(result)
      })

    const userCollection = client.db("userDb").collection("users");

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send("crud is running")
})
app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
})
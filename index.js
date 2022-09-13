const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())

// database


const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.4tiocny.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://geniusUser:6pPM35uw0CSRYBKr@cluster0.4tiocny.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err=>{
//   constcollection=client.db("test").collection("devices");
//   console.log("genius car connected")
//   client.close();
// })

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('geniusCar').collection('service');
    app.get('/service', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get('/service/:id', async (req, res) => {
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const service=await serviceCollection.findOne(query);
      res.send(service);
    });
// post

    app.post('/service',async(req,res)=>{
      const newservice=req.body; 
      
    const result = await serviceCollection.insertOne(newservice);
    res.send(result);
    })
// Delete
app.delete('/service/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)};
  const result=await serviceCollection.deleteOne(query);
  res.send(result)
})
  }
  finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("Example app listening on port", port)
})
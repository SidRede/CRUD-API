const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./modules/productModel');

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello sid !!")
})
app.get('/home',(req,res)=>{
    res.send("Home page !!")
})


// return information of all products 

app.get('/product', async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);

    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json(error.message)
    }
})


// find a product with Id
app.get('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params;
         const product = await Product.findById(id);
         res.status(200).json(product);

    }
    catch(error){
        res.status(500).json(error.message)
    }
})

//Update a product 

app.put('/product/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body);

    if(!product)
    {
        return res.status(404).json({message: `cannot find product with id : ${id}`})
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);

})


// Insert into collection 
app.post('/product',async(req,res)=>{
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);

   }
   catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message})

   }
})



// Delete a product with Id 

app.delete('/product/:id', async(req,res)=>{

    try{
         const {id} = req.params;
         const product = await Product.findByIdAndDelete(id);
         if(!product)
         {
            return res.status(404).json({message : `product not found with id = ${id}`})
         }
         res.status(200).json(product);
    }

    catch(error){
        res.status(500).json(error.message);
    }
})






//Mongo db connection with Atlas 
// MongoDb cluster at https://cloud.mongodb.com/v2/66c36a68eac2ec7f8f06f1a6#/clusters
mongoose.connect('mongodb+srv://siddheshwarrede21:Sopan11@nodeapi.r8qsx.mongodb.net/?retryWrites=true&w=majority&appName=NodeAPI').then(()=>{
    console.log('database connected successfully !!')
    app.listen(3000, ()=>{
        console.log("listning on port 3000");
    }) 
}).catch((error) => {
    console.log(error)
})
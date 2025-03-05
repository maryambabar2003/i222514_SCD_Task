const express =require('express');
const app = express()
app.use(express.json);
const port = 3001;

let cararray =[];


app.post('/cars', (req, res) => {
    const { model, location } = req.body;

    if (!model || !location) 
    {
        return res.status(400).send('Enter both, Model and location');
    }
    const newCar = { 
        carId: cars.length + 1, 
        model, 
        location, 
        isAvailable: true 
    };


    cararray.push(newCar);
    res.status(201).json(newCar);
});


app.get('/cars/:carId', (req, res) => {

    const carId = parseInt(req.params.id);

    const car = cararray.find(c => c.id === carId);

    if(car) 
    {
      res.json(car);
    }
    else
    {
      res.status(404).json({error: 'notfound' });
    }
});


app.put('/cars/:carId', (req, res) => {

    const carId = parseInt(req.params.id);

    const car = cararray.find(c => c.id === carId);

    if(car) 
    {
      res.json(car);
    }
    else
    {
      res.status(404).json({error: 'notfound' });
    }

    car.isAvailable = req.body.isAvailable;
    res.json(car);
});


app.listen(port, () => {
    console.log(`Car Service running on port ${port}`);
    
});





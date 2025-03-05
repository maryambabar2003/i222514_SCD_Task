const express = require('express')
const axios =require('axios');
const app = express();
app.use(express.json());
const port = 3002;


let bookingsarray = [];

increment = 1;
decrment = -1;

app.post('/bookings', async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;
   
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    const user = userResponse.data;
    
    if (user.activeBookings >= user.maxBookings) 
    {
        return res.status(400).json({ error: 'Booking limit reached' });
    }

    const carResponse = await axios.get(`http://localhost:3002/cars/${carId}`);
    const car = carResponse.data;

    if (!car.isAvailable) 
    {
        return res.status(400).json({ error: 'Car not available' });
    }

    const newBooking = { 
        bookingId: bookings.length + 1, 
        userId, 
        carId, 
        startDate, 
        endDate, 
        status: 'active'
    };

    bookingsarray.push(newBooking);
   

    
    await axios.put(`http://localhost:3001/users/${userId}`, { increment });
    await axios.put(`http://localhost:3002/cars/${carId}`, { isAvailable: false });
   
    res.status(201).json(newBooking);
});












app.get('/bookings/:userid', (req, res) => {
    const userID = parseInt(req.params.userid);
    
    const bookingsForUser = bookings.filter(booking => booking.userId === userID);

    if (!bookingsForUser) {
        return res.status(404).send('Restaurant not found');
    }
    res.json(bookingsForUser);
});


app.delete('/bookings/:bookingId', async (req, res) => {

    const bookId = parseInt(req.params.id)

    const booking = bookingsarray.find(b =>b.id === bookid)
    if (booking)
    {
        res.json(book)
    }
    else
    {
        res.status(404).json({error: 'not found'})
    }
   
    booking.status = 'canceled';
   
    const userResponse = await axios.get(`http://localhost:3001/users/${booking.userId}`);
    const user = userResponse.data;


    await axios.put(`http://localhost:3001/users/${booking.userId}`, { decrement });
   
    await axios.put(`http://localhost:3002/cars/${booking.carId}`, { isAvailable: true });
   
    res.json(booking);
});


app.listen(port, () => {
    console.log(`Booking Service running on port ${port}`)
});

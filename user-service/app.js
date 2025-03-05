const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

let usersarray = [];

app.post('/users', (req, res) => 
{
    const { name, email } = req.body;
    
    if (!name || !email) 
    {
        return res.status(400).send('Enter both, Name and email');
    }
    const newUser = { 
        userId: usersarray.length + 1, 
        name, 
        email, 
        maxBookings: 3, 
        activeBookings: 0 
    };
    usersarray.push(newUser);
    res.status(201).json(newUser);
});


app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const user = usersarray.find(u => u.id === userId);

    if(user) 
    {
      res.json(user);
    }
    else
    {
      res.status(404).json({error: 'notfound' });
    }
});


app.put('/users/:userId', (req, res) => {

  const userId = parseInt(req.params.id);

    const user = usersarray.find(u => u.id === userId);

    if(user) 
    {
      res.json(user);
    }
    else
    {
      res.status(404).json({error: 'notfound' });
    }

 
  user.activeBookings = req.body.activeBookings  + user.activeBookings;
  res.json(user);
});


app.listen(port, () => {
  console.log(`User-Service running on port ${port}`);
  });















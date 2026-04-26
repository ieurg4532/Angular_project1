const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/register', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;

  const userExists = db.get('users').find({ email }).value();

  if (userExists) {
    return res.status(400).json({ message: 'Користувач вже існує' });
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password,
  };

  db.get('users').push(newUser).write();

  res.status(201).json({
    accessToken: 'jwt-token-' + Math.random().toString(36).substring(7),
    user: { email, id: newUser.id },
  });
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;

  const user = db.get('users').find({ email, password }).value();

  if (user) {
    res.status(200).json({
      accessToken: 'jwt-token-success-' + user.id,
      user: { email: user.email, id: user.id },
    });
  } else {
    res.status(401).json({ message: 'Невірний email або пароль' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('🚀 Custom Auth Server is running on http://localhost:3000');
});

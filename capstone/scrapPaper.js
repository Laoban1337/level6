


//sign up route storage for expriment
authRouter.post(`/signup`, async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: req.body.username.toLowerCase(),
    });
    if (user) {
      res.status(403);
      return next(new Error("That username is already taken"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    const saveduser = await newuser.save();
    const token = jwt.sign({ id: saveduser._id }, process.env.SECRET);
    return res.status(201).send({ token, user: saveduser.withoutPassword() });
  } catch (error) {}
});


authRouter.post(`/login`, async (req, res, next) => {
  try {
    const { username, password } = req.body;  // Extract username and password from request body
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      res.status(403);
      return next(new Error("Username/password issue. Please check username and/or password!"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(403);
      return next(new Error("Username/password issue. Please check your credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    return res.status(200).send({ token, user: user.withoutPassword() });

  } catch (error) {
    next(error);  // Pass the error to the error handling middleware
  }
});


//old way of loging in
// user.checkPassword(req.body.password, (err, isMatch) => {
//   if (err || !isMatch) {
//     res.status(403);
//     return next(
//       new Error("Username/password issue. please check your credentials")
//     );
//   }
//   const token = jwt.sign({ id: user._id }, process.env.SECRET);
//   //   const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
//   delete userWithoutPassword.password;
//   return res.status(200).send({ token, user: user.withoutPassword() });
// });
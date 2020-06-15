var Router = require('express');
var bcrypt  =require('bcryptjs');
var config = require('../config/config.js');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');
// User Model
var User = require('../models/User');

const { JWT_SECRET } = config;
const router = Router();

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
console.log("HITTING")
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        gender: user.gender,
        email: user.email,
        accountType: user.accountType,
        address: user.address,
        city: user.city,
        province: user.province,
        Country: user.Country,
        telephoneNumber: user.telephoneNumber,
        PostalCode: user.PostalCode
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
  const { firstName, lastName, dob, gender,email,password,confirmPassword,accountType,address,city,province,Country,telephoneNumber,PostalCode } = req.body;
  console.log("HERE", req.body);

  // Simple validation

  if(password!==confirmPassword){
    console.log("DDSDFD")
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  if (!firstName||
    !lastName||
    !dob||
    !gender||
    !email||
    !password||
    !accountType||
    !address||
    !city||
    !province||
    !Country||
    !telephoneNumber||
    !PostalCode) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User Already exists' });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      firstName,
      lastName,
      dob,
      gender,
      email,
      password:hash,
      accountType,
      address,
      city,
      province,
      Country,
      telephoneNumber,
      PostalCode,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        dob: savedUser.dob,
        gender: savedUser.gender,
        email: savedUser.email,
        accountType: savedUser.accountType,
        address: savedUser.address,
        city: savedUser.city,
        province: savedUser.province,
        Country: savedUser.Country,
        telephoneNumber: savedUser.telephoneNumber,
        PostalCode: savedUser.PostalCode
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
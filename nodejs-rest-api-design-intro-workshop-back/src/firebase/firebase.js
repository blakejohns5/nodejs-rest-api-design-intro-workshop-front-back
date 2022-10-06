
// to use the service account and create instance of firebase admin sdk
const admin = require('firebase-admin')
const config = require('../config/config')



admin.initializeApp({
  credential:
  admin.credential.cert(config.firebase.certConfig),
});


const auth = admin.auth();


module.exports = { 
  admin: admin,
  auth: auth,
};





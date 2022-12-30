const AmamazonCognitoIdentity = require('amazon-cognito-identity-js');
require('dotenv').config();

const cognito = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
}

const userPool = new AmamazonCognitoIdentity.CognitoUserPool(cognito);

const signInCognito = async (req, res) => {
    const {username, password} = req;
    
    const authenticationDetails = new AmamazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password
    });

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new AmamazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            // const verified = result;
            // console.log(verified);
            // res.status(200).json({
            //     'status': true,
            //     'msg':result
            // });
            res.json({
                status: true,
                msg: 'Usuario verificado',
                user: req
            })
        },
        onFailure: function (err) {
            // console.log('Entra aqui con error: ' + err);
            // res.status(500).json({
            //     'status': false,
            //     'msg':err
            //     });
            res.json({
                status: false,
                msg: 'Usuario no verificado',
                user: req
            })
        }
    });
}

const signUpCognito = async (req, res) => {
    const { username, password, email } = req.body;
    const attributeList = [];
    // attributeList.push(new AmamazonCognitoIdentity.CognitoUserAttribute({'': username}));
    attributeList.push(new AmamazonCognitoIdentity.CognitoUserAttribute({'Name': 'email', 'Value': email}));
    userPool.signUp(username, password, attributeList, null, async (err, data) => {
        if (err) {
            console.log(err);
            // res.status(500).send
        } else {
            // console.log(data)
            // res.status(200).send(data);
        }
    });
}

module.exports = {
    signUpCognito,
    signInCognito
}

const userData = require('../data/user.json');
// const fs = require('fs');

module.exports.randomUser = (req, res) => {
    const random = Math.floor(Math.random() * userData.length) + 1;
    const user = userData.find(user => user.id === random);
    res.status(200).json({
        'status': true,
        'message': `Random user id ${random}`,
        'user': user
    });
    res.end();
};

module.exports.allUser = (req, res) => {
    const { limit } = req.query;
    if (limit) {
        if (limit <= userData.length && limit >= 1) {
            res.status(200).json({
                'status': true,
                'message': `user limit ${limit}`,
                'userList': userData.slice(0, limit)
            });
            res.end();
        } else {
            res.status(404).json({
                'status': false,
                'message': `limit not exist!`,
                'userList': null
            });
        };
    } else {
        res.status(200).json({
            'status': true,
            'message': 'all user',
            'userList': userData
        });
    };
};

module.exports.saveUser = (req, res) => {
    let { id, name, contact, gender, address, photoUrl } = req.body;
    let error = {};
    if (!id) {
        error.id = "Id is required!"
    }
    if (!name) {
        error.name = "Name is required!"
    }
    if (!contact) {
        error.contact = "Contact is required!"
    }
    if (!gender) {
        error.gender = "Gender is required!"
    }
    if (!address) {
        error.address = "Address is required!"
    }
    if (!photoUrl) {
        error.photoUrl = "photo is required!"
    }
    let isError = Object.keys(error).length > 0;

    if (isError) {
        res.status(404).json({
            'status': false,
            'error': error
        });
    }
    else {
        let user = {
            id: req.body.id,
            name: req.body.name,
            contact: req.body.contact,
            gender: req.body.gender,
            address: req.body.address,
            photoUrl: req.body.photoUrl
        }
        // let data = JSON.stringify(user);
        // try {
        //     fs.writeFileSync('./data/user.json', data, null, 2);
        //   } catch (err) {
        //     console.error(err);
        //   }
        userData.push(user);
        res.status(200).json({
            'status': true,
            'message': 'user save successfully!',
            'newUser': userData
        });
    }
    // userData.push(req.body);
    // res.json(userData);
}

module.exports.updateUser = (req,res) =>{
    let { id } = req.body;
    let error = {};
    if (!id) {
        error.id = "Id is required!"
        res.status(404).json({
            'status': false,
            'error': error
        });
    }
    if(id){
        user = userData.find(u=> u.id === Number(id));
        user.name = req.body.name  || user.name;
        user.address = req.body.address  || user.address;
        user.contact = req.body.contact  || user.contact;
        user.gender = req.body.gender  || user.gender;
        user.photoUrl = req.body.photoUrl  || user.photoUrl;
        res.status(200).json({
            'status': true,
            'message': 'user update successfully!',
            'newUser': userData
        });
    }
}

module.exports.deleteUser = (req,res)=>{
    let {id} = req.body;
    let error = {};
    if (!id) {
        error.id = "Id is required!"
        res.status(404).json({
            'status': false,
            'error': error
        });
    }
    if(id){
        newUserList = userData.filter(u => u.id !== Number(id));
        res.status(200).json({
            'status': true,
            'message': 'user delete successfully!',
            'newUserList': newUserList
        });
    }
}


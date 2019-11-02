var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const database = 'test';  
mongoose.connect(`mongodb://mongo:27017/test`, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function(){
    console.log('Connection Failed!');
});

db.once('open', function() {
    console.log('MongoDB Connected!');
});
var client = mongoose.Schema({
    name : 'String',
    phone : 'number',
    mail : 'String',
    getway : 'String',
    state : 'String',
    address: 'String',
    zonecode: 'number'
});

var Client = mongoose.model('clienttwo', client);

router.get('/datawatch', (req, res) => {
  Client.find(function(error, clients){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        return res.json(clients);
    }
  })
})

router.post('/datainsert', (req, res) => {
    var Client = mongoose.model('clienttwo', client);
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    var newClient = new Client({    
        name : name,
        phone : phone,
        mail : email,
        getway : '',
        state : '',
        address: '',
        zonecode: '' 
    });
    newClient.save(function(error, data){
      if(error){
        console.log(error);
      }else{
        console.log('DB에 데이터 추가 완료')
      }
    });
    return res.json( {success : true});
})

router.post('/csvinsert', async (req, res) => {
    var file = req.body.file;
    var Client = mongoose.model('clienttwo', client);
    var i = 0;
    console.log(file)
    console.log("csvinsert입니다")
    for(i ; i< file.length ; i++){
        console.log(file[i].name)
        console.log(file[i].phone)
        console.log(file[i].get)
        console.log(file[i].state)
        const name = file[i].name;
        const phone = file[i].phone;
        const email = "osydooo@naver.com";
        const getway = file[i].get;
        const state = file[i].state;
        const address = '';
        const zonecode = '';

        var newClient = new Client({         
            name : name,
            phone : phone,
            mail : email,
            getway : getway,
            state : state,
            address: address,
            zonecode: zonecode
         });
        
        await Client.findOne({name: name, phone: phone}, function(err, data){
         if(err) console.log(err);
         else{
            if(data){
                console.log(data)
            }else{ 
                newClient.save(function(error){
                   if(error){
                       console.error(error);
                   }else{
                       console.log('csv파일 DB에 저장 완료')
                   }
               });
            }
         }
     })    
    }
    return res.json( {success : true});
})

router.post('/addData', (req, res) => {
    var Client = mongoose.model('clienttwo', client);
    let name = req.body.name;
    let phone = req.body.phone;
    let getway = req.body.getway;
    let state = req.body.state;

    var newClient = new Client({             
        name : name,
        phone : phone,
        mail : email,
        getway : getway,
        state : state,
        address: '',
        zonecode: '' 
    });
    Client.findOne({name: name, phone: phone}, function(err, data){
        if(err){
            console.log(err);
        } 
        if(data){
            console.log("이미 중복된 데이터가 존재합니다.");
        }else{
           newClient.save(function(error, data){
               if(error){
                   console.log(error);
                }else{
                   console.log('회원정보 저장 완료');
               }
           });
        }
    })
    return res.json({success : true});
})

router.get('/getdata', (req, res) => {
  Client.find(function(error, clients){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        return res.json(clients);
    }
  })

})

module.exports = router;


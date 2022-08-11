// routes, appelé communement Controller
const express = require('express'); // Spécification du package à utiliser
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { User } = require('../models/User');
const { User_admin } = require('../models/User_admin');
const { Store } = require('../models/Store');


//Routes
/**
 * @swagger
 * tags:
 *  - name: User
 *    description : User operations
 *  - name: Admin
 *    description: Administrator operations
 *  - name: Store
 *    description: Store operations
 */
 
/**
 * @swagger
 * /user/add/:
 *    post:
 *      tags: [User]
 *      summary: Add a new user
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  e_mail:
 *                      type: string
 *                      example: "exampleaccount@gmail.com"
 *                  password:
 *                      type: string
 *                      example: "example_secretpassword"
 *              required:
 *                  - e_mail
 *                  - password
 *      responses:
 *          '200':
 *              description: New user created successfully !!!
 */ 

  router.post('/user/add', (req,res)=>{ //Insert : Très bien koa
    const newRecord = new User({
        e_mail : req.body.e_mail,
        password : req.body.password
    });
   
   newRecord.save((err,docs)=>{
   if(!err) res.send(docs);
   else console.log("Error sending new data : " + err);
   });
   })
 
 /**
  *  @swagger
 * paths:
 *  /user:
 *   get:
 *    tags: [User]
 *    summary : List all users
 *    security:
 *       - ApiKeyAuth: []
 *    description: Fetch the list of users
 *    responses:
 *      '200':
 *          description : A successful response
 */
 router.get('/user',(req,res)=>{//Select all users: OK
    User.find((err,docs)=>{
        if(!err) res.send(docs);
        else console.log("Error : couldn't retrieve data " + err);
    })
});

/**
 * @swagger
 *  /user/{Field name}/{Item ID}:
 *   get:
 *    tags: [User]
 *    summary : Find user by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["e_mail"]
 *       required: true
 *     - name: Item ID
 *       in: path
 *       type: string
 *       description: ID of the user
 *       default: test@gmail.com
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.get('/user/:tags/:id',(req,res)=>{//Select one article : OK
    let query = {};
    query[req.params.tags] = req.params.id
    User.find(query,(err,docs)=>{
        if(!err) res.send(docs);
        else console.log("Error : couldn't retrieve data " + err);
    })
});


/**
 * @swagger
 * /user/Update/{email}:
 *    put:
 *      tags: [User]
 *      summary: Update user info
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: email
 *            description: User e-mail
 *            in: path
 *            type: string
 *            required: true
 *            default: test@gmail.com
 *          - name: requestBody
 *            description: Remove the field that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  e_mail:
 *                      type: string
 *                      example: test@gmail.com
 *                  password:
 *                      type: string
 *                      example: 12345
 *              required:
 *                  - e_mail
 *                  - password
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */ 

 router.put("/user/update/:mail", (req,res)=>{// Update : De mbola très bien koa

    
    let query = {};
    query["e_mail"] = req.params.mail;


 //   if(!ObjectID.isValid(req.params.id))
   //     return res.status(400).send("ID Unknown : " + req.params.id);
const updateRecord = {
    e_mail : req.body.e_mail,
    password : req.body.password
}

    User.findOneAndUpdate(
        query,
        {$set: updateRecord},
        {new: true},
        (err, docs)=> {
            if(!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
});

/**
 * @swagger
 *  /user/delete/{Field name}/{Item ID}:
 *   delete:
 *    tags: [User]
 *    summary : Remove a user
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a user
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["e_mail"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: Item ID
 *       in: path
 *       type: string
 *       description: E-mail of the user
 *       default: test@gmail.com
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.delete('/user/delete/:tags/:id',(req,res)=>{// Delete : Ok
    let query = {};
    query[req.params.tags] = req.params.id
    User.deleteMany(query, function(err, obj) {
        if (err) throw err;
        res.send(`The user with the ID : ${req.params.id} has been deleted from the database.`);
      });
});














/**
 * @swagger
 * /admin/add/:
 *    post:
 *      tags: [Admin]
 *      summary: Add a new admin
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  e_mail:
 *                      type: string
 *                      example: "exampleaccount@gmail.com"
 *                  password:
 *                      type: string
 *                      example: "secret"
 *                  lastname:
 *                      type: string
 *                      example: "Paul"
 *                  firstname:
 *                      type: string
 *                      example: "ALISON"
 *                  status_acces:
 *                      type: string
 *                      enum:
 *                          - Admin
 *                          - Super-admin
 *              required:
 *                  - e_mail
 *                  - password
 *                  - status_acces
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */ 

 router.post('/admin/add', (req,res)=>{ //Insert : Très bien koa
    const newRecord = new User_admin({
        e_mail : req.body.e_mail,
        password : req.body.password,
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        status_acces : req.body.status_acces
    });
   
   newRecord.save((err,docs)=>{
   if(!err) res.send(docs);
   else console.log("Error sending new data : " + err);
   });
   })
 
 /**
  *  @swagger
 * paths:
 *  /admin:
 *   get:
 *    tags: [Admin]
 *    summary : List all administrators
 *    security:
 *      - ApiKeyAuth: []
 *    description: Fetch the list of administrators
 *    responses:
 *      '200':
 *          description : A successful response
 */
 router.get('/admin',(req,res)=>{//Select all users: OK
    User_admin.find((err,docs)=>{
        if(!err) res.send(docs);
        else console.log("Error : couldn't retrieve data " + err);
    })
});


/**
 * @swagger
 *  /admin/{Field name}/{Item value}:
 *   get:
 *    tags: [Admin]
 *    summary : Find administrator by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["e_mail","lastname","firstname","status_acces"]
 *       required: true
 *     - name: Item value
 *       in: path
 *       type: string
 *       default: sageit1433@gmail.com
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Administrator not found
 */
router.get('/admin/:tags/:id',(req,res)=>{//Select one article : OK
    let query = {};
    query[req.params.tags] = req.params.id
    User_admin.find(query,(err,docs)=>{
        if(!err) res.send(docs);
        else console.log("Error : couldn't retrieve data " + err);
    })
});


/**
 * @swagger
 * /admin/Update/{id}:
 *    put:
 *      tags: [Admin]
 *      summary: Update an admin
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: id
 *            description: Admin e-mail
 *            in: path
 *            type: string
 *            required: true
 *            default: exampleaccount@gmail.com
 *          - name: requestBody
 *            description: Remove the field that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  e_mail:
 *                      type: string
 *                      example: exampleaccount@gmail.com
 *                  password:
 *                      type: string
 *                      example:
 *                  lastname:
 *                      type: string
 *                      example:
 *                  firstname:
 *                      type: string
 *                      example:
 *                  status_acces:
 *                      type: string
 *                      example:
 *              required:
 *                  - e_mail
 *                  - password
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */ 

 router.put("/admin/update/:email", (req,res)=>{// Update : De mbola très bien koa
  //  if(!ObjectID.isValid(req.params.id))
   //     return res.status(400).send("ID Unknown : " + req.params.id);

   let query = {};
   query["e_mail"] = req.params.email;

const updateRecord = {
    e_mail : req.body.e_mail,
    password : req.body.password,
    lastname : req.body.lastname,
    firstname : req.body.firstname,
    status_acces : req.body.status_acces
}

    User_admin.findOneAndUpdate(
        query,
        {$set: updateRecord},
        {new: true},
        (err, docs)=> {
            if(!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
});

/**
 * @swagger
 *  /admin/delete/{Field name}/{Item ID}:
 *   delete:
 *    tags: [Admin]
 *    summary : Remove an admin
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove an admin
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["e_mail","lastname","firstname","status_acces"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: Item ID
 *       in: path
 *       type: string
 *       description: E-mail of the user
 *       default: test@gmail.com
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.delete('/admin/delete/:tags/:id',(req,res)=>{// Delete : Ok
    let query = {};
    query[req.params.tags] = req.params.id
    User_admin.deleteMany(query, function(err, obj) {
        if (err) throw err;
        res.send(`The admin with the e-mail : ${req.params.id} has been deleted from the database.`);
      });
});

































/**
 * @swagger
 * /store/add/:
 *    post:
 *      tags: [Store]
 *      summary: Add a new admin
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  name: 
 *                      type: String
 *                      example: ""
 *                  storeid: 
 *                      type: String
 *                      example: ""
 *                  location:
 *                      type: object
 *                      properties:
 *                         address: 
 *                             type: String
 *                             example: ""
 *                         address_2: 
 *                             type: String
 *                             example: ""
 *                         city: 
 *                             type: String
 *                             example: ""
 *                         country: 
 *                             type: String
 *                             example: ""
 *                         currency:
 *                             type: String
 *                             example: ""
 *                         postal_code: 
 *                             type: String
 *                             example: ""
 *                         state: 
 *                             type: String
 *                             example: ""
 *                         latitude: 
 *                             type: String
 *                             example: ""
 *                         longitude: 
 *                             type: String
 *                             example: ""
 *                  contact_emails: 
 *                      type: array
 *                      items:
 *                          type: string
 *                  raw_hero_url: 
 *                       type: String
 *                       example: ""
 *                  price_bucket: 
 *                       type: String
 *                       example: ""
 *                  avg_prep_time: 
 *                       type: String
 *                       example: ""
 *                  status: 
 *                       type: String
 *                       enum:
 *                          - active
 *                          - pause
 *                          - offline
 *                  merchant_store_id: 
 *                       type: String
 *                       example: ""
 *                  timezone: 
 *                       type: String
 *                       example: ""
 *                  web_url: 
 *                       type: String
 *                       example: ""
 *                  web_facebook: 
 *                       type: String
 *                       example: ""
 *                  web_instagram: 
 *                       type: String
 *                       example: ""
 *                  web_tripadvisor: 
 *                       type: String
 *                       example: ""
 *                  web_google: 
 *                       type: String
 *                       example: ""
 *                  pos_data:
 *                      type: object
 *                      properties:
 *                         integration_enabled: 
 *                             type: Boolean
 *                             enum:
 *                                  - true
 *                                  - false
 *                         order_manager_client_id: 
 *                             type: String
 *                             example: ""
 *                         integrator_store_id:  
 *                             type: String
 *                             example: ""
 *                         integrator_brand_id:  
 *                             type: String
 *                             example: ""
 *                         store_configuration_data:  
 *                             type: String
 *                             example: ""
 *                         is_order_manager_pending:  
 *                             type: Boolean
 *                             enum:
 *                                  - true
 *                                  - false
 *                  details_company:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                             duns:  
 *                                  type: String
 *                                  example: ""
 *                             ein: 
 *                                  type: String
 *                                  example: ""
 *                             siret:
 *                                  type: String
 *                                  example: ""
 *                             rcs: 
 *                                  type: String
 *                                  example: ""
 *                             vat_id: 
 *                                  type: String
 *                                  example: ""
 *              required:
 *                  - name
 *                  - storeid
 *                  - status
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */

 router.post('/store/add', (req,res)=>{ //Insert : Très bien koa
    const newRecord = new Store({
        name: req.body.name,
        storeid: req.body.storeid,
        location: req.body.location,
        contact_emails: req.body.contact_emails,
        raw_hero_url: req.body.raw_hero_url,
        price_bucket: req.body.price_bucket,
        avg_prep_time: req.body.avg_prep_time,
        status: req.body.status,
        merchant_store_id: req.body.merchant_store_id,
        timezone: req.body.timezone,
        web_url: req.body.web_url,
        web_facebook: req.body.web_facebook,
        web_instagram: req.body.web_instagram,
        web_tripadvisor: req.body.web_tripadvisor,
        web_google: req.body.web_google,
        pos_data: req.body.pos_data,
        details_company:req.body.details_company
    });
   
   newRecord.save((err,docs)=>{
   if(!err) res.send(docs);
   else console.log("Error sending new data : " + err);
   });
   })
 
 /**
  *  @swagger
 * paths:
 *  /store:
 *   get:
 *    tags: [Store]
 *    summary : List all stores
 *    security:
 *      - ApiKeyAuth: []
 *    description: Fetch the list of stores
 *    responses:
 *      '200':
 *          description : A successful response
 */
 router.get('/store',(req,res)=>{//Select all users: OK
    Store.find((err,docs)=>{
        if(!err) res.send(docs);
        else console.log("Error : couldn't retrieve data " + err);
    })
});


/**
 * @swagger
 *  /store/Status:
 *   get:
 *    tags: [Store]
 *    summary : Select stores with status
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      '200':
 *          description : A successful response
 */
 router.get('/store/Status',(req,res)=>{//Select one article : OK
    Store.find({},{_id:0,storeid:1, name:1, status:1},(err,docs)=>{
        if(!err) res.send(docs);
        else console.log("Error : couldn't retrieve data " + err);
    })
});


/**
 * @swagger
 *  /store/{Field name}/{Store ID}:
 *   get:
 *    tags: [Store]
 *    summary : Find store by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["name","storeid"]
 *       required: true
 *     - name: Store ID
 *       in: path
 *       type: string
 *       description: Value of the store to return
 *       default: 62f0f7850ff58eec150f36a4
 *       required: true
 *       schema:
 *         type: integer
 *         format: int64
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Store not found
 */
router.get('/store/:tags/:id',(req,res)=>{//Select one article : OK
    let query = {};
    query[req.params.tags] = req.params.id
    Store.find(query,(err,docs)=>{
        if(!err) res.send(docs);
        else console.log("Error : couldn't retrieve data " + err);
    })
});



/**
 * @swagger
 * /store/Update/{Field name}/{Store}:
 *    put:
 *      tags: [Store]
 *      summary: Update an admin
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field name
 *            description: ID or store name
 *            in: path
 *            type: string
 *            enum: ["name","storeid"]
 *            required: true
 *          - name: Store
 *            in: path
 *            type: string
 *            description: Name or ID
 *            required: true
 *          - name: requestBody
 *            description: Remove the field that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  name: 
 *                      type: String
 *                      example: "Unknown"
 *                  storeid: 
 *                      type: String
 *                      example: "Unknown"
 *                  location:
 *                      type: object
 *                      properties:
 *                         address: 
 *                             type: String
 *                             example: "Unknown"
 *                         address_2: 
 *                             type: String
 *                             example: "Unknown"
 *                         city: 
 *                             type: String
 *                             example: "Unknown"
 *                         country: 
 *                             type: String
 *                             example: "Unknown"
 *                         currency:
 *                             type: String
 *                             example: "Unknown"
 *                         postal_code: 
 *                             type: String
 *                             example: "Unknown"
 *                         state: 
 *                             type: String
 *                             example: "Unknown"
 *                         latitude: 
 *                             type: String
 *                             example: "Unknown"
 *                         longitude: 
 *                             type: String
 *                             example: "Unknown"
 *                  contact_emails: 
 *                      type: array
 *                      items:
 *                          type: string
 *                  raw_hero_url: 
 *                       type: String
 *                       example: "Unknown"
 *                  price_bucket: 
 *                       type: String
 *                       example: "Unknown"
 *                  avg_prep_time: 
 *                       type: String
 *                       example: "Unknown"
 *                  status: 
 *                       type: String
 *                       enum:
 *                          - active
 *                          - pause
 *                          - offline
 *                  merchant_store_id: 
 *                       type: String
 *                       example: "Unknown"
 *                  timezone: 
 *                       type: String
 *                       example: ""
 *                  web_url: 
 *                       type: String
 *                       example: "Unknown"
 *                  web_facebook: 
 *                       type: String
 *                       example: "Unknown"
 *                  web_instagram: 
 *                       type: String
 *                       example: "Unknown"
 *                  web_tripadvisor: 
 *                       type: String
 *                       example: "Unknown"
 *                  web_google: 
 *                       type: String
 *                       example: "Unknown"
 *                  pos_data:
 *                      type: object
 *                      properties:
 *                         integration_enabled: 
 *                             type: Boolean
 *                             enum:
 *                                  - true
 *                                  - false
 *                         order_manager_client_id: 
 *                             type: String
 *                             example: "Unknown"
 *                         integrator_store_id:  
 *                             type: String
 *                             example: "Unknown"
 *                         integrator_brand_id:  
 *                             type: String
 *                             example: "Unknown"
 *                         store_configuration_data:  
 *                             type: String
 *                             example: "Unknown"
 *                         is_order_manager_pending:  
 *                             type: Boolean
 *                             enum:
 *                                  - true
 *                                  - false
 *                  details_company:
 *                      type: array
 *                      items:
 *                         type: object
 *                         properties:
 *                             duns:  
 *                                  type: String
 *                                  example: "Unknown"
 *                             ein: 
 *                                  type: String
 *                                  example: "Unknown"
 *                             siret:
 *                                  type: String
 *                                  example: "Unknown"
 *                             rcs: 
 *                                  type: String
 *                                  example: "Unknown"
 *                             vat_id: 
 *                                  type: String
 *                                  example: "Unknown"
 *              required:
 *                  - name
 *                  - storeid
 *                  - status
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */ 

 router.put("/store/update/:tags/:storeid", (req,res)=>{// Update : De mbola très bien koa
    //if(!ObjectID.isValid(req.params.id))
    //    return res.status(400).send("ID Unknown : " + req.params.id);
const updateRecord = {
    name: req.body.name,
    storeid: req.body.storeid,
    location: req.body.location,
    contact_emails: req.body.contact_emails,
    raw_hero_url: req.body.raw_hero_url,
    price_bucket: req.body.price_bucket,
    avg_prep_time: req.body.avg_prep_time,
    status: req.body.status,
    merchant_store_id: req.body.merchant_store_id,
    timezone: req.body.timezone,
    web_url: req.body.web_url,
    web_facebook: req.body.web_facebook,
    web_instagram: req.body.web_instagram,
    web_tripadvisor: req.body.web_tripadvisor,
    web_google: req.body.web_google,
    pos_data: req.body.pos_data,
    details_company:req.body.details_company
}

let query = {};
    query[req.params.tags] = req.params.storeid

Store.findOneAndUpdate(
        query,
        {$set: updateRecord},
        {new: true},
        (err, docs)=> {
            if(!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
});

/**
 * @swagger
 *  /store/delete/{Field name}/{Item ID}:
 *   delete:
 *    tags: [Store]
 *    summary : Remove a store
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a store
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["name","storeid"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: Item ID
 *       in: path
 *       type: string
 *       description: Info of the store
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.delete('/store/delete/:tags/:id',(req,res)=>{// Delete : Ok
    let query = {};
    query[req.params.tags] = req.params.id
    Store.deleteMany(query, function(err, obj) {
        if (err) throw err;
        res.send(`The store with the ID : ${req.params.id} has been deleted from the database.`);
      });
});
















/**
 * @swagger
 * securityShemes:
 *   APIKeyAuth:
 *     type: apiKey
 *     in: header
 *     name: X-API-KEY
 * security:
 *  - APIKeyAuth:[]
 */
module.exports = router

// routes, appelé communement Controller
const express = require('express'); // Spécification du package à utiliser
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { User } = require('../models/User');
const { Admin } = require('../models/Admin');
const { Store } = require('../models/Store');
const { Customer } = require('../models/Customer');
const { Categorie } = require('../models/Categorie');
const { Tax } = require('../models/Taxe');
const { Item } = require('../models/Item');
const { Table } = require('../models/Table');
const { Order_detail } = require('../models/Order_detail');
const { QrCode } = require('../models/QrCode');
const { Venue } = require('../models/Venue');
const { Review } = require('../models/Review');
//const { Order_detail } = require("../models/Order_detail");

const { Order } = require('../models/Order');

router.get('/', function (err, res) {
  res.redirect('/eats-api');
});

router.get('/api-docs', function (err, res) {
  res.redirect('/eats-api');
});

/********************************************************* Items ****************************************************/
router.get('/items/category/:value', (req, res) => {
  Item.find({ item_category: req.params.value }, { _id: 0 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

router.get('/items/category/', (req, res) => {
  Item.find({}, { _id: 0, item_category: 1, itemid: 1 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/********************************************************* Items ****************************************************/
/********************************************************* Order ****************************************************/
router.get('/order/created', (req, res) => {
  Order.find({ Current_state: 'Created' }, { _id: 0 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

router.get('/order/accepted', (req, res) => {
  Order.find({ Current_state: 'Accepted' }, { _id: 0 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

router.get('/order/finished', (req, res) => {
  Order.find({ Current_state: 'Finished' }, { _id: 0 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

router.get('/order/rejected', (req, res) => {
  Order.find({ Current_state: 'Rejected' }, { _id: 0 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

router.get('/order/:id', (req, res) => {
  let query = {};
  query['Order_id'] = req.params.id;
  Order.find(query, { items_information: 1, _id: 0 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

router.get('/order/exist/:id', (req, res) => {
  let query = {};
  // query["Order_id"] = req.params.id;
  Order.find(
    { User_ID: req.params.id, Current_state: 'En cours' },
    { _id: 0 },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error : couldn't retrieve data " + err);
    }
  );
});

router.get('/order/get_one/:id', (req, res) => {
  let query = {};
  // query["Order_id"] = req.params.id;
  Order.find(
    { User_ID: req.params.id, Current_state: 'En cours' },
    { items_information: 1, _id: 0 },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error : couldn't retrieve data " + err);
    }
  );
});

router.post('/order/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Order({
    Order_id: req.body.Order_id,
    Store_ID: req.body.Store_ID,
    User_ID: req.body.User_ID,
    Current_state: req.body.Current_state,
    items_information: req.body.items_information,
    //  Total_ttc_amount: req.body.Total_ttc_amount,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

router.put('/order/patch/:id', (req, res) => {
  const updateRecord = {
    items_information: req.body.items_information,
  };

  Order.findOneAndUpdate(
    { User_ID: req.params.id, Current_state: 'En cours' },
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 * /order/OrderState/{id}:
 *    put:
 *      tags: [Table]
 *      summary: Update an admin
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["Order_id"]
 *            required: true
 *          - name: id
 *            description: ID or name of the table
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove all fields that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  Current_state:
 *                      type: string
 *                      example: "Accepted"
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */
router.put('/order/Orderstate/:mail', (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query['Order_id'] = req.params.mail;

  const updateRecord = {
    Current_state: req.body.Current_state,
    Reject_reason: req.body.Reject_reason,
  };

  Order.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/********************************************************* PROVISOIRE ****************************************************/
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
 *  - name: Customer
 *    description: Store operations
 *  - name: Category
 *    description: Store operations
 *  - name: Tax
 *    description: Store operations
 *  - name: Item
 *    description: Store operations
 *  - name: Menu
 *    description: Store operations
 *  - name: Table
 *    description: Store operations
 *  - name: Order
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
 *                  userid:
 *                      type: string
 *                      example: "01"
 *                  e_mail:
 *                      type: string
 *                      example: "exampleaccount@gmail.com"
 *                  password:
 *                      type: string
 *                      example: "example_secretpassword"
 *                  firstname:
 *                      type: string
 *                      example: "Laurent"
 *                  lastname:
 *                      type: string
 *                      example: "RODIN"
 *              required:
 *                  - e_mail
 *                  - password
 *      responses:
 *          '200':
 *              description: New user created successfully !!!
 */

router.post('/user/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new User({
    userid: req.body.userid,
    e_mail: req.body.e_mail,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

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
router.get('/user', (req, res) => {
  //Select all users: OK
  User.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /user/{Field name}/{info}:
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
 *       enum: ["userid","e_mail"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID or e-mail of the user
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
router.get('/user/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  User.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /user/Update/{Field value}/{info}:
 *    put:
 *      tags: [User]
 *      summary: Update user info
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["userid","e_mail"]
 *            required: true
 *          - name: info
 *            description: User ID or e-mail
 *            in: path
 *            type: string
 *            required: true
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
 *                  firstname:
 *                      type: string
 *                      example: test@gmail.com
 *                  lastname:
 *                      type: string
 *                      example: 12345
 *              required:
 *                  - e_mail
 *                  - password
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/user/update/:tags/:mail', (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query[req.params.tags] = req.params.mail;

  const updateRecord = {
    e_mail: req.body.e_mail,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  User.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /user/delete/{Field name}/{info}:
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
 *       enum: ["userid","e_mail"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID or e-mail of the user
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.delete('/user/delete/:tags/:id', (req, res) => {
  // Delete : Ok
  let query = {};
  query[req.params.tags] = req.params.id;
  User.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The user with the ${req.params.tags} : ${req.params.id} has been deleted from the database.`
    );
  });
});

/******************************************* FIN USER ************************************************/
/******************************************* ADMIN ************************************************/

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
 *                  adminid:
 *                      type: string
 *                      example: "01"
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
 *                  admin_image:
 *                      type: string
 *                      example: ""
 *              required:
 *                  - e_mail
 *                  - password
 *                  - status_acces
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */

router.post('/admin/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Admin({
    adminid: req.body.Adminid,
    e_mail: req.body.e_mail,
    password: req.body.password,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    status_acces: req.body.status_acces,
    admin_image: req.body.admin_image,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

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
router.get('/admin', (req, res) => {
  //Select all users: OK
  Admin.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /admin/{Field name}/{info}:
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
 *       enum: ["adminid","e_mail","lastname","firstname","status_acces"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       required: true
 *       schema:
 *         type: integer
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Administrator not found
 */
router.get('/admin/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Admin.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /admin/Update/{Field value}/{id}:
 *    put:
 *      tags: [Admin]
 *      summary: Update an admin
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["adminid","e_mail"]
 *            required: true
 *          - name: id
 *            description: Admin e-mail
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove all fields that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  e_mail:
 *                      type: string
 *                      example: exampleaccount@gmail.com
 *                  password:
 *                      type: string
 *                      example: ""
 *                  lastname:
 *                      type: string
 *                      example: ""
 *                  firstname:
 *                      type: string
 *                      example: ""
 *                  status_acces:
 *                      type: string
 *                      example: ""
 *                  admin_image:
 *                      type: string
 *                      example: ""
 *              required:
 *                  - e_mail
 *                  - password
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/admin/update/:tags/:email', (req, res) => {
  // Update : De mbola très bien koa
  //  if(!ObjectID.isValid(req.params.id))
  //     return res.status(400).send("ID Unknown : " + req.params.id);

  let query = {};
  query[req.params.tags] = req.params.email;

  const updateRecord = {
    e_mail: req.body.e_mail,
    password: req.body.password,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    status_acces: req.body.status_acces,
    admin_image: req.body.admin_image,
  };

  Admin.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /admin/delete/{Field name}/{info}:
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
 *       enum: ["adminid","e_mail"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: E-mail of the admin
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.delete('/admin/delete/:tags/:id', (req, res) => {
  // Delete : Ok
  let query = {};
  query[req.params.tags] = req.params.id;
  Admin.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The admin with the e-mail : ${req.params.id} has been deleted from the database.`
    );
  });
});

/******************************************* FIN ADMIN ************************************************/
/******************************************* STORE ************************************************/

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
 *                  storeid:
 *                      type: String
 *                      example: ""
 *                  name:
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
 *                          example: supermarket@outlook.fr
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
 *                  - storeid
 *                  - name
 *                  - status
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */

router.post('/store/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Store({
    storeid: req.body.storeid,
    name: req.body.name,
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
    details_company: req.body.details_company,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

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
router.get('/store', (req, res) => {
  //Select all users: OK
  Store.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
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
router.get('/store/Status', (req, res) => {
  //Select one article : OK
  // SELECT storeid, name, status from store
  Store.find({}, { _id: 0, storeid: 1, name: 1, status: 1 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /store/{Field name}/{info}:
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
 *     - name: info
 *       in: path
 *       type: string
 *       description: Value of the store to return
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
router.get('/store/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Store.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
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

router.put('/store/update/:tags/:storeid', (req, res) => {
  // Update : De mbola très bien koa
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
    details_company: req.body.details_company,
  };

  let query = {};
  query[req.params.tags] = req.params.storeid;

  Store.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /store/delete/{Field name}/{info}:
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
 *     - name: info
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
router.delete('/store/delete/:tags/:id', (req, res) => {
  // Delete : Ok
  let query = {};
  query[req.params.tags] = req.params.id;
  Store.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The store with the ID : ${req.params.id} has been deleted from the database.`
    );
  });
});

/******************************************* FIN STORE ************************************************/
/******************************************* CUSTOMER ************************************************/

/**
 * @swagger
 * /customer/add/:
 *    post:
 *      tags: [Customer]
 *      summary: Add a new customer
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  customerid:
 *                      type: string
 *                      example: ""
 *                  company_description:
 *                      type: string
 *                      example: ""
 *                  firstname:
 *                      type: string
 *                      example: ""
 *                  lastname:
 *                      type: string
 *                      example: ""
 *                  e_mail:
 *                      type: string
 *                      example: ""
 *                  phone_one:
 *                      type: string
 *                      example: ""
 *                  phone_two:
 *                      type: string
 *                      example: ""
 *                  tax_identifier:
 *                      type: string
 *                      example: ""
 *                  adresse_one:
 *                      type: string
 *                      example: ""
 *                  adresse_two:
 *                      type: string
 *                      example: ""
 *                  zip_code:
 *                      type: string
 *                      example: ""
 *                  city_description:
 *                      type: string
 *                      example: ""
 *                  state_description:
 *                      type: string
 *                      example: ""
 *                  mail_notification:
 *                      type: boolean
 *                      example: "false"
 *              required:
 *                  - company_description
 *                  - firstname
 *                  - lasttname
 *      responses:
 *          '200':
 *              description: New customer created successfully !!!
 */

router.post('/customer/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Customer({
    customerid: req.body.customerid,
    company_description: req.body.company_description,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    e_mail: req.body.e_mail,
    phone_one: req.body.phone_one,
    phone_two: req.body.phone_two,
    tax_identifier: req.body.tax_identifier,
    adresse_one: req.body.adresse_one,
    adresse_two: req.body.adresse_two,
    zip_code: req.body.zip_code,
    city_description: req.body.city_description,
    state_description: req.body.state_description,
    mail_notification: req.body.mail_notification,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /customer:
 *   get:
 *    tags: [Customer]
 *    summary : List all users
 *    security:
 *       - ApiKeyAuth: []
 *    description: Fetch the list of users
 *    responses:
 *      '200':
 *          description : A successful response
 */
router.get('/customer', (req, res) => {
  //Select all users: OK
  Customer.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /customer/{Field name}/{info}:
 *   get:
 *    tags: [Customer]
 *    summary : Find user by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["customerid","e_mail","company_description"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID of the user
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.get('/customer/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Customer.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /customer/Update/{email}/{info}:
 *    put:
 *      tags: [Customer]
 *      summary: Update user info
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: email
 *            description: User e-mail
 *            in: path
 *            type: string
 *            enum: ["customerid","e_mail","company_description"]
 *            required: true
 *          - name: info
 *            in: path
 *            type: string
 *            description: info of the user
 *            required: true
 *          - name: requestBody
 *            description: Remove the field that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  company_description:
 *                      type: string
 *                      example: ""
 *                  firstname:
 *                      type: string
 *                      example: ""
 *                  lastname:
 *                      type: string
 *                      example: ""
 *                  e_mail:
 *                      type: string
 *                      example: ""
 *                  phone_one:
 *                      type: string
 *                      example: ""
 *                  phone_two:
 *                      type: string
 *                      example: ""
 *                  tax_identifier:
 *                      type: string
 *                      example: ""
 *                  adresse_one:
 *                      type: string
 *                      example: ""
 *                  adresse_two:
 *                      type: string
 *                      example: ""
 *                  zip_code:
 *                      type: string
 *                      example: ""
 *                  city_description:
 *                      type: string
 *                      example: ""
 *                  state_description:
 *                      type: string
 *                      example: ""
 *                  mail_notification:
 *                      type: boolean
 *                      example: ""
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/customer/update/:mail', (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query['e_mail'] = req.params.mail;

  //   if(!ObjectID.isValid(req.params.id))
  //     return res.status(400).send("ID Unknown : " + req.params.id);
  const updateRecord = {
    company_description: req.body.company_description,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    e_mail: req.body.e_mail,
    phone_one: req.body.phone_one,
    phone_two: req.body.phone_two,
    tax_identifier: req.body.tax_identifier,
    adresse_one: req.body.adresse_one,
    adresse_two: req.body.adresse_two,
    zip_code: req.body.zip_code,
    city_description: req.body.city_description,
    state_description: req.body.state_description,
    mail_notification: req.body.mail_notification,
  };

  Customer.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /customer/delete/{Field name}/{info}:
 *   delete:
 *    tags: [Customer]
 *    summary : Remove a customer
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a customer
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["e_mail","company_description"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: E-mail of the customer
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Items not found
 */
router.delete('/customer/delete/:tags/:id', (req, res) => {
  // Delete : Ok
  let query = {};
  query[req.params.tags] = req.params.id;
  Customer.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The user with the ${req.params.tags} : ${req.params.id} has been deleted from the database.`
    );
  });
});

/******************************************* FIN CUSTOMER ************************************************/
/******************************************* CATEGORIE************************************************/

/**
 * @swagger
 * /category/add/:
 *    post:
 *      tags: [Category]
 *      summary: Add a new item category
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  category_id:
 *                      type: string
 *                      example: "CAT001"
 *                  category_title:
 *                      type: string
 *                      example: ""
 *                  category_description:
 *                      type: string
 *                      example: ""
 *      responses:
 *          '200':
 *              description: New category created successfully !!!
 *          '400':
 *              description: Invalid ID
 */

router.post('/category/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Categorie({
    category_id: req.body.category_id,
    category_title: req.body.category_title,
    category_description: req.body.category_description,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /category:
 *   get:
 *    tags: [Category]
 *    summary : List all categories
 *    security:
 *       - ApiKeyAuth: []
 *    description: Fetch the list of categories
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Category not found
 */
router.get('/category', (req, res) => {
  //Select all categories: OK
  Categorie.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /category/{Field name}/{info}:
 *   get:
 *    tags: [Category]
 *    summary : Find category by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["category_id","category_title"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID or title of the category
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Category not found
 */
router.get('/category/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Categorie.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /category/Update/{Field value}/{info}:
 *    put:
 *      tags: [Category]
 *      summary: Update user info
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["category_id","category_title"]
 *            required: true
 *          - name: info
 *            description: ID or e-mail of the category
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove the field that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  category_title:
 *                      type: string
 *                      example: ""
 *                  category_description:
 *                      type: string
 *                      example: ""
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/category/update/:tags/:mail', (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query[req.params.tags] = req.params.mail;

  const updateRecord = {
    category_title: req.body.category_title,
    category_description: req.body.category_description,
  };

  Categorie.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /category/delete/{Field name}/{info}:
 *   delete:
 *    tags: [Category]
 *    summary : Remove a category
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a category
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["category_id","category_title"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID or e-mail of the category
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Category not found
 */
router.delete('/category/delete/:tags/:id', (req, res) => {
  // Delete : Ok
  let query = {};
  query[req.params.tags] = req.params.id;
  Categorie.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The category with the ${req.params.tags} : ${req.params.id} has been deleted from the database.`
    );
  });
});

/************************************************** FIN CATEGORIE*****************************************/

/******************************************************TAX************************************************/

/**
 * @swagger
 * /tax/add/:
 *    post:
 *      tags: [Tax]
 *      summary: Add a new tax
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  taxid:
 *                      type: string
 *                      example: "T055"
 *                  taxtitle:
 *                      type: string
 *                      example: "Autres"
 *                  taxrate:
 *                      type: string
 *                      example: "5.5"
 *      responses:
 *          '200':
 *              description: New category created successfully !!!
 *          '400':
 *              description: Invalid ID
 */

router.post('/tax/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Tax({
    taxid: req.body.taxid,
    taxtitle: req.body.taxtitle,
    taxrate: req.body.taxrate,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /tax:
 *   get:
 *    tags: [Tax]
 *    summary : List all taxes
 *    security:
 *       - ApiKeyAuth: []
 *    description: Fetch the list of taxes
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Category not found
 */
router.get('/tax', (req, res) => {
  //Select all categories: OK
  Tax.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /tax/{Field name}/{info}:
 *   get:
 *    tags: [Tax]
 *    summary : Find tax by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["taxid","taxrate"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       description: Id, rate or title of the tax
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Tax not found
 */
router.get('/tax/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Tax.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /tax/Update/{Field value}/{info}:
 *    put:
 *      tags: [Tax]
 *      summary: Update tax info
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["taxid","taxrate"]
 *            required: true
 *          - name: info
 *            description: ID, title or rate of the tax
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove the field that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  taxtitle:
 *                      type: string
 *                      example: ""
 *                  taxrate:
 *                      type: integer
 *                      example: 20
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/tax/update/:tags/:mail', (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query[req.params.tags] = req.params.mail;

  const updateRecord = {
    taxtitle: req.body.taxtitle,
    taxrate: req.body.taxrate,
  };

  Tax.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /tax/delete/{Field name}/{info}:
 *   delete:
 *    tags: [Tax]
 *    summary : Remove a tax
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a tax
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["taxid","taxrate"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: Id, title or rate of the tax
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid info
 *      '404':
 *          description: Category not found
 */
router.delete('/tax/delete/:tags/:id', (req, res) => {
  // Delete : Ok
  let query = {};
  query[req.params.tags] = req.params.id;
  Tax.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The category with the ${req.params.tags} : ${req.params.id} has been deleted from the database.`
    );
  });
});

/************************************************** FIN TAX*****************************************/

/****************************************************** ITEM ************************************************/

/**
 * @swagger
 * /item/add/:
 *    post:
 *      tags: [Item]
 *      summary: Add a new item
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  itemid:
 *                      type: string
 *                      example: "IT001"
 *                  image_url:
 *                      type: string
 *                  item_type:
 *                      type: string
 *                      example: "Menu ou Simple"
 *                  description:
 *                      type: object
 *                      properties:
 *                          translations:
 *                              type: object
 *                              properties:
 *                                  en_us:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr_fra:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr-can:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                  title:
 *                      type: object
 *                      properties:
 *                          translations:
 *                              type: object
 *                              properties:
 *                                  en_us:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr_fra:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr-can:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                  list_items:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              item_id:
 *                                  type: string
 *                                  example: "IT001"
 *                              item_quantity:
 *                                  type: string
 *                                  example: "1"
 *                              quantity_type:
 *                                  type: string
 *                                  example: "Fixed"
 *                              max_permitted:
 *                                  type: string
 *                                  example: "2"
 *                              is_main_item:
 *                                  type: boolean
 *                                  example: true
 *                  suspension_info:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: supermarket@outlook.fr
 *                  item_category:
 *                      type: string
 *                      example: "CAT001"
 *                  categories_menu:
 *                      type: array
 *                      items:
 *                           type: string
 *                           example: "CAT001"
 *                  diplay_options:
 *                      type: object
 *                  service_availability:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              day_of_week:
 *                                  type: string
 *                                  example: "Monday"
 *                              time_period:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          start_time:
 *                                            type: string
 *                                            example: "00:00:00"
 *                                          end_time:
 *                                            type: string
 *                                            example: "00:00:00"
 *                  entities:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              entities_type:
 *                                  type: string
 *                                  example: ""
 *                              entities_id:
 *                                  type: string
 *                                  example: ""
 *                  storage_info:
 *                      type: object
 *                      properties:
 *                          min_stock:
 *                              type: string
 *                              example: "5"
 *                          max_stock:
 *                              type: string
 *                              example: "50"
 *                          current_stock:
 *                              type: string
 *                              example: "25"
 *                  price_info:
 *                      type: object
 *                      properties:
 *                          price_take_away:
 *                              type: string
 *                              example: "1300"
 *                          price_ht:
 *                              type: string
 *                              example: "20"
 *                          price_ttc:
 *                              type: string
 *                              example: "25"
 *                          price_cost:
 *                              type: string
 *                              example: "18"
 *                          overrides:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  example: ""
 *                  tax_info:
 *                      type: object
 *                      properties:
 *                          tax_id:
 *                              type: string
 *                              example: "T20"
 *                          tax_rate:
 *                              type: string
 *                              example: "20"
 *                          vat_rate_percentage:
 *                              type: string
 *                              example: ""
 *                  nutritional_info:
 *                      type: object
 *                      properties:
 *                          kilojoules:
 *                              type: string
 *                              example: "T20"
 *                          calories:
 *                              type: string
 *                              example: "20"
 *                  dish_info:
 *                      type: object
 *                      properties:
 *                          classifications:
 *                              type: object
 *                              properties:
 *                                  instructions_for_use:
 *                                      type: string
 *                                  ingredients:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                  dietary_label_info:
 *                                      type: object
 *                                      properties:
 *                                          dietary_label_info_labels:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                  beverage_info:
 *                      type: object
 *                      properties:
 *                          caffeine_amount:
 *                              type: string
 *                          alcohol_by_volume:
 *                              type: string
 *                          coffee_info:
 *                              type: object
 *                              properties:
 *                                  coffee_bean_origin:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                  product_info:
 *                      type: object
 *                      properties:
 *                          product_type:
 *                              type: string
 *                          product_traits:
 *                              type: string
 *                          product_info:
 *                              type: object
 *                              properties:
 *                                  target_market:
 *                                      type: string
 *                                  gtin:
 *                                      type: string
 *                  external_id:
 *                      type: string
 *                  external_data:
 *                      type: string
 *                  authorize_change:
 *                      type: boolean
 *                      example: false
 *                  qr_code:
 *                      type: string
 *                  item_discount:
 *                      type: string
 *                  item_preparation:
 *                      type: string
 *      responses:
 *          '200':
 *              description: New category created successfully !!!
 *          '400':
 *              description: Invalid ID
 */

router.post('/item/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Item({
    itemid: req.body.itemid,
    image_url: req.body.image_url,
    item_type: req.body.item_type,
    description: req.body.description,
    title: req.body.title,
    list_items: req.body.list_items,
    suspension_info: req.body.suspension_info,
    item_category: req.body.item_category,
    categories_menu: req.body.categories_menu,
    diplay_options: req.body.diplay_options,
    service_availability: req.body.service_availability,
    entities: req.body.entities,
    storage_info: req.body.storage_info,
    price_info: req.body.price_info,
    tax_info: req.body.tax_info,
    nutritional_info: req.body.nutritional_info,
    dish_info: req.body.dish_info,
    beverage_info: req.body.beverage_info,
    product_info: req.body.product_info,
    external_id: req.body.external_id,
    external_data: req.body.external_data,
    authorize_change: req.body.authorize_change,
    qr_code: req.body.qr_code,
    item_discount: req.body.item_discount,
    item_preparation: req.body.item_discount,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /item:
 *   get:
 *    tags: [Item]
 *    summary : List all items
 *    security:
 *       - ApiKeyAuth: []
 *    description: Fetch the list of items
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Item not found
 */
router.get('/item', (req, res) => {
  //Select all categories: OK
  Item.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /item/{Field name}/{info}:
 *   get:
 *    tags: [Item]
 *    summary : Find item by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["itemid"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       description: Id or title of the item
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Tax not found
 */
router.get('/item/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Item.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

router.get('/item/image_url', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Item.find({}, { image_url: 1, itemid: 1 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /item/Update/{Field value}/{info}:
 *    put:
 *      tags: [Item]
 *      summary: Update tax info
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["itemid"]
 *            required: true
 *          - name: info
 *            description: ID, title or rate of the tax
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove the field that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  image_url:
 *                      type: string
 *                  item_type:
 *                      type: string
 *                      example: "Menu ou Simple"
 *                  description:
 *                      type: object
 *                      properties:
 *                          translations:
 *                              type: object
 *                              properties:
 *                                  en_us:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr_fra:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr-can:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                  title:
 *                      type: object
 *                      properties:
 *                          translations:
 *                              type: object
 *                              properties:
 *                                  en_us:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr_fra:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                                  fr-can:
 *                                      type: String
 *                                      example: "Coca-cola"
 *                  list_items:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              item_id:
 *                                  type: string
 *                                  example: "IT001"
 *                              item_quantity:
 *                                  type: string
 *                                  example: "1"
 *                              quantity_type:
 *                                  type: string
 *                                  example: "Fixed"
 *                              max_permitted:
 *                                  type: string
 *                                  example: "2"
 *                              is_main_item:
 *                                  type: boolean
 *                                  example: true
 *                  suspension_info:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: supermarket@outlook.fr
 *                  item_category:
 *                      type: string
 *                      example: "CAT001"
 *                  categories_menu:
 *                      type: array
 *                      items:
 *                           type: string
 *                           example: "CAT001"
 *                  diplay_options:
 *                      type: object
 *                  service_availability:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              day_of_week:
 *                                  type: string
 *                                  example: "Monday"
 *                              time_period:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          start_time:
 *                                            type: string
 *                                            example: "00:00:00"
 *                                          end_time:
 *                                            type: string
 *                                            example: "00:00:00"
 *                  entities:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              entities_type:
 *                                  type: string
 *                                  example: ""
 *                              entities_id:
 *                                  type: string
 *                                  example: ""
 *                  storage_info:
 *                      type: object
 *                      properties:
 *                          min_stock:
 *                              type: string
 *                              example: "5"
 *                          max_stock:
 *                              type: string
 *                              example: "50"
 *                          current_stock:
 *                              type: string
 *                              example: "25"
 *                  price_info:
 *                      type: object
 *                      properties:
 *                          price_take_away:
 *                              type: string
 *                              example: "1300"
 *                          price_ht:
 *                              type: string
 *                              example: "20"
 *                          price_ttc:
 *                              type: string
 *                              example: "25"
 *                          price_cost:
 *                              type: string
 *                              example: "18"
 *                          overrides:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  example: ""
 *                  tax_info:
 *                      type: object
 *                      properties:
 *                          tax_id:
 *                              type: string
 *                              example: "T20"
 *                          tax_rate:
 *                              type: string
 *                              example: "20"
 *                          vat_rate_percentage:
 *                              type: string
 *                              example: ""
 *                  nutritional_info:
 *                      type: object
 *                      properties:
 *                          kilojoules:
 *                              type: string
 *                              example: "T20"
 *                          calories:
 *                              type: string
 *                              example: "20"
 *                  dish_info:
 *                      type: object
 *                      properties:
 *                          classifications:
 *                              type: object
 *                              properties:
 *                                  instructions_for_use:
 *                                      type: string
 *                                  ingredients:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                  dietary_label_info:
 *                                      type: object
 *                                      properties:
 *                                          dietary_label_info_labels:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                  beverage_info:
 *                      type: object
 *                      properties:
 *                          caffeine_amount:
 *                              type: string
 *                          alcohol_by_volume:
 *                              type: string
 *                          coffee_info:
 *                              type: object
 *                              properties:
 *                                  coffee_bean_origin:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                  product_info:
 *                      type: object
 *                      properties:
 *                          product_type:
 *                              type: string
 *                          product_traits:
 *                              type: string
 *                          product_info:
 *                              type: object
 *                              properties:
 *                                  target_market:
 *                                      type: string
 *                                  gtin:
 *                                      type: string
 *                  external_id:
 *                      type: string
 *                  external_data:
 *                      type: string
 *                  authorize_change:
 *                      type: boolean
 *                      example: false
 *                  qr_code:
 *                      type: string
 *                  item_discount:
 *                      type: string
 *                  item_preparation:
 *                      type: string
 *      responses:
 *          '200':
 *              description: New category created successfully !!!
 *          '400':
 *              description: Invalid ID
 */

router.put('/item/update/:tags/:mail', (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query[req.params.tags] = req.params.mail;

  const updateRecord = {
    image_url: req.body.image_url,
    item_type: req.body.item_type,
    description: req.body.description,
    title: req.body.title,
    list_items: req.body.list_items,
    suspension_info: req.body.suspension_info,
    item_category: req.body.item_category,
    categories_menu: req.body.categories_menu,
    diplay_options: req.body.diplay_options,
    service_availability: req.body.service_availability,
    entities: req.body.entities,
    storage_info: req.body.storage_info,
    price_info: req.body.price_info,
    tax_info: req.body.tax_info,
    nutritional_info: req.body.nutritional_info,
    dish_info: req.body.dish_info,
    beverage_info: req.body.beverage_info,
    product_info: req.body.product_info,
    external_id: req.body.external_id,
    external_data: req.body.external_data,
    authorize_change: req.body.authorize_change,
    qr_code: req.body.qr_code,
    item_discount: req.body.item_discount,
    item_preparation: req.body.item_discount,
  };

  Item.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /item/delete/{Field name}/{info}:
 *   delete:
 *    tags: [Item]
 *    summary : Remove a tax
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a tax
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["itemid"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: Id, title or rate of the tax
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid info
 *      '404':
 *          description: Category not found
 */
router.delete('/item/delete/:tags/:id', (req, res) => {
  // Delete : Ok
  let query = {};
  query[req.params.tags] = req.params.id;
  Item.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The category with the ${req.params.tags} : ${req.params.id} has been deleted from the database.`
    );
  });
});

/************************************************** FIN ITEM*****************************************/
/************************************************** MENU *****************************************/

/**
 *  @swagger
 * paths:
 *  /menu:
 *   get:
 *    tags: [Menu]
 *    summary : List all menus
 *    security:
 *       - ApiKeyAuth: []
 *    description: Fetch the list of menus
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Menu not found
 */
router.get('/menu', (req, res) => {
  //Select all categories: OK
  Item.find({ item_type: 'Menu' }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/************************************************** FIN MENU*****************************************/

/******************************************* TABLE ************************************************/

/**
 * @swagger
 * /table/add/:
 *    post:
 *      tags: [Table]
 *      summary: Add a new table
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  table_id:
 *                      type: string
 *                      example: "01"
 *                  table_name:
 *                      type: string
 *                      example: "Rancard"
 *                  table_size:
 *                      type: string
 *                      example: "4"
 *                  store_id:
 *                      type: string
 *                      example: "ST001"
 *                  is_reserved:
 *                      type: boolean
 *                      example: false
 *                  table_booking:
 *                      type: object
 *                      properties:
 *                          cost_booking_ht:
 *                              type: string
 *                              example: "10"
 *                          cost_booking_ttc:
 *                              type: string
 *                              example: "12"
 *                          time_booking:
 *                              type: string
 *                              example: "00:00"
 *                          tax_info:
 *                              type: object
 *                              properties:
 *                                  tax_id:
 *                                      type: string
 *                                      example: T055
 *                                  tax_rate:
 *                                      type: string
 *                                      example: "5.5"
 *                  is_free:
 *                      type: boolean
 *                      example: true
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */

router.post('/table/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Table({
    table_id: req.body.table_id,
    table_name: req.body.table_name,
    table_size: req.body.table_size,
    store_id: req.body.store_id,
    is_reserved: req.body.is_reserved,
    table_booking: req.body.table_booking,
    is_free: req.body.is_free,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /table:
 *   get:
 *    tags: [Table]
 *    summary : List all tables
 *    security:
 *      - ApiKeyAuth: []
 *    description: Fetch the list of administrators
 *    responses:
 *      '200':
 *          description : A successful response
 */
router.get('/table', (req, res) => {
  //Select all users: OK
  Table.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /table/{Field name}/{info}:
 *   get:
 *    tags: [Table]
 *    summary : Find table by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["table_id","table_name","store_id","is_reserved","is_free"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       required: true
 *       schema:
 *         type: integer
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Table not found
 */
router.get('/table/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Table.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /table/Update/{Field value}/{id}:
 *    put:
 *      tags: [Table]
 *      summary: Update an admin
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["table_id","table_name"]
 *            required: true
 *          - name: id
 *            description: ID or name of the table
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove all fields that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  table_name:
 *                      type: string
 *                      example: "Rancard"
 *                  table_size:
 *                      type: string
 *                      example: "4"
 *                  store_id:
 *                      type: string
 *                      example: "ST001"
 *                  is_reserved:
 *                      type: boolean
 *                      example: false
 *                  table_booking:
 *                      type: object
 *                      properties:
 *                          cost_booking_ht:
 *                              type: string
 *                              example: "10"
 *                          cost_booking_ttc:
 *                              type: string
 *                              example: "12"
 *                          time_booking:
 *                              type: string
 *                              example: "00:00"
 *                          tax_info:
 *                              type: object
 *                              properties:
 *                                  tax_id:
 *                                      type: string
 *                                      example: T055
 *                                  tax_rate:
 *                                      type: string
 *                                      example: "5.5"
 *                  is_free:
 *                      type: boolean
 *                      example: true
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/table/update/:tags/:email', (req, res) => {
  // Update : De mbola très bien koa
  //  if(!ObjectID.isValid(req.params.id))
  //     return res.status(400).send("ID Unknown : " + req.params.id);

  let query = {};
  query[req.params.tags] = req.params.email;

  const updateRecord = {
    table_id: req.body.table_id,
    table_name: req.body.table_name,
    table_size: req.body.table_size,
    store_id: req.body.store_id,
    is_reserved: req.body.is_reserved,
    table_booking: req.body.table_booking,
    is_free: req.body.is_free,
  };

  Table.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /table/delete/{Field name}/{info}:
 *   delete:
 *    tags: [Table]
 *    summary : Remove a table
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a table
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["table_id","table_name"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID or name of the table to remove
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Table not found
 */
router.delete('/table/delete/:tags/:id', (req, res) => {
  let query = {};
  query[req.params.tags] = req.params.id;
  Admin.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The table with the e-mail : ${req.params.id} has been deleted from the database.`
    );
  });
});

/******************************************* FIN TABLE ************************************************/
/*******************************************DEBUT ORDER ********************************************* */
/**
 *  @swagger
 * paths:
 *  /order_details/list:
 *   get:
 *    tags: [Order]
 *    summary : List all orders
 *    security:
 *       - ApiKeyAuth: []
 *    description: Fetch the list of orders
 *    responses:
 *      '200':
 *          description : A successful response
 */
router.get('/order_details/list', (req, res) => {
  //Select all users: OK
  Order_detail.find({}, { _id: 0 }, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /order_details/add/:
 *    post:
 *      tags: [Order]
 *      summary: Add a new table
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      example: "01"
 *                  display_id:
 *                      type: string
 *                      example: "Rancard"
 *                  external_reference_id:
 *                      type: string
 *                      example: "4"
 *                  number:
 *                      type: string
 *                      example: "ST001"
 *                  current_state:
 *                      type: string
 *                      example: "Created"
 *                  rating:
 *                      type: object
 *                      properties:
 *                          rating_note:
 *                              type: string
 *                              example: "10"
 *                          rating_rate:
 *                              type: string
 *                              example: "Very good"
 *                  store:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: "10"
 *                          name:
 *                              type: string
 *                              example: "12"
 *                          store_id:
 *                              type: string
 *                              example: "00:00"
 *                          partner_table_id:
 *                              type: string
 *                              example: "10"
 *                          venue_order_id:
 *                              type: string
 *                              example: "12"
 *                          number_of_Guest_id:
 *                              type: string
 *                              example: "00:00"
 *                          external_reference_id:
 *                              type: string
 *                              example: "00:00"
 *                          integrator_store_id:
 *                              type: string
 *                              example: "10"
 *                          integrator_brand_id:
 *                              type: string
 *                              example: "12"
 *                          merchant_store_id:
 *                              type: string
 *                              example: "00:00"
 *                  eater:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                              example: "10"
 *                          phone:
 *                              type: string
 *                              example: "12"
 *                          phone_code:
 *                              type: string
 *                              example: "00:00"
 *                  eaters:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  example: "IT001"
 *                              first_name:
 *                                  type: string
 *                                  example: "1"
 *                  cart:
 *                      type: object
 *                      properties:
 *                          items_list:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                          example: "IT001"
 *                                      instance_id:
 *                                          type: string
 *                                          example: "1"
 *                                      title:
 *                                          type: string
 *                                          example: "IT001"
 *                                      external_data:
 *                                          type: string
 *                                          example: "1"
 *                                      quantity:
 *                                          type: string
 *                                          example: "1"
 *                                      price:
 *                                          type: object
 *                                          properties:
 *                                              unit_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              total_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              base_unit_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              base_total_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              taxInfo:
 *                                                  type: array
 *                                                  items:
 *                                                      type: string
 *
 *                                      selected_modifier_groups:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: string
 *                                                      example: "IT001"
 *                                                  title:
 *                                                      type: string
 *                                                      example: "1"
 *                                                  external_data:
 *                                                      type: string
 *                                                      example: "1"
 *                                                  selected_items:
 *                                                      type: array
 *                                                      items:
 *                                                          type: object
 *                                                          properties:
 *                                                              id:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              title:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              external_data:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              quantity:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              price:
 *                                                                  type: object
 *                                                                  properties:
 *                                                                      unit_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                      total_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                      base_unit_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                      base_total_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                              default_quantity:
 *                                                                  type: string
 *                                                                  example: "0"
 *                                                  removed_items:
 *                                                      type: string
 *                                                      example: "1"
 *                                      eater_id:
 *                                          type: string
 *                                          example: "1"
 *                  employee_id:
 *                      type: object
 *                      properties:
 *                          employee_store_id:
 *                              type: string
 *                              example: "10"
 *                          name_employee_id:
 *                              type: string
 *                              example: "12"
 *                  payment:
 *                      type: object
 *                      properties:
 *                          placed_at:
 *                              type: string
 *                              example: "10"
 *                          closed_at:
 *                              type: string
 *                              example: "12"
 *                          partner_payment_id:
 *                              type: string
 *                              example: "10"
 *                          venue_payment_id:
 *                              type: string
 *                              example: "12"
 *                          payment_type_id:
 *                              type: string
 *                              example: "10"
 *                          tips:
 *                              type: string
 *                              example: "12"
 *                          charges:
 *                              type: object
 *                              properties:
 *                                  total:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  sub_total:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  tax:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  total_fee:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  cash_amount_due:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */

router.post('/order_details/add', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Order_detail({
    id: req.body.id,
    display_id: req.body.display_id,
    external_reference_id: req.body.external_reference_id,
    number: req.body.number,
    current_state: req.body.current_state,
    rating: req.body.rating,
    store: req.body.store,
    eater: req.body.eater,
    eaters: req.body.eaters,
    cart: req.body.cart,
    employee_id: req.body.employee_id,
    payment: req.body.payment,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 * @swagger
 * /order_details/update/{Field value}/{id}:
 *    put:
 *      tags: [Order]
 *      summary: Update an Order
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["id"]
 *            required: true
 *          - name: id
 *            description: ID of the Order
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove all fields that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      example: "01"
 *                  display_id:
 *                      type: string
 *                      example: "Rancard"
 *                  external_reference_id:
 *                      type: string
 *                      example: "4"
 *                  number:
 *                      type: string
 *                      example: "ST001"
 *                  current_state:
 *                      type: string
 *                      example: "Created"
 *                  rating:
 *                      type: string
 *                      example: "8.2"
 *                  store:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: "10"
 *                          name:
 *                              type: string
 *                              example: "12"
 *                          store_id:
 *                              type: string
 *                              example: "00:00"
 *                          partner_table_id:
 *                              type: string
 *                              example: "10"
 *                          venue_order_id:
 *                              type: string
 *                              example: "12"
 *                          number_of_Guest_id:
 *                              type: string
 *                              example: "00:00"
 *                          external_reference_id:
 *                              type: string
 *                              example: "00:00"
 *                          integrator_store_id:
 *                              type: string
 *                              example: "10"
 *                          integrator_brand_id:
 *                              type: string
 *                              example: "12"
 *                          merchant_store_id:
 *                              type: string
 *                              example: "00:00"
 *                  eater:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                              example: "10"
 *                          phone:
 *                              type: string
 *                              example: "12"
 *                          phone_code:
 *                              type: string
 *                              example: "00:00"
 *                  eaters:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  example: "IT001"
 *                              first_name:
 *                                  type: string
 *                                  example: "1"
 *                  cart:
 *                      type: object
 *                      properties:
 *                          items_list:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                          example: "IT001"
 *                                      instance_id:
 *                                          type: string
 *                                          example: "1"
 *                                      title:
 *                                          type: string
 *                                          example: "IT001"
 *                                      external_data:
 *                                          type: string
 *                                          example: "1"
 *                                      quantity:
 *                                          type: string
 *                                          example: "1"
 *                                      price:
 *                                          type: object
 *                                          properties:
 *                                              unit_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              total_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              base_unit_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              base_total_price:
 *                                                  type: object
 *                                                  properties:
 *                                                      amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      currency_code:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                                      formatted_amount:
 *                                                          type: string
 *                                                          example: "IT001"
 *                                              taxInfo:
 *                                                  type: array
 *                                                  items:
 *                                                      type: string
 *
 *                                      selected_modifier_groups:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: string
 *                                                      example: "IT001"
 *                                                  title:
 *                                                      type: string
 *                                                      example: "1"
 *                                                  external_data:
 *                                                      type: string
 *                                                      example: "1"
 *                                                  selected_items:
 *                                                      type: array
 *                                                      items:
 *                                                          type: object
 *                                                          properties:
 *                                                              id:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              title:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              external_data:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              quantity:
 *                                                                  type: string
 *                                                                  example: "IT001"
 *                                                              price:
 *                                                                  type: object
 *                                                                  properties:
 *                                                                      unit_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                      total_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                      base_unit_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                      base_total_price:
 *                                                                          type: object
 *                                                                          properties:
 *                                                                              amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              currency_code:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                                              formatted_amount:
 *                                                                                  type: string
 *                                                                                  example: "IT001"
 *                                                              default_quantity:
 *                                                                  type: string
 *                                                                  example: "0"
 *                                                  removed_items:
 *                                                      type: string
 *                                                      example: "1"
 *                                      eater_id:
 *                                          type: string
 *                                          example: "1"
 *                  employee_id:
 *                      type: object
 *                      properties:
 *                          employee_store_id:
 *                              type: string
 *                              example: "10"
 *                          name_employee_id:
 *                              type: string
 *                              example: "12"
 *                  payment:
 *                      type: object
 *                      properties:
 *                          placed_at:
 *                              type: string
 *                              example: "10"
 *                          closed_at:
 *                              type: string
 *                              example: "12"
 *                          partner_payment_id:
 *                              type: string
 *                              example: "10"
 *                          venue_payment_id:
 *                              type: string
 *                              example: "12"
 *                          payment_type_id:
 *                              type: string
 *                              example: "10"
 *                          tips:
 *                              type: string
 *                              example: "12"
 *                          charges:
 *                              type: object
 *                              properties:
 *                                  total:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  sub_total:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  tax:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  total_fee:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                  cash_amount_due:
 *                                      type: object
 *                                      properties:
 *                                           amount:
 *                                               type: string
 *                                               example: "IT001"
 *                                           currency_code:
 *                                               type: string
 *                                               example: "IT001"
 *                                           formatted_amount:
 *                                               type: string
 *                                               example: "IT001"
 *      responses:
 *          '200':
 *              description: New admin created successfully !!!
 */

router.put('/order_details/update/:tags/:email', (req, res) => {
  //Insert : Très bien koa

  let query = {};
  query[req.params.tags] = req.params.email;

  const updateRecord = {
    display_id: req.body.display_id,
    external_reference_id: req.body.external_reference_id,
    number: req.body.number,
    current_state: req.body.current_state,
    rating: req.body.rating,
    store: req.body.store,
    eater: req.body.eater,
    eaters: req.body.eaters,
    cart: req.body.cart,
    employee_id: req.body.employee_id,
    payment: req.body.payment,
  };

  Order_detail.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});
/**
 * @swagger
 *  /order_details/delete/{Field name}/{info}:
 *   delete:
 *    tags: [Order]
 *    summary : Remove a QrCode
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a QrCode
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["id"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID of the QrCode to remove
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: QrCode not found
 */
router.delete('/order_details/delete/:tags/:id', (req, res) => {
  let query = {};
  query[req.params.tags] = req.params.id;
  Order_detail.deleteOne(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The order with the e-mail : ${req.params.id} has been deleted from the database.`
    );
  });
});

/**
 * @swagger
 * /qrcode/add/:
 *    post:
 *      tags: [QrCode]
 *      summary: Add a new QrCode
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  frame_name:
 *                      type: string
 *                      example: "01"
 *                  qr_code_link:
 *                      type: string
 *                      example: "Rancard"
 *                  image_format:
 *                      type: string
 *                      example: "4"
 *                  qr_code_number:
 *                      type: string
 *                      example: "ST001"
 *      responses:
 *          '200':
 *              description: New QrCode created successfully !!!
 */

router.post('/qrcode/add/', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new QrCode({
    frame_name: req.body.frame_name,
    qr_code_link: req.body.qr_code_link,
    image_format: req.body.image_format,
    qr_code_number: req.body.qr_code_number,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /qrcode:
 *   get:
 *    tags: [QrCode]
 *    summary : List all qrcodes
 *    security:
 *      - ApiKeyAuth: []
 *    description: Fetch the list of qrcodes
 *    responses:
 *      '200':
 *          description : A successful response
 */
router.get('/QrCode', (req, res) => {
  //Select all users: OK
  QrCode.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /qrcode/{Field name}/{info}:
 *   get:
 *    tags: [QrCode]
 *    summary : Find QrCode by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["qr_code_number"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       required: true
 *       schema:
 *         type: integer
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: QrCode not found
 */
router.get('/qrcode/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  QrCode.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /qrcode/Update/{Field value}/{id}:
 *    put:
 *      tags: [QrCode]
 *      summary: Update a QrCode
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["qr_code_number"]
 *            required: true
 *          - name: id
 *            description: ID of the QrCode
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove all fields that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  frame_name:
 *                      type: string
 *                      example: "Rancard"
 *                  qr_code_link:
 *                      type: string
 *                      example: "4"
 *                  image_format:
 *                      type: string
 *                      example: "ST001"
 *                  qr_code_number:
 *                      type: string
 *                      example: "ST001"
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/qrcode/update/:tags/:email', (req, res) => {
  // Update : De mbola très bien koa
  //  if(!ObjectID.isValid(req.params.id))
  //     return res.status(400).send("ID Unknown : " + req.params.id);

  let query = {};
  query[req.params.tags] = req.params.email;

  const updateRecord = {
    frame_name: req.body.frame_name,
    qr_code_link: req.body.qr_code_link,
    image_format: req.body.image_format,
  };

  QrCode.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /qrcode/delete/{Field name}/{info}:
 *   delete:
 *    tags: [QrCode]
 *    summary : Remove a QrCode
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a QrCode
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["qr_code_number"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID of the QrCode to remove
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: QrCode not found
 */
router.delete('/qrcode/delete/:tags/:id', (req, res) => {
  let query = {};
  query[req.params.tags] = req.params.id;
  Admin.deleteMany(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The table with the e-mail : ${req.params.id} has been deleted from the database.`
    );
  });
});

/*******************************************DEBUT VENUE************************************************* */

/**
 * @swagger
 * /venue/add/:
 *    post:
 *      tags: [Venue]
 *      summary: Add a new venue
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  venue_code_id:
 *                      type: string
 *                      example: "01"
 *                  venue_api_key_id:
 *                      type: string
 *                      example: "Rancard"
 *      responses:
 *          '200':
 *              description: New venue created successfully !!!
 */

router.post('/venue/add/', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Venue({
    venue_code_id: req.body.venue_code_id,
    venue_api_key_id: req.body.venue_api_key_id,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /venue:
 *   get:
 *    tags: [Venue]
 *    summary : List all venue
 *    security:
 *      - ApiKeyAuth: []
 *    description: Fetch the list of venue
 *    responses:
 *      '200':
 *          description : A successful response
 */
router.get('/Venue', (req, res) => {
  //Select all users: OK
  Venue.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /venue/{Field name}/{info}:
 *   get:
 *    tags: [QrCode]
 *    summary : Find QrCode by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["venue_code_id","venue_api_key_id"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       required: true
 *       schema:
 *         type: integer
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Venue not found
 */
router.get('/venue/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Venue.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 * /venue/Update/{Field value}/{id}:
 *    put:
 *      tags: [Venue]
 *      summary: Update a venue
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: Field value
 *            in: path
 *            type: string
 *            enum: ["venue_code_id","venue_api_key_id"]
 *            required: true
 *          - name: id
 *            description: ID of the venue
 *            in: path
 *            type: string
 *            required: true
 *          - name: requestBody
 *            description: Remove all fields that are not concerned by the change
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  venue_code_id:
 *                      type: string
 *                      example: "Rancard"
 *                  venue_api_key_id:
 *                      type: string
 *                      example: "4"
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put('/venue/update/:email', (req, res) => {
  // Update : De mbola très bien koa
  //  if(!ObjectID.isValid(req.params.id))
  //     return res.status(400).send("ID Unknown : " + req.params.id);

  let query = {};
  query['venue_code_id'] = req.params.email;

  const updateRecord = {
    venue_api_key_id: req.body.venue_api_key_id,
  };

  Venue.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
});

/**
 * @swagger
 *  /venue/delete/{Field name}/{info}:
 *   delete:
 *    tags: [Venue]
 *    summary : Remove a venue
 *    security:
 *     - ApiKeyAuth: []
 *    description: Remove a venue
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["venue_code_id","venue_api_key_id"]
 *       required: true
 *       schema:
 *         type: string
 *     - name: info
 *       in: path
 *       type: string
 *       description: ID of the venue to remove
 *       required: true
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid ID
 *      '404':
 *          description: Venue not found
 */
router.delete('/qrcode/delete/:tags/:id', (req, res) => {
  let query = {};
  query[req.params.tags] = req.params.id;
  Venue.deleteOne(query, function (err, obj) {
    if (err) throw err;
    res.send(
      `The venue with the e-mail : ${req.params.id} has been deleted from the database.`
    );
  });
});

/*******************************************DEBUT REVIEW************************************************ */

/**
 * @swagger
 * /review/add/:
 *    post:
 *      tags: [Review]
 *      summary: Add a new review by
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - name: requestBody
 *            description: request body
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  store_id:
 *                      type: string
 *                      example: "01"
 *                  first_name:
 *                      type: string
 *                      example: "Rancard"
 *                  last_name:
 *                      type: string
 *                      example: "01"
 *                  email:
 *                      type: string
 *                      example: "Rancard"
 *                  phone_number:
 *                      type: string
 *                      example: "01"
 *                  rating:
 *                      type: string
 *                      example: "Rancard"
 *                  rating_rate:
 *                      type: string
 *                      example: "01"
 *                  date_of_birth:
 *                      type: string
 *                      example: "Rancard"
 *      responses:
 *          '200':
 *              description: New review added successfully !!!
 */

router.post('/review/add/', (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Review({
    store_id: req.body.store_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    rating: req.body.rating,
    rating_rate: req.body.rating_rate,
    date_of_birth: req.body.date_of_birth,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error sending new data : ' + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /Review:
 *   get:
 *    tags: [Review]
 *    summary : List all reviews
 *    security:
 *      - ApiKeyAuth: []
 *    description: Fetch the list of reviews
 *    responses:
 *      '200':
 *          description : A successful response
 */
router.get('/Review', (req, res) => {
  //Select all users: OK
  Review.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/**
 * @swagger
 *  /Review/{Field name}/{info}:
 *   get:
 *    tags: [Review]
 *    summary : Find review by info
 *    security:
 *     - ApiKeyAuth: []
 *    description: Return a single element
 *    parameters:
 *     - name: Field name
 *       in: path
 *       type: string
 *       enum: ["store_id","first_name","last_name","email","rating","rating_rate"]
 *       required: true
 *     - name: info
 *       in: path
 *       type: string
 *       required: true
 *       schema:
 *         type: integer
 *    responses:
 *      '200':
 *          description : A successful response
 *      '400':
 *          description: Invalid info
 *      '404':
 *          description: Review do not exist
 */
router.get('/review/:tags/:id', (req, res) => {
  //Select one article : OK
  let query = {};
  query[req.params.tags] = req.params.id;
  Review.find(query, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error : couldn't retrieve data " + err);
  });
});

/*******************************************FIN ORDER*************************************************** */

/**
 * @swagger
 * securityShemes:
 *   APIKeyAuth:
 *     type: apiKey
 *     in: header
 *     name: X-API-KEY
 *   APIKeyQueryParam:
 *     type: apiKey
 *     in: query
 *     name: api_Key
 * security:
 *  - APIKeyAuth:[]
 */
module.exports = router;

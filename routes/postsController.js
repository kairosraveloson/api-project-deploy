// routes, appelé communement Controller
const express = require("express"); // Spécification du package à utiliser
const router = express.Router();
const ObjectID = require("mongoose").Types.ObjectId;

const { User } = require("../models/User");
const { Admin } = require("../models/Admin");
const { Store } = require("../models/Store");
const { Customer } = require("../models/Customer");
const { Categorie } = require("../models/Categorie");
const { Tax } = require("../models/Taxe");

router.get("/", function (err, res) {
  res.redirect("/eats-api");
});

router.get("/api-docs", function (err, res) {
  res.redirect("/eats-api");
});

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
 *  - name: Warehouses
 *    description: Store operations
 *  - name: Tables
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

router.post("/user/add", (req, res) => {
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
    else console.log("Error sending new data : " + err);
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
router.get("/user", (req, res) => {
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
router.get("/user/:tags/:id", (req, res) => {
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

router.put("/user/update/:tags/:mail", (req, res) => {
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
      else console.log("Update error : " + err);
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
router.delete("/user/delete/:tags/:id", (req, res) => {
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

router.post("/admin/add", (req, res) => {
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
    else console.log("Error sending new data : " + err);
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
router.get("/admin", (req, res) => {
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
router.get("/admin/:tags/:id", (req, res) => {
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

router.put("/admin/update/:tags/:email", (req, res) => {
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
      else console.log("Update error : " + err);
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
router.delete("/admin/delete/:tags/:id", (req, res) => {
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

router.post("/store/add", (req, res) => {
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
    else console.log("Error sending new data : " + err);
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
router.get("/store", (req, res) => {
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
router.get("/store/Status", (req, res) => {
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
router.get("/store/:tags/:id", (req, res) => {
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

router.put("/store/update/:tags/:storeid", (req, res) => {
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
      else console.log("Update error : " + err);
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
router.delete("/store/delete/:tags/:id", (req, res) => {
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

router.post("/customer/add", (req, res) => {
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
    else console.log("Error sending new data : " + err);
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
router.get("/customer", (req, res) => {
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
router.get("/customer/:tags/:id", (req, res) => {
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

router.put("/customer/update/:mail", (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query["e_mail"] = req.params.mail;

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
      else console.log("Update error : " + err);
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
router.delete("/customer/delete/:tags/:id", (req, res) => {
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
 *                  categorieid:
 *                      type: string
 *                      example: "CAT001"
 *                  categorietitle:
 *                      type: string
 *                      example: "Autres"
 *      responses:
 *          '200':
 *              description: New category created successfully !!!
 *          '400':
 *              description: Invalid ID
 */

router.post("/category/add", (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Categorie({
    categorieid: req.body.categorieid,
    categorietitle: req.body.categorietitle,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error sending new data : " + err);
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
router.get("/category", (req, res) => {
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
 *       enum: ["categorieid","categorietitle"]
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
router.get("/category/:tags/:id", (req, res) => {
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
 *            enum: ["categorieid","categorietitle"]
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
 *                  categorietitle:
 *                      type: string
 *                      example: ""
 *      responses:
 *          '200':
 *              description: Information updated successfully !!!
 */

router.put("/category/update/:tags/:mail", (req, res) => {
  // Update : De mbola très bien koa

  let query = {};
  query[req.params.tags] = req.params.mail;

  const updateRecord = {
    categorietitle: req.body.categorietitle,
  };

  Categorie.findOneAndUpdate(
    query,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
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
 *       enum: ["categorieid","categorietitle"]
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
router.delete("/category/delete/:tags/:id", (req, res) => {
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
 *                      example: "CAT001"
 *                  taxtitle:
 *                      type: string
 *                      example: "Autres"
 *                  taxrate:
 *                      type: integer
 *                      example: 5.5
 *      responses:
 *          '200':
 *              description: New category created successfully !!!
 *          '400':
 *              description: Invalid ID
 */

router.post("/tax/add", (req, res) => {
  //Insert : Très bien koa
  const newRecord = new Tax({
    taxid: req.body.taxid,
    taxtitle: req.body.taxtitle,
    taxrate: req.body.taxrate,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error sending new data : " + err);
  });
});

/**
 *  @swagger
 * paths:
 *  /category:
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
router.get("/tax", (req, res) => {
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
 *       enum: ["taxid","taxrate","taxtitle"]
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
router.get("/tax/:tags/:id", (req, res) => {
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
 *            enum: ["taxid","taxtitle","taxrate"]]
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

router.put("/tax/update/:tags/:mail", (req, res) => {
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
      else console.log("Update error : " + err);
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
 *       enum: ["taxid","taxtitle","taxtitle"]
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
router.delete("/tax/delete/:tags/:id", (req, res) => {
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

/************************************************** FIN CATEGORIE*****************************************/

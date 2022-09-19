module.exports = app => {
  const contacts = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Contact
  router.post("/", create);

  // Retrieve all contacts
  router.get("/", findAll);

  // Retrieve all published contacts
  router.get("/published", findAllPublished);

  // Retrieve a single Contact with id
  router.get("/:id", findOne);

  // Update a Contact with id
  router.put("/:id", update);

  // Delete a Contact with id
  router.delete("/:id", delete);

  // Delete all contacts
  router.delete("/", deleteAll);

  app.use("/api/contacts", router);
};

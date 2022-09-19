const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const Contact = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Contact.create(Contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Contact.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Contact.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Contact.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} contacts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  Contact.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts.",
      });
    });
};

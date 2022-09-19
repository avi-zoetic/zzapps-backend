module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("Contact", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Contact;
};

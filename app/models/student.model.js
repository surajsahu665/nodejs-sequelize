const Sequelize = require("sequelize");

module.exports = (sequelize) => {

  const Student = sequelize.define("Student", {
    student_name: {
      type: Sequelize.STRING
    },
    class: {
      type: Sequelize.STRING
    },
    subject: {
        type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Student;

};

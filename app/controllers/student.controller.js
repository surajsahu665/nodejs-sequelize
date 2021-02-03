const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createData = (req, res) => {
    // Validate request
    if (!req.body.class && !req.body.subject && !req.body.student_name) {
        res.status(400).send({
            message: "student_name and class and subject is Required!"
        });
        return;
    }
    else if (!req.body.student_name) {
        res.status(400).send({
            message: "Student Name is Required!"
        });
        return;
    }
    else if (!req.body.subject) {
        res.status(400).send({
            message: "Subject is Required!"
        });
        return;
    }
    else if (!req.body.class) {
        res.status(400).send({
            message: "Class is Required!"
        });
        return;
    }
  


    // Create a Tutorial
    const student = {
        student_name: req.body.student_name,
        class: req.body.class,
        subject: req.body.subject,
        published: req.body.published ? req.body.published : false
    };

    // Add Student in the database
    Student.create(student)
        .then(data => {
            res.send({ message: "New Student Added successfully.", data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while Adding Student."
            });
        });
};

// Retrieve all Students List from the database.
exports.getAllRecords = (req, res) => {
    const student_name = req.query.student_name;
    const subject = req.query.subject;
    const condition = student_name ? { student_name: { [Op.like]: `%${student_name}%` } } : null;
    const condition_1 = subject ? { subject: { [Op.like]: `%${subject}%` } } : null;

    Student.findAll({ where: condition_1, condition, attributes: ['id', 'student_name', 'class', 'subject'] })  //or for display all Remove attributes
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Students List."
            });
        });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};

// Update a Student details by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student Record updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Student with id=${id}. Maybe Student Record was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Student Record with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student Record deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Student Record with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student Record with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Students Records deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Students Records."
            });
        });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
    Student.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Students Records."
            });
        });
};

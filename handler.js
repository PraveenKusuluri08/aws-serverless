"use strict"
require("dotenv").config({ path: "./.env" })
const DbConnection = require("./utils/dbConnection")
const Todo = require("./models/todo.model")
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  }
}

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  DbConnection()
    .then(() => {
      Todo.create(JSON.parse(event.body)).then((todo) => {
        callback(null, {
          statusCode: 201,
          body: JSON.stringify(todo),
        })
      })
    })
    .catch((err) => {
      callback(null, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Failed to connect and create todo to the db ",
          statusCode: 404 | 500,
        }),
      })
    })
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  DbConnection()
    .then(() => {
      Todo.findById(event.pathParameters.id).then((todo) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(todo),
        })
      })
    })
    .catch((err) => {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Failed to connect and failed to get todo from db",
          statusCode: err.statusCode | 500,
        }),
      })
    })
}

module.exports.getAllTodos = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false
  DbConnection().then(() => {
    Todo.find()
      .then((todos) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(todos),
        })
      })
      .catch((err) => {
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Failed to connect and failed to get all todos from db",
            statusCode: err.statusCode | 500,
          }),
        })
      })
  })
}

module.exports.updateTodo = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  DbConnection()
    .then(() => {
      Todo.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
        new: true,
      }).then((todo) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(todo),
        })
      })
    })
    .catch((err) => {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Failed to connect and failed to update todo from db",
          statusCode: err.statusCode | 500,
        }),
      })
    })
}

module.exports.deleteTodo = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  DbConnection()
    .then(() => {
      Todo.findByIdAndRemove(event.pathParameters.id).then((todo) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: `Todo deleted successfully ${todo.id}`,
            toodo: todo,
          }),
        })
      })
    })
    .catch((err) => {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Failed to connect and failed to update todo from db",
          statusCode: err.statusCode | 500,
        }),
      })
    })
}

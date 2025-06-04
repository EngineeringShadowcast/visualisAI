/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */


"use strict";


/**
 * 
 * @param {object} model 
 * @param {*} data 
 * @returns new model(data).save()
 */

let saveData = async function (model, data) {
  return new model(data).save();
};
/**
 * 
 * @param {object} model pass down the model name
 * @param {*} query 
 * @param {*} projection 
 * @param {*} options 
 * @returns model.find(query, projection, options)
 */
let getData = async function (model, query, projection, options) {
  return model.find(query, projection, options);
};


/**
 * 
 * @param {object} model pass down the model name
 * @param {*} query 
 * @param {*} projection 
 * @param {*} options 
 * @returns model.findOne(query, projection, options)
 */
let findOne = async function (model, query, projection, options) {
  return model.findOne(query, projection, options);
};




/**
 * 
 * @param {object} model pass down the model name
 * @param {*} conditions
 * @param {*} update 
 * @param {*} options 
 * @returns model.findOneAndUpdate(conditions, update, options)
 */
let findAndUpdate = async function (model, conditions, update, options) {
  return model.findOneAndUpdate(conditions, update, options);
};


/**
 * 
 * @param {object} model pass down the model name
 * @param {*} conditions
 * @param {*} update 
 * @param {*} options 
 * @returns model.findOneAndRemove(conditions, options)
 */
let findAndRemove = async function (model, conditions, update, options) {
  return model.findOneAndRemove(conditions, options);
};



/**
 * 
 * @param {object} model pass down the model name
 * @param {*} conditions
 * @param {*} update  
 * @param {*} options
 * @returns model.update(conditions, update, options)
 * @additionalInfo also console.log(conditions, "fhyhh", update)
 */
let update = async function (model, conditions, update, options) {

  return model.updateOne(conditions, update, options);
};





/**
 * 
 * @param {object} model pass down the model name
 * @param {*} conditions
 * @param {*} update 
 * @param {*} options 
 * @returns model.updateMany(conditions, update, options)
 * @additionalInfo also console.log(conditions, "fhyhh", update);        
 */
let updateMany = async function (model, conditions, update, options) {
  console.log(conditions, "fhyhh", update);

  return model.updateMany(conditions, update, options);
};




/**
 * 
 * @param {object} model pass down the model name
 * @param {*} condition
 * @returns model.deleteOne(condition)
 */
let remove = async function (model, condition) {
  return model.deleteOne(condition);
};


/*------------------------------------------------------------------------
 * FIND WITH REFERENCE
 * -----------------------------------------------------------------------*/




/**
 * 
 * @param {object} model pass down the model name
 * @param {*} condition
 * @param {*} query
 * @param {*} projection
 * @param {*} options
 * @param {*} collectionOptions
 * @returns model operations chained as(model
    .find(query, projection, options)
    .populate(collectionOptions)
    .exec())
 */
let populateData = async function (
  model,
  query,
  projection,
  options,
  collectionOptions
) {
  return model
    .find(query, projection, options)
    .populate(collectionOptions)
    .exec();
};



/**
 * 
 * @param {object} model 
 * @param {*} condition 
 * @returns model operation of (model.countDocuments(condition))
 */

let count = async function (model, condition) {
  return model.countDocuments(condition);
};
/*
 ----------------------------------------
 AGGREGATE DATA
 ----------------------------------------
 */


 /**
  * 
  * @param {object} model 
  * @param {*} aggregateArray 
  * @param {*} options 
  * let aggregation = model.aggregate(aggregateArray) 
  * if (options) aggregation.options = options;
  * @returns aggregation.exec()
  */
let aggregateData = async function (model, aggregateArray, options) {
  let aggregation = model.aggregate(aggregateArray);

  if (options) aggregation.options = options;

  return aggregation.exec();
};


/**
 * 
 * @param {object} model 
 * @param {*} data 
 * @param {*} options 
 * @returns model.collection.insert(data, options)
 */
let insert = async function (model, data, options) {
  return model.collection.insert(data, options);
};


/**
 * 
 * @param {*} model 
 * @param {*} data 
 * @param {*} options 
 * @returns model.collection.insertMany(data, options)
 */
let insertMany = async function (model, data, options) {
  return model.collection.insertMany(data, options);
};

module.exports = {
  saveData: saveData,
  getData: getData,
  update: update,
  remove: remove,
  insert: insert,
  insertMany: insertMany,
  count: count,
  findOne: findOne,
  findAndUpdate: findAndUpdate,
  findAndRemove: findAndRemove,
  populateData: populateData,
  aggregateData: aggregateData,
  updateMany,
};

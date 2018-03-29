
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';
import rateLimit from '../../lib/rate-limits.js';

import Items from '../items/items.js'

// Find

export const findItems=new ValidatedMethod({
    name:'findItems',
    mixins:[CallPromiseMixin],
    validate:null,
    run(selector,options){
      if(Meteor.isServer){ 
        Meteor._sleepForMs(200);
        selector=selector || {};
        options=options || {};
        return Items.find(selector,options).fetch();
        
      }
    }
});

// Find One

export const findOneItem=new ValidatedMethod({
    name:'findOneItem',
    mixins:[CallPromiseMixin],
    validate:null,
    run(selector){
      if(Meteor.isServer){
        Meteor._sleepForMs(200);
        selector=selector || {};
        return Items.find(selector);
      }
    }
});

//Insert
export const insertItems = new ValidatedMethod({
  name: 'insertItems',
  mixins: [CallPromiseMixin],
  // validate: Itemss.schema.validator(),
  validate: null,
  run(doc) {
    if (!this.isSimulation) {
      return Items.insert(doc)
    }
  }
});

// Update
export const updateItems = new ValidatedMethod({
  name: 'updateItems',
  mixins: [CallPromiseMixin],
  // validate: Itemss.schema.validator(),
  validate: null,
  run(doc) {
    if (!this.isSimulation) {
      return Items.update({_id: doc._id}, {$set: doc})
    }
  }
});

//remove 

export const removeItems = new ValidatedMethod({
  name:'removeItems',
  mixins:[CallPromiseMixin],
  validate: new SimpleSchema({
    _id:{type:String},
  }).validator(),
  run(selector){
    if(Meteor.isServer){
      return Items.remove(selector);
    }
  }
});

rateLimit({
  methods: [
    findItems,
    findOneItem,
    insertItems,
    updateItems,
    removeItems
  ]
});

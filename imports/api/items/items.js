import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
const Items = new Mongo.Collection('items')

Items.schema = new SimpleSchema({
  category: {
    type: String,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  currency: {
    type: String,
  },
  baseUnit: {
    type: String,
  },
  status: {
    type: String,
  },
  cost: {
    type: Number,
    optional: true,
  },
  purchaseMemo: {
    type: String,
    optional: true,
  },
  price: {
    type: Number,
    optional: true,
  },
  saleMemo: {
    type: String,
    optional: true,
  },
  assetAccount: {
    type: String,
  },
  revAccount: {
    type: String,
  },
  expenseAccount: {
    type: String,
  },
})
Items.attachSchema(Items.schema)

export default Items

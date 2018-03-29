<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24">
        <el-form
          label-width="100px"
          v-loading="loading"
          :model="form"
          :rules="rules"
          ref="form"
        >
          <h2>Edit Items</h2>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="Category"
                prop="category"
              >
                <el-select
                  v-model="form.category"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in cateOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="No"
                prop="id"
              >
                <el-input v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item
                label="Name"
                prop="name"
              >
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item
                label="Currency"
                prop="currency"
              >
                <el-select
                  v-model="form.currency"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in currencyOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="Base Unit"
                prop="baseUnit"
              >
                <el-select
                  v-model="form.baseUnit"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in baseUnitOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="Status"
                prop="status"
              >
                <el-select
                  v-model="form.status"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in statOpt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Activity type">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox
                    label="Purchase"
                    name="type"
                    @change="handleChangePurchase"
                  ></el-checkbox>
                  <el-checkbox
                    label="Sale"
                    name="type"
                    @change="handleChangeSale"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item
                label="Cost"
                prop="cost"
                v-show="purchase"
              >
                <el-input v-model="form.cost"></el-input>
              </el-form-item>

              <el-form-item
                label="Purchse Memo"
                prop="purchaseMemo"
                v-show="purchase"
              >
                <el-input
                  type="textarea"
                  v-model="form.purchaseMemo"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="Price"
                prop="price"
                v-show="sale"
              >
                <el-input v-model="form.price"></el-input>
              </el-form-item>
              <el-form-item
                label="Sale Memo"
                prop="saleMemo"
                v-show="sale"
              >
                <el-input
                  type="textarea"
                  v-model="form.saleMemo"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-tabs>
                <el-tab-pane label="Account">
                  <el-row :gutter="5">
                    <el-col :span="8">
                      <el-form-item
                        label="Asset Account*"
                        prop="assetAccount"
                      >
                        <el-select
                          v-model="form.assetAccount"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in assetOpt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">

                      <el-form-item
                        label="Revenue Account*"
                        prop="revAccount"
                      >
                        <el-select
                          v-model="form.revAccount"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in revAccountOpt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="ExpenseAccount*"
                        prop="expenseAccount"
                      >
                        <el-select
                          v-model="form.expenseAccount"
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in expenseAccountOpt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="12"
              :offset="15"
            >
              <br><br>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="handleSave"
                >Save</el-button>
                <el-button @click="handleCancel">Cancel</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import moment from 'moment';
import { findItems, updateItems } from '../../api/items/methods.js'
export default {
  name: 'ItemEdit',
  data() {
    return {
      loading: false,
      itemsOpt: [],
      itemDataOpt: [],
      purchase: false,
      sale: false,
      form: {
        category: '',
        id: '',
        name: '',
        type: [],
        currency: '',
        baseUnit: '',
        status: '',
        cost: '',
        purchaseMemo: '',
        price: '',
        saleMemo: '',
        assetAccount: '',
        revAccount: '',
        expenseAccount: '',
      },
      cateOpt: [
        { label: 'Beer', value: 'Beer' },
        { label: 'Drink', value: 'Drink' },
        { label: 'Wine', value: 'Wine' },
        { label: 'Water', value: 'Water' },
      ],
      baseUnitOpt: [
        { label: 'Box', value: 'Box' },
        { label: 'Can', value: 'Can' },
        { label: 'Bottle', value: 'Bottle' },
      ],
      statOpt: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Void', value: 'Void' },
      ],
      currencyOpt: [
        { label: 'USA', value: 'USA' },
        { label: 'Khmer', value: 'Khmer' },
        { label: 'Thai', value: 'Thai' },
      ],
      assetOpt: [
        { label: 'Inventory', value: 'Inventory' },
        { label: 'caseh1', value: 'caseh1' },
      ],
      revAccountOpt: [
        { label: 'Sale Revenu', value: 'Sale Revenu' },
        { label: 'caseh1', value: 'caseh1' },
      ],
      expenseAccountOpt: [
        { label: 'Cash1', value: 'Cash1 ' },
        { label: 'caseh2', value: 'caseh2' },
      ],
      rules: {
        category: [{ required: true, message: 'Type is required' }],
        id: [{ required: true, message: 'id is required' }],
        name: [{ required: true, message: 'name is required' }],
        currency: [{ required: true, message: 'Age is required' }],
        baseUnit: [{ required: true, message: 'sex is required' }],
        status: [{ required: true, message: 'dob is required' }],
        assetAccount: [
          {
            required: true,
            message: 'accountReceive is required',
          },
        ],
        revAccount: [{ required: true, message: 'revenuAccount is required' }],
        expenseAccount: [
          {
            required: true,
            message: 'depositAccount is required',
          },
        ],
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      findItems
        .callPromise({}, { sort: { code: 1 } })
        .then(result => {
          this.itemDataOpt = result
          const _id = this.$route.params._id
          this.form = _.find(result, function(o) {
            return o._id === _id
          })
          this.loading = false
        })
        .catch(error => {
          console.log(error.reason)
        })
    },
    handleChangePurchase() {
      findItems.callPromise({}, { sort: { code: 1 } }).then(result => {
        if (result) {
          this.purchase = true
        } else {
          this.purchase = false
        }
      })
    },
    handleChangeSale() {
      findItems.callPromise({}, { sort: { code: 1 } }).then(result => {
        if (result) {
          this.sale = true
        } else {
          this.sale = false
        }
      })
    },
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true

          updateItems
            .callPromise(this.form)
            .then(result => {
              if (result) {
                this.loading = false
                this.$notify({
                  type: 'Success',
                  position: 'bottom-right',
                  title: 'Success',
                  message: 'Success',
                })
                this.handleReset()
                //console.log(result)
              }
            })
            .catch(error => {
              console.log(error.reason)
            })
        } else {
          return false
        }
      })
    },
    handleReset() {
      this.$refs['form'].resetFields()
    },
    handleCancel() {
      this.$router.push({ name: 'item' })
    },
  },
}
</script>
<template>
  <div>
    <router-view></router-view>
    <el-button
      type="primary"
      @click="handleNew"
    >Add new</el-button>
      <data-tables
        :data="itemOpt"
        :action-col-def="actionColDef"
        :search-def="searchDef"
      >
        <el-table-column
          v-for="title in titles"
          :prop="title.prop"
          :label="title.label"
          :key="title.label"
          :fixed="title.fixed"
          :width="title.width"
          :formatter="title.dateFormatter || title.disFormate"
        >
          </el-table-column>
          </data-tables>
  </div>
</template>
<script>
//import moment from 'moment'
import { findItems, removeItems } from "../../api/items/methods.js";
export default {
  name: "Customer",
  data() {
    return {
      loading: false,
      itemOpt: [],
      searchDef: {
        show: false
      },
      titles: [
        {
          label: "Category",
          prop: "category",
          fixed: "left"
        },
        {
          label: "No",
          prop: "id"
        },
        {
          label: "Name",
          prop: "name"
        },
        {
          label: "Currency",
          prop: "currency"
        },
        {
          label: "BaseUnit",
          prop: "baseUnit"
        },
        {
          label: "Status",
          prop: "status",
          width: 120
        },
        {
          label: "Cost",
          prop: "cost",
          width: 120
        },
        {
          label: "PurchseMemo",
          prop: "purchaseMemo"
        },
        {
          label: "Price",
          prop: "price",
          width: 120
        },
        {
          label: "SaleMemo",
          prop: "saleMemo"
        },
        {
          label: "AssetAccount",
          prop: "assetAccount",
          width: 120
        },
        {
          label: "RevenueAccount",
          prop: "revAccount"
        },
        {
          label: "ExpenseAccount",
          prop: "expenseAccount"
        }
      ],
      actionColDef: {
        label: "Actions",
        width: 150,
        fixed: "right",
        tableColProps: {
          align: "center"
        },
        def: [
          {
            handler: row => {
              this.edit(row);
            },
            buttonProps: {
              type: "text"
            },
            name: "Edit"
          },
          {
            icon: "message",
            type: "text",
            handler: row => {
              this.delete(row);
            },
            name: "Delete"
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      findItems
        .callPromise()
        .then(result => {
          console.log(result);

          this.itemOpt = result;
          this.loading = false;
        })
        .catch(error => {
          console.log(error.reason);
        });
    },
    handleNew() {
      this.$router.push({ name: "itemNew" });
    },
    handleCommand(command) {
      this[command.action](command.row);
    },
    edit(row) {
      this.$router.push({ name: "itemEdit", params: { _id: row._id } });
    },
    delete(row) {
      this.$confirm("This will permanently delete. Continue?", "Warning", {
        type: "warning"
      })
        .then(() => {
          removeItems
            .callPromise({ _id: row._id })
            .then(result => {
              this.$notify({
                type: "success",
                position: "bottom-right",
                title: "Success",
                message: "Your transaction is success"
              });

              this.getData();
            })
            .catch(error => {
              console.log(error.reason);
            });
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            position: "bottom-right",
            title: "Warning",
            message: "Your transaction is canceled"
          });
        });
    }
  }
};
</script>


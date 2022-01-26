<template>
  <div>
    <div style="display: flex">
      <md-button
        class="md-raised md-primary"
        @click="
          showDialog = !showDialog;
          newProduct = {};
          selectedId = '';
        "
        >Add product</md-button
      >
    </div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">My Inventory</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Drug</md-table-head>
        <md-table-head>Batch No</md-table-head>
        <md-table-head>Exipry</md-table-head>
        <md-table-head>Quantity</md-table-head>
        <md-table-head>Price</md-table-head>
      </md-table-row>
      <md-table-row v-for="product in inventory" v-bind:key="product._id">
        <md-table-cell>{{ product._id }}</md-table-cell>
        <md-table-cell>{{ product.name }}</md-table-cell>
        <md-table-cell>{{ product.drug }}</md-table-cell>
        <md-table-cell>{{ product.batchId }}</md-table-cell>
        <md-table-cell
          >{{ new Date(product.expiryDate).getMonth() + 1 }}/{{
            new Date(product.expiryDate).getFullYear()
          }}</md-table-cell
        >
        <md-table-cell>{{ product.quantity }}</md-table-cell>
        <md-table-cell>{{ product.price }}</md-table-cell>
        <md-table-cell>
          <md-button
            class="md-primary"
            @click="
              newProduct = { ...newProduct, ...product };
              selectedId = product._id;
              showDialog = true;
            "
          >
            edit
          </md-button>
          <md-button class="md-accent" @click="deleteProduct(product._id)">
            delete
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
      <md-dialog-title>Add Product</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-field>
            <label>Name</label>
            <md-input v-model="newProduct.name"></md-input>
          </md-field>
          <md-field>
            <label>Drug</label>
            <md-input v-model="newProduct.drug"></md-input>
          </md-field>
          <md-field>
            <label>Batch Number</label>
            <md-input v-model="newProduct.batchId"></md-input>
          </md-field>
          <md-field>
            <label>Price</label>
            <md-input v-model="newProduct.price" type="number"></md-input>
          </md-field>
          <md-field>
            <label>Expiry date</label>
            <md-input v-model="newProduct.expiryDate" type="date"></md-input>
          </md-field>
          <md-field>
            <label>Quantity per strip</label>
            <md-input
              v-model="newProduct.quantityPerStrip"
              type="number"
            ></md-input>
          </md-field>
          <md-field>
            <label>Number of strips</label>
            <md-input
              v-model="newProduct.numberOfStrips"
              type="number"
            ></md-input>
          </md-field>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="saveProduct">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-snackbar
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ addMessage }}</span>
      <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import axios from "axios";
import Constants from "../constants";

export default {
  name: "InventoryComponent",
  data() {
    return {
      showSnackbar: false,
      addMessage: "",
      showDialog: false,
      inventory: [],
      selectedId: "",
      newProduct: {
        drug: "",
        name: "",
        quantity: undefined,
        batchId: "",
        expiryDate: undefined,
        price: undefined,
        quantityPerStrip: undefined,
        numberOfStrips: undefined,
      },
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get(Constants.BASE_URL + "/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res_) => {
        if (res_.status === 200) {
          this.inventory = res_.data.inventoryDetails;
        }
      })
      .catch(() => {
        localStorage.clear();
        this.$router.replace("/");
      });
  },
  methods: {
    saveProduct() {
      console.log(`this.selectedid ${this.selectedId}`);
      let product = {
        _id: this.selectedId,
        name: this.newProduct.name,
        drug: this.newProduct.drug,
        quantity:
          this.newProduct.quantityPerStrip * this.newProduct.numberOfStrips,
        batchId: this.newProduct.batchId,
        expiryDate: this.newProduct.expiryDate,
        price: this.newProduct.price,
      };
      if (this.selectedId) {
        axios
          .put(
            Constants.BASE_URL + "/api/inventory/" + this.selectedId,
            product
          )
          .then((res_) => {
            this.addMessage = res_.data["message"];
            this.showSnackbar = true;
            this.showDialog = false;
            let idx = this.inventory.findIndex(
              (prod) => prod._id === this.selectedId
            );
            this.inventory[idx] = { ...this.inventory[idx], ...product };
            console.log(this.inventory, this.inventory[idx], product);
            this.selectedId = "";
            this.newProduct = {};
          });
      } else {
        axios
          .post(Constants.BASE_URL + "/api/inventory", product)
          .then((res_) => {
            if (res_.status === 201) {
              this.inventory.push(res_.data["inventory"]);
              this.showDialog = false;
              this.addMessage = res_.data["message"];
              this.showSnackbar = true;
            }
          });
      }
    },
    deleteProduct(id) {
      if (confirm("Do You want to delete this item?")) {
        axios
          .delete(`${Constants.BASE_URL}/api/inventory/${id}`)
          .then((res_) => {
            let idx = this.inventory.findIndex((product) => product._id === id);
            this.inventory.splice(idx, 1);
            this.addMessage = res_.data["message"];
            this.showSnackbar = true;
          });
      }
    },
  },
};
</script>
<style scoped>
.md-table {
  overflow-x: auto;
}
</style>
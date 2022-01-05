<template>
  <div>
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
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";

export default {
  name: "InventoryComponent",
  data() {
    return {
      inventory: [],
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://192.168.206.175:3000/api/inventory", {
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
        router.replace("/");
      });
  },
};
</script>
<style scoped>
.md-table {
  overflow-x: auto;
}
</style>
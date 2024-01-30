<template>
  <div>
    <hLargeIconHeader text="Users" :icon="'person'"></hLargeIconHeader>

    <div>
      <div class="search-field input-group mb-4 mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search by userId"
          v-model="searchInput"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="search">Search</button>
        </div>
      </div>
    </div>

    <div class="list row mt-4">
      <div class="col-md-4">
        <div class="scrollable"><table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th style="width: 20%">User ID</th>
              <th style="width: 30%">Timezone</th>
              <th style="width: 20%" tooltip="Device Token">
                <img class="mb-1 mr-1" src="/assets/img/phone.svg" title="Device token"/>
              </th>
              <th style="width: 15%">OS</th>
              <th style="width: 15%">Version</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="{ active: index == currentIndex }"
              v-for="(user, index) in users"
              :key="index"
              @click="setActive(user, index)"
              @dblclick="goToUser(user)"
            >
              <td class="td-wrap">
                <tdUserNameLink :data="{user}"></tdUserNameLink>
              </td>
              <td class="td-wrap">{{user.timezone}}</td>
              <td class="td-wrap code-detail">
                <img class="mb-1 mr-1" src="/assets/img/phone.svg" title="Device token"/>
              </td>
              <td class="td-wrap">{{user.os}}</td>
              <td class="td-wrap">{{user.versionNumber}}</td>
            </tr>
          </tbody>
        </table></div>
      </div>

      <div class="col-md-2 ml-4">
        <div v-if="currentUser">
          <tableDetailsHeader
            icon="person"
            :text="currentUser.userId"
            :href="'/users/' + currentUser.userId"
          />

          <table class="table">
            <trDetail label="User" :codeDetail="currentUser.userId" />
            <trDetail label="Timezone" :codeDetail="currentUser.timezone" />
            <trDetail label="Device token" :codeDetail="currentUser.deviceToken" />
            <trDetail label="OS" :codeDetail="currentUser.os" />
            <trDetail label="Version" :codeDetail="currentUser.versionNumber" />
            <trDetail label="Creation date" :time="currentUser.createdAt" />
            <trDetail label="Last updated" :time="currentUser.updatedAt" />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import UserDataService from "../services/UserDataService";

import tdUserNameLink from "./table/td/tdUserNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import tableDetailsHeader from "./table/tableDetailsHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "user-list",
  components: {
    tdUserNameLink,
    hLargeIconHeader,
    tableDetailsHeader,
    trDetail
  },
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchInput: ""
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUser();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActive(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
    goToUser(user) {
      window.location.href = "/users/" + user.userId;
    },

    search() {
      UserDataService.findByUserId(this.searchInput)
        .then(response => {
          this.users = response.data;
          this.setActive(null);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.retrieveUsers();
  }
};
</script>

<style>
.list {
  text-align: left;
  width: 1800pt;
}
.td-wrap {
  word-break: break-word;
}
.search-field {
  width: 578pt;
}
.code-detail {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  color: #666;
}
.active {
  background: #eaeaea;
}
.ra {
  text-align: right;
}
.text-align-center {
  text-align: center;
}
</style>
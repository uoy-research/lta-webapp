<template>
  <div>
    <hLargeIconHeader :text="user.userId" :icon="'person'"></hLargeIconHeader>

    <div class="row">
      <div class="col">
        <h4>Details</h4>

        <table class="table">
          <!--
          <trDetail label="ID" :codeDetail="user._id" />
          <trDetail label="User" :text="user.userId" />
          -->
          <trDetail label="Timezone" :text="user.timezone" />
          <trDetail label="OS" :codeDetail="user.os" />
          <trDetail label="Version" :codeDetail="user.versionNumber" />
          <trDetail label="Device token" :codeDetail="user.deviceToken" />
          <trDetail label="Creation date" :time="user.createdAt" />
          <trDetail label="Last updated" :time="user.updatedAt" />
          <!-- <tr
              v-for="(group, index) in groups" :key="index"
            >
          <th>Groups</th>
                <tdGroupNameLink :data="{group}"/>

          </tr> -->
        </table>
      </div>
    </div>

    <div>
      <h3 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/people.svg" width="24" height="24" />
        Groups
      </h3>
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th style="width: 25%">Group</th>
              <th style="width: 25%">Member count</th>
              <th style="width: 50%">Members</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :class="{ active: index == currentIndex }"
              v-for="(group, index) in groups"
              :key="index"
              @click="setActive(group, index)"
              @dblclick="goToGroup(group)"
            >
              <td class="td-wrap">
                <tdGroupNameLink :data="{group}"></tdGroupNameLink>
              </td>
              <td class="td-wrap">{{group.userIds.length}}</td>
              <td class="td-wrap">{{group.userIds.join(", ")}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    <div>
      <h3 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/pencil.svg" width="24" height="24" />
        Assignments
      </h3>

      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/person.svg" width="24" height="24" />
        User Assignments
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">Assignment</th>
            <th style="width: 20%">Survey</th>
            <th style="width: 20%">Creation date</th>
            <th style="width: 15%">Publish date</th>
            <th style="width: 10%">Notifications</th>
            <th style="width: 10%">Tracking</th>
            <th style="width: 20%">Answered</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(assignment, index) in assignments.filter(a => !a.groupId)"
            :key="index"
            @dblclick="goToAssignment(assignment)"
          >
            <tdAssignmentNameLink :data="{assignment}" />
            <td>
              <a :href="'/surveys/' + assignment.survey._id">{{ assignment.survey.name }}</a>
            </td>
            <td>{{ getCalendar(assignment.createdAt) }}</td>
            <td>{{ getCalendar(assignment.publishAt) }}</td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.publishNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="Publish notified at"
              />
              <img
                class="mr-1"
                v-if="assignment.expireNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="Expiry notified at"
              />
            </td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.firstOpenedAt"
                src="/assets/img/envelope-open.svg"
                title="First opened at"
              />
              <img
                class="mr-1"
                v-if="assignment.dataset"
                src="/assets/img/check.svg"
                title="Dataset"
              />
            </td>
            <td>{{ assignment.dataset ? getCalendar(assignment.dataset.createdAt) : "Unanswered"}}</td>
          </tr>
        </tbody>
      </table>

      <h4 class="mt-5">
        <img class="mb-1 mr-1" src="/assets/img/people.svg" width="24" height="24" />
        Group Assignments
      </h4>

      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th style="width: 20%">Assignment</th>
            <th style="width: 20%">Group</th>
            <th style="width: 20%">Survey</th>
            <th style="width: 20%">Creation date</th>
            <th style="width: 20%">Publish date</th>
            <th style="width: 10%">Notifications</th>
            <th style="width: 10%">Tracking</th>
            <th style="width: 20%">Answered</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(assignment, index) in assignments.filter(a => a.groupId)"
            :key="index"
            @dblclick="goToAssignment(assignment)"
          >
            <tdAssignmentNameLink :data="{assignment}" />
            <td>
                <a :href="'/groups/' + assignment.groupId">{{ assignment.groupId }}</a>
            </td>
            <td>
              <a :href="'/surveys/' + assignment.survey._id">{{ assignment.survey.name }}</a>
            </td>
            <td>{{ getCalendar(assignment.createdAt) }}</td>
            <td>{{ getCalendar(assignment.publishAt) }}</td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.publishNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="Publish notified"
              />
              <img
                class="mr-1"
                v-if="assignment.expireNotifiedAt"
                src="/assets/img/phone-vibrate.svg"
                title="Expiry notified"
              />
            </td>
            <td>
              <img
                class="mr-1"
                v-if="assignment.firstOpenedAt"
                src="/assets/img/envelope-open.svg"
                title="First opened"
              />
              <img
                class="mr-1"
                v-if="assignment.dataset"
                src="/assets/img/check.svg"
                title="Dataset"
              />
            </td>
            <td>{{ assignment.dataset ? getCalendar(assignment.dataset.createdAt) : "Unanswered"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import UserDataService from "../services/UserDataService";
import AssignmentDataService from "../services/AssignmentDataService";
import GroupDataService from "../services/GroupDataService";

import tdAssignmentNameLink from "./table/td/tdAssignmentNameLink";
import tdGroupNameLink from "./table/td/tdGroupNameLink";
import hLargeIconHeader from "./h/hLargeIconHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "user-component",
  components: {
    tdAssignmentNameLink,
    tdGroupNameLink,
    hLargeIconHeader,
    trDetail
  },
  data() {
    return {
      user: {
        _id: "",
        userId: "",
        timeZone: "",
        deviceToken: "",
        createdAt: "",
        updatedAt: ""
      },
      assignments: [],
      groups: [],
    };
  },
  methods: {
    getCalendar(dt) {
      if (!dt) return "";
      return moment(dt).calendar();
    },
    getUser(id) {
      UserDataService.get(id)
        .then(response => {
          this.user = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    getAssignmentsOfUser(id) {
      AssignmentDataService.getAssignmentsOfUser(id)
        .then(response => {
          this.assignments = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getGroupsOfUser(id) {
      GroupDataService.getGroupsOfUser(id)
        .then(response => {
          this.groups = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    goToAssignment(assignment) {
      window.location.href = "/assignments/" + assignment._id;
    }
  },
  mounted() {
    moment.locale("en-ca");
    this.message = "";
    this.getUser(this.$route.params.id);
    this.getAssignmentsOfUser(this.$route.params.id);
    this.getGroupsOfUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.td-wrap {
  word-break: break-word;
}
.code-detail {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  color: #666;
}
</style>

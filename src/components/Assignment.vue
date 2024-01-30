<template>
  <div>
    <hLargeIconHeader :text="(assignment.userId ? assignment.userId : assignment.groupId) + ' @ ' + assignment.survey.name" :icon="'pencil'"></hLargeIconHeader>

    <div class="row">
      <div class="col">
        <h4 class="col">Details</h4>

        <table class="table">
          <trDetail label="ID" :codeDetail="assignment._id" />
          <trDetail label="User" :text="assignment.userId" :href="'/users/' + assignment.userId" />
          <trDetail label="Group" :text="assignment.groupId" :href="'/groups/' + assignment.groupId" />
          <trDetail
            label="Survey"
            :text="assignment.survey.name"
            :href="'/surveys/' + assignment.survey._id"
            :subtext="assignment.survey.title"
            :number="assignment.survey.questions.length"
            numberSingular="question"
            numberPlural="questions"
          />
          <trDetail label="Creation date" :time="assignment.createdAt" />
          <trDetail label="Publish date" :time="assignment.publishAt" />
          <trDetail label="Published from" :time="assignment.publishFrom" />
          <trDetail label="Published to" :time="assignment.publishTo" />
          <!--
          <trDetail label="Publish notification date" :time="assignment.publishNotifiedAt" />
          -->
          <trDetail label="Expiry date" :time="assignment.expireAt" />
          <trDetail label="Expiry notification date" :time="assignment.expireNotifiedAt" />
          <!--
          <trDetail label="First opened date" :time="assignment.firstOpenedAt" />
          <trDetail label="Last opened date" :time="assignment.lastOpenedAt" />
          -->
          <trDetail
            label="Answered"
            :text="assignment.dataset ? undefined : 'Unanswered'"
            :time="assignment.dataset ? assignment.dataset.createdAt : undefined"
          />
        </table>
      </div>

      <div class="col">
        <h4>Survey config</h4>

        <textarea class="code-block" v-model="survey" rows="25" cols="40" disabled></textarea>
      </div>

      <div class="col">
        <h4>Dataset</h4>

        <textarea class="code-block" v-model="dataset" rows="25" cols="40" disabled></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import AssignmentDataService from "../services/AssignmentDataService";

import hLargeIconHeader from "./h/hLargeIconHeader";
import trDetail from "./table/tr/trDetail";

export default {
  name: "survey-component",
  components: {
    hLargeIconHeader,
    trDetail
  },
  data() {
    return {
      assignment: {
        userId: "",
        _id: "",
        createdAt: "",
        publishAt: "",
        publishNotifiedAt: "",
        expireAt: "",
        expireNotifiedAt: "",
        firstOpenedAt: "",
        lastOpenedAt: "",
        survey: {
          createdAt: "",
          questions: []
        },
        dataset: {
          createdAt: ""
        }
      },
      survey: {
        createdAt: "",
        questions: []
      },
      dataset: {
        createdAt: ""
      }
    };
  },
  methods: {
    getTimestamp(dt) {
      return moment(dt).format("YYYY-MM-DD HH:mm Z");
    },
    getAssignment(_id) {
      AssignmentDataService.getAssignment(_id)
        .then(response => {
          this.assignment = response.data;
          console.log(response.data);
          this.survey = JSON.stringify(this.assignment.survey, null, 2);
          this.dataset = JSON.stringify(this.assignment.dataset, null, 2);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.getAssignment(this.$route.params.id);
  }
};
</script>

<style>
.code-block {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  background: #ddd;
  color: #666;
}
.code-detail {
  font-family: monospace, Arial, sans-serif;
  font-size: smaller;
  color: #666;
}
.td-wrap {
  word-break: break-word;
}
.detail {
  font-size: smaller;
  color: #666;
}
</style>

import moment from "moment";

import store from "../store";
import http from "../http-common";

http.interceptors.request.use(function (config) {
  config.headers.token = store.getters.token;
  return config;
});

class SurveyDataService {
  getAll() {
    return http.get("/surveys");
  }

  getSurvey(id) {
    return http.get(`/surveys/${id}`);
  }

  create(data) {
    return http.post("/surveys", data);
  }

  delete(id) {
    return http.delete(`/surveys/${id}`);
  }

  findByName(inputText) {
    return http.get(`/surveys/search/?t=${inputText}`);
  }

  getCsv(id) {
    return http.get(`/surveys/${id}/datasets/csv`);
  }

  getJson(id) {
    return http.get(`/surveys/${id}/datasets`);
  }

  getResultsCsv(id) {
    return http.get(`/surveys/${id}/datasets/results/csv`);
  }

  getResultsJson(id) {
    return http.get(`/surveys/${id}/datasets/results/json`);
  }

  assignSurvey(sid, uid) {

    var now = new Date().toISOString();
    var date = now.slice(0, 10);
    var time = now.slice(11, 19);

    return http.post(`/users/${uid}/schedule/survey/${sid}/${date}/${date}/${time}++++/0`);
  }

  scheduleSurveyOnce(sid, uid, publishAt) {

    if (!moment(publishAt).isValid()) {
      alert("publishAt not valid: '" + publishAt + "'.");
      return;
    }

    var dt = new Date(publishAt).toISOString();
    var date = dt.slice(0, 10);
    var time = dt.slice(11, 19);

    return http.post(`/users/${uid}/schedule/survey/${sid}/${date}/${date}/${time}++++/0`);
  }

  scheduleSurveySeries(sid, uid, gid, startYMD, endYMD, hm1, hm2, hm3, hm4, hm5, plusMinusRandomMinutes) {

    if ((uid && gid) || (!uid && !gid)) {
      alert("please select either user or group");
      return;
    }

    if (!moment(startYMD).isValid()) {
      alert("startYMD not valid: '" + startYMD + "'.");
      return;
    }
    if (!moment(endYMD).isValid()) {
      alert("endYMD not valid: '" + endYMD + "'.");
      return;
    }

    if (uid) {
      return http.post(`/users/${uid}/schedule/survey/${sid}/${startYMD}/${endYMD}/${hm1}+${hm2}+${hm3}+${hm4}+${hm5}/${plusMinusRandomMinutes}`);
    } else if (gid) {
      return http.post(`/groups/${gid}/schedule/survey/${sid}/${startYMD}/${endYMD}/${hm1}+${hm2}+${hm3}+${hm4}+${hm5}/${plusMinusRandomMinutes}`);
    }
  }
}

export default new SurveyDataService();

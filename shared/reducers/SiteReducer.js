import Immutable from 'immutable';
import { fromJS } from 'immutable';
import axios from 'axios';

const init = {
  title: "Data Skeptic - The intersection of data science, artificial intelligence, machine learning, statistics, and scientific skepticism",
  disqus_username: "dataskeptic",
  contact_form: {
      name: "",
      email: "",
      msg: "",
      error: "",
      send: "no"
    },
  contributors: {},
  slackstatus: ""
}

const defaultState = Immutable.fromJS(init);

export default function siteReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'INITIALIZE_SITE':
      if (nstate.contact_form == undefined) {
        nstate.contact_form = {
          name: "",
          email: "",
          msg: "",
          error: "",
          send: "no"
        }
      }
      nstate.contact_form.send = "no"
      var dispatch = action.payload.dispatch
      axios
        .get("/api/contributors/list")
        .then(function(resp) {
          var contributors = resp["data"]
          dispatch({type: "SET_CONTRIBUTORS", payload: contributors})
        })
        .catch(function(err) {
          console.log(err)
          self.setState({contributor: undefined})
        })      
      break
    case 'SET_CONTRIBUTORS':
      nstate.contributors = action.payload
      break
    case 'SET_TITLE':
    	nstate.title = action.payload
    	break
    case 'JOIN_SLACK':
      var dispatch = action.payload.dispatch
    	var email = action.payload.email
    	var token = ""
  		var req = {email: email, token: token, set_active: true}
      nstate.slackstatus = "Sending..."
      var config = {
       // headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
      };
  		axios
  			.post("/api/slack/join", req, config)
  			.then(function(resp) {
          var data = resp['data']
          var msg = data['msg']
          dispatch({type: "SLACK_UPDATE", payload: {msg} })            
  			})
  			.catch(function(err) {
          var data = err['data']
          var msg = "Sorry, we're having a problem getting that done :("
          if (data != undefined) {
            if (data['msg'] != undefined) {
              msg = data['msg']
            }
          }
          dispatch({type: "SLACK_UPDATE", payload: {msg} })
  			  console.log(err)
  			})
      break;
    case 'SLACK_UPDATE':
      var msg = action.payload.msg
      nstate.slackstatus = msg
      break;
    case 'UPDATE_CONTACT_FORM':
      if (action.payload.name != undefined) {
        nstate.contact_form.name = action.payload.name
      }
      if (action.payload.email != undefined) {
        nstate.contact_form.email = action.payload.email
      }
      if (action.payload.msg != undefined) {
        nstate.contact_form.msg = action.payload.msg
      }
      break;
    case 'CONTACT_FORM_ERROR':
      var error = action.payload.error
      nstate.contact_form.error = error
      nstate.contact_form.send = "no"
    case 'CONTACT_FORM_COMPLETE':
      var success = action.payload.success
      if (success) {
        nstate.contact_form.msg = ""
        nstate.contact_form.error = ""
        nstate.contact_form.send = "success"
      } else {
        nstate.contact_form.send = "error"
      }
      break
    case 'CONTACT_FORM':
      var dispatch = action.payload.dispatch
      var data = nstate.contact_form
      var msg = action.payload.msg
      if (msg != undefined) {
        data.msg = msg
      }
      var email = action.payload.email
      if (email != undefined) {
        data.email = email
      }
      var url = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/contact"
      var error = ""
      nstate.contact_form.send = "sending"
      var me = this
      axios
        .post(url, JSON.stringify(data))
        .then(function(result) {
          if (dispatch != undefined) {
            var success = true
            dispatch({type: "CONTACT_FORM_COMPLETE", payload: {success} })
          }
        })
        .catch(function (err) {
          console.log(err)
          if (dispatch != undefined) {
            var success = false
            dispatch({type: "CONTACT_FORM_COMPLETE", payload: {success} })
          }
        });
  }
  return Immutable.fromJS(nstate)
}

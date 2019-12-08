const core = require('@actions/core');
const github = require('@actions/github')

try{

	const time = (new Date).toTimeString();
	core.setOutput("time", time);

	// Get the JSON webhook payload for the event that triggered the workflow
  	const payload = JSON.stringify(github.context.payload, undefined, 2)
  	const jsonPayload = github.context.payload
  	console.log("//////////////////////////////////")
  	console.log("The json pay load is:");
  	console.log(jsonPayload)
  	console.log("//////////////////////////////////")

}catch (error){
	core.setFailed(error.message)
}

const core = require('@actions/core');
const github = require('@actions/github')
const axios = require('axios');


try{

	const time = (new Date).toTimeString();
	core.setOutput("time", time);

	// Get the JSON webhook payload for the event that triggered the workflow
  	// const payload = JSON.stringify(github.context.payload, undefined, 2)
  	const payload = github.context.payload
  	// console.log("////////////////PAYLOAD//////////////////")
  	// console.log(github)
  	// console.log("\n\n\n////////////////GITHUB//////////////////")
   //  console.log(github.context);
   //  console.log("\n\n\n////////////////PAYLOAD//////////////////")
   //  console.log(payload);
   //  console.log("//////////////////////////////////")

    //get the inputs
    const token = core.getInput('access_token');
    const excludedBranchesString = core.getInput('excluded_branches');
    const excludedBranches = excludedBranchesString.split(",")//parse the array inside the string to be an array
    console.log("The excluded branches are: ")
    console.log(excludedBranches)
    const head = payload.pull_request.head

    //first check if the branch is merged (not only the PR is closed)
    //console.log(payload)
    if(payload.pull_request.merged == true){
      console.log("the branch is merged, start the deletion process...")
      var baseUrl = "https://api.github.com";
      const headers = {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'token '+token
      }
      //get the owner
      var owner = head.repo.owner.login
      var repo = head.repo.name
      console.log("The owner is "+owner)
      console.log("The repo is "+repo)
      //get the branch name:
      var branchName = head.ref;
      console.log("The target branch is: "+branchName)

      //stop the action if the branch should be excluded
      if(excludedBranches.includes(branchName)){
        console.log("The branch "+branchName+" is one of the excluded branches, therefore it's not removed")
        return
      }

      //stop the action if the branch is the master branch
      if(branchName=="master"){
        console.log("The master branch should never be removed, deletion stopped")
      }

      //make the delete request:
      console.log("starting the delete request....")
      const referenceUrl = baseUrl+"/repos/"+owner+"/"+repo+"/git/refs/heads/"+branchName
      console.log("////The url is :////")
      console.log(referenceUrl)

      axios.delete(referenceUrl, {headers})
        .then(function(response){
            console.log("The branch "+branchName+" has been deleted successfully")
            console.log(response)
        })
        .catch(function(error){
          console.log("\n\n\n///////////////////////Error: ")
          console.log(error)
        })


    }
    else{
      console.log("Pull request closed without merge, therefore the branch hasn't been removed")
    }

}catch (error){
	core.setFailed(error.message)
}



//remove the merged branch


    // function getPullsOfRepo(){
    //             // const reviewsUrl = baseUrl+"/repos/mrsool/mrsool-backend/pulls/5363/reviews"
    //             // // const url = baseUrl+"/repos/mrsool/mrsool-backend/issues"
    //             const headers = {
    //                 'Accept': 'application/vnd.github.v3+json',
    //                 'Authorization': 'token 3c1da117d28118d936be362bdd0c756eb53f483c'
    //             }
    //             //
    //             //
    //             // axios.get(reviewsUrl,{headers})
    //             //     .then(function(response){
    //             //         console.log("The reviews are:")
    //             //         console.log(response.data)
    //             //         // console.log("Pull Request TITLE: "+response.data.title)
    //             //         // console.log("Pull Request Comments:")
    //             //         // axios.get(response.data.comments_url,{headers})
    //             //         //     .then(function(res){
    //             //         //         console.log(res.data)
    //             //         //     })
    //             //
    //             //     })

    //             const targetUsername = "yarooob";
    //             const targetSyntax = "@"+targetUsername;
    //             const issueNumber = "5363";
    //             const commentsUrl = baseUrl+"/repos/mrsool/mrsool-backend/issues/"+issueNumber+"/comments"
    //             axios.get(commentsUrl,{headers})
    //                 .then(function(response){
    //                     console.log("The comments are:")
    //                     console.log(response.data)
    //                     const comments = response.data;
    //                     comments.forEach(function(comment){
    //                         const body = comment.body
    //                         if (body.includes(targetSyntax)){
    //                             console.log("yes for ")
    //                             console.log(comment)
    //                             const commentAuthor = "@"+comment.user.login
    //                             const replyBody = commentAuthor + " Hi, this is my reply to your comment"

    //                             //now create the new comment
    //                             const requestBody = {
    //                                 "body" : replyBody
    //                             }

    //                             const commentPostUrl = baseUrl+"/repos/mrsool/mrsool-backend/issues/"+issueNumber+"/comments"
    //                             axios.post(commentPostUrl, requestBody, {headers})
    //                                 .then(function(response){
    //                                     console.log(response)
    //                                 })

    //                         }

    //                     })

    //                 })
    //         }


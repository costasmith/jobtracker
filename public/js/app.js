// setup
const app = angular.module('JobApp', [])


// const express = require('express');               // need for embedded models?
// const User = require('.../models/user.js');       // need for embedded models?


app.controller('JobController', ['$http', function ($http) {
  const controller = this

  // ======================================== Create Job
  this.createJob = function(){
    $http({
      method: 'POST',
      url: '/jobs',
      data: {
        position: this.position,
        company: this.company,
        applied: this.applied,
        resume: this.resume,
        letter: this.letter,
        followedUp: this.followedUp,
        salary: this.salary,
        url: this.url,
        stage: this.stage,
        status: this.status
      }
    }).then(
      function(response) {
        console.log(response)


////////////////////////////////////////////// try to store the job in the user
        // User.findOne({username: controller.loggedInUsername}, (err, foundUser) => {
        //     if (err) {                               // If an error occurs
        //         console.log(err);
        //         res.send('Error - check console log')
        //     } else if (!foundUser) {                  // if user not found
        //         res.send('The user was not found')
        //     } else {                                  // if user is found
        //         foundUser.jobList.push(response)
        //     }
        // })

        controller.pushJob(response);


        // controller.loggedInJobList.push(response)
        //
        // console.log(controller.loggedInJobList);
        //
        // controller.getUserJobs()
////////////////////////////////////////////// try to store the job in the user


// keep this either way
        controller.getJobs()
      }, function (error) {
        console.log(error);
      }
    )
  }



////////////////////////////////////////////// try to store the job in the user
this.pushJob = function(newJob){
    console.log(controller.loggedInID);
    console.log(newJob.data);
    $http({
        method: 'PUT',
        url: '/users/' + controller.loggedInID,
        data: {
            job: newJob.data
        }
    }).then(
        function(response){
            console.log(response);
        }, function(error){
            console.log(error);
        }
    )
}


this.getUserJobs = function(){
    $http({
        method: 'GET',
        url: '/users/' + controller.loggedInID
    }).then(
        function(response){
            controller.jobs = response.data
            console.log(response);
            controller.getJobs()
        }, function(error) {
            console.log(error);
        }
    )
}

// function to get one job, edit it, and store it back in the jobList

// function to delete a selected job from the user's jobList
// this.deleteJob = function(job){
//     $http({
//         method: 'DELETE',
//
//     })
// }

this.deleteJob = function(job){
    $http({
        method: 'GET',
        url: '/users/' + controller.loggedInID + '/' + job._id
    }).then(
        function(response){
            controller.getJobs()
            console.log(response);
        }, function(error){
            console.log(error);
      })
  }

////////////////////////////////////////////// try to store the job in the user





  // ======================================== Get Jobs
  this.getJobs = function(){
      $http({
          method: 'GET',
          url: '/jobs'
      }).then(
          function(response){
          controller.jobs = response.data
          // console.log(response);
      }, function(error){
          console.log(error);
      })
  }


  // ======================================== Edit Job
  // this.editJob = function(job) {
  //   $http({
  //     method: 'PUT',
  //     url: '/jobs/' + job._id,
  //     data: {
  //       position: this.position,
  //       company: this.company,
  //       applied: this.applied,
  //       resume: this.resume,
  //       letter: this.letter,
  //       followedUp: this.followedUp,
  //       salary: this.salary,
  //       url: this.url,
  //       stage: this.stage,
  //       status: this.status
  //     }
  //   }).then(function () {
  //     controller.getJobs()
  //     controller.indexOfEditFormToShow = null
  //   })
  // }

  // ======================================== Delete Job
  // this.deleteJob = function(job){
  //     $http({
  //         method: 'GET',
  //         url: '/users/' + controller.loggedInID + '/' + job._id
  //     }).then(
  //         function(response){
  //             controller.getJobs()
  //             console.log(response);
  //         }, function(error){
  //             console.log(error);
  //       })
  //   }

  // ======================================== Create User
  this.createUser = function(){
      $http({
          method: 'POST',
          url: '/users',
          data: {
              username: this.newUsername,
              password: this.newPassword,
              jobList: []
          }
      }).then(
          function(response){
              console.log(response);
              controller.newUsername = null;
              controller.newPassword = null
          },
          function(error){
              console.log(error);
          }
      )
  }


  // ======================================== User Login
  this.logIn = function(){
      $http({
          method: 'POST',
          url: '/sessions',
          data: {
              username: this.username,
              password: this.password
          }
      }).then(
          function(response){
              console.log(response);
              controller.username = null;
              controller.password = null;
              controller.goApp();           // go from login to the app
          },
          function(error){
              console.log(error);
        })
    }


  // ======================================== Go to the Job Tracker app
  this.goApp = function(){
      $http({
          method: 'GET',
          url: '/app'
      }).then(
          function(response){
              controller.loggedInUsername = response.data.username
              controller.loggedInJobList = response.data.jobList     // needed?
              controller.loggedInID = response.data._id              // needed?
          },
          function(error){
              console.log(error);
        })
  }



  // ======================================== User Logout
  this.logOut = function(){
      $http({
          method: 'DELETE',
          url: '/sessions'
      }).then(
          function(response){
              console.log(response);
              controller.loggedInUsername = null;
          },
          function(error){
              console.log(error);
          }
      )
  }

  // ======================================== Show jobs on the page load
  this.getJobs()
}])

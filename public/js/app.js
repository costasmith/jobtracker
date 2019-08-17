// setup
const app = angular.module('JobApp', [])

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
        controller.getJobs()
      }, function (error) {
        console.log(error);
      }
    )
  }

  // ======================================== Get Jobs
  this.getJobs = function(){
      $http({
          method: 'GET',
          url: '/jobs'
      }).then(
          function(response){
          controller.jobs = response.data
          console.log(response);
      }, function(error){
          console.log(error);
      })
  }

  // this.getJobs = function () {
  //   $http({
  //     method: 'GET',
  //     url: '/jobs'
  //   }).then(function (response) {
  //     controller.jobs = response.data
  //     console.log(response);
  //   }, function (error) {
  //       console.log(error);
  //   })
  // }

  // ======================================== Edit Job
  this.editJob = function(job) {
    $http({
      method: 'PUT',
      url: '/jobs/' + job._id,
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
    }).then(function () {
      controller.getJobs()
      controller.indexOfEditFormToShow = null
    })
  }

  // ======================================== Delete Job
  this.deleteJob = function(job){
      $http({
          method: 'DELETE',
          url: '/jobs/' + job._id
      }).then(
          function(response){
              controller.getJobs()
              console.log(response);
          }, function(error){
              console.log(error);
        })
    }

  // ======================================== Create User
  this.createUser = function(){
      $http({
          method: 'POST',
          url: '/users',
          data: {
              username: this.newUsername,
              password: this.newPassword,
              // jobList: []
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
              // controller.username = null;
              // controller.password = null;
              // controller.goApp();           // go from login to the app
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
              console.log(loggedInUsername);
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

  // ======================================== Show jobs on the page
  this.getJobs()
}])

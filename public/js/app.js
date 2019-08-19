//==============================================================================
//  APP.JS => THIS FILE CONTAINS ALL OF THE FUNCTIONS THAT CALL CONTROLLERS
//==============================================================================

// ========================================== Set Up
const app = angular.module('JobApp', [])

//==============================================================================
//  APP.CONTROLLER IS THE CONTROLLER FOR ALL FUNCTIONS
//==============================================================================
app.controller('JobController', ['$http', function ($http) {
    // include path enables the use of partials
    this.includePath = 'partials/about.html'
    this.changeInclude = (path) => {
      this.includePath = 'partials/' + path + '.html'
    }

    // declare controller variable to be at the level of the app.controller
    const controller = this

  //============================================================================
  //  THE JOB FUNCTIONS START HERE
  //============================================================================
  // ======================================== CREATE Job
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
        controller.pushJob(response);  // push the job into user's jobList
      }, function (error) {
        console.log(error);
      }
    )
  }


  // ======================================== push new job to user's jobList
  this.pushJob = function(newJob){
    $http({
        method: 'PUT',
        url: '/users/' + controller.loggedInID,
        data: {
            job: newJob.data
        }
    }).then(
        function(response){
            console.log('push new job response: ' + response);
            controller.getUserJobs()
        }, function(error){
            console.log(error);
            controller.getUserJobs()
        }
    )
}

  // ======================================== READ jobs from user's jobList
  this.getUserJobs = function(){
      $http({
          method: 'GET',
          url: '/users/' + controller.loggedInID
      }).then(
          function(response){
              controller.jobs = response.data
              console.log('jobs to be displayed on the page: ');
              for (let i = 0; i < controller.jobs.length; i++) {
                  console.log(controller.jobs[i]._id + '     ' + controller.jobs[i].position);
              }
          }, function(error) {
              console.log(error);
          }
      )
  }


  // ======================================== UPDATE a job from user's jobList
  this.editJob = function(job) {
      console.log(job);
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
    }).then(
        function (response) {
            console.log('updated job received from job controller: ', response);
        controller.replaceJob(response)  // delete the old version, add the new
        controller.indexOfEditFormToShow = null;


    }, function(error) {
        console.log(error);
    })
  }


  // ======================================== replace the updated job in jobList
  this.replaceJob = function(updatedJob){
      console.log('updatedJob to be sent in as a replacement: ' + updatedJob.data._id);
      $http({
          method: 'PUT',
          url: '/users/' + controller.loggedInID + '/' + updatedJob.data._id,
          data: {
              job: updatedJob.data
          }
      }).then(
          function(response){
              console.log('response received from replacement: ', response);
              controller.getUserJobs()
          }, function(error){
              console.log(error);
              controler.getUserJobs()
          }
      )
  }


  // ======================================== DELETE a job from user's jobList
  this.deleteJob = function(job){
    $http({
        method: 'DELETE',
        url: '/users/' + controller.loggedInID + '/' + job._id
    }).then(
        function(response){
            console.log(response);
            controller.getUserJobs()
        }, function(error){
            console.log(error);
            controller.getUserJobs()
      })
  }


  //============================================================================
  //  THE USER FUNCTIONS START HERE
  //============================================================================
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
              controller.loggedInID = response.data._id
              controller.getUserJobs()
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
              controller.getUserJobs()
          },
          function(error){
              console.log(error);
          }
      )
  }


}])

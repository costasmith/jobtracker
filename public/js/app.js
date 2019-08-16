// setup
const app = angular.module('JobApp', [])

app.controller('JobController', ['$http', function ($http) {
  const controller = this

  // create
  this.createJob = function () {
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
      function (response) {
        console.log(response.data)
        controller.getJobs()
      }, function (error) {
        console.log(error);
      }
    )
  }

  // get/read route
  this.getJobs = function () {
    $http({
      method: 'GET',
      url: '/jobs'
    }).then(function (response) {
      controller.jobs = response.data
      console.log(controller.jobs);
    }, function (error) {
        console.log(error);
    })
  }

  this.editJob = function (job) {
    $http({
      method: 'PUT',
      url: '/jobs' + job._id,
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


  this.getJobs()
}])

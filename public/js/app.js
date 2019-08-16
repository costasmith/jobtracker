// setup
const app = angular.module('JobApp', [])

app.controller('JobController', ['$http', function ($http) {
  const controller = this

  // create
  this.createdJob = function () {
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
        console.log(response)
        // controller.getJobs()
      }, function (error) {
        console.log('error');
      }
    )
  }
  // this.getJobs()
}])

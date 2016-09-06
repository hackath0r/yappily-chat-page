(function(){
	angular
		.module('home')
		.controller('HomeCtrl', function($http, $scope){
			$scope.currentLoggedInUser = {
				'name': 'Garima Kamboj',
				'profile_pic': 'http://placehold.it/150?text=Garima'
			}
			$scope.query = '';
			$http.get('data/userList.json')
				 .then(function(response){
				 	$scope.userList = response.data;
				 });
			$scope.showChat = function(user) {
				$scope.selectedUser = user;
				$http.get('data/conv.json')
				 .then(function(response){
				 	$scope.conv = response.data;
				 });
				$scope.class = "selected";
			}
		});
})();
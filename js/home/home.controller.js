(function(){
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzV43LyU_0aJXMw_xFBf0FkTFQHeou8rc",
    authDomain: "quickchat-f0c1e.firebaseapp.com",
    databaseURL: "https://quickchat-f0c1e.firebaseio.com",
    storageBucket: "quickchat-f0c1e.appspot.com",
  };

  firebase.initializeApp(config);

	angular
		.module('home')
		.controller('HomeCtrl', function($http, $scope, $firebaseArray){
     $scope.disabled = true;
		 $scope.hidden = true;

     const userNameInputForm = document.getElementById('user-name-input');
		 const userName = document.getElementById('username');

		 var from_user_ref;
     var from_user_id;
     var from_user_name;
		 var to_user_id;

			const ref = firebase.database().ref();

			const userNameListRef = ref.child('users');
      const chatsRef = ref.child('chats');

			userNameInputForm.addEventListener('submit', event => {
        event.preventDefault();
        from_user_ref = userNameListRef.push({
          name: userName.value,
					profile_pic: "http://dummyimage.com/150x150.jpg/5fa2dd/ffffff"
        });

        from_user_name = userName.value;
        from_user_id = from_user_ref.key;

        userNameInputForm.style.display = 'none';
      });

			$scope.currentLoggedInUser = {
				'name': from_user_name,
				'profile_pic': "http://dummyimage.com/150x150.jpg/5fa2dd/ffffff"
			}
			$scope.query = '';
			$scope.userList = $firebaseArray(userNameListRef);

			$scope.showChat = function(user) {
				if(from_user_id == null) return;

				to_user_id = user.$id;

				if(from_user_id == to_user_id) {
					alert("You can talk to yourself without QuickChat!!");
      		return;
				}

        $scope.selectedUser = user;

				var convUID = uniqueID(from_user_id, to_user_id);

				var convRef = chatsRef.child(convUID);

				var messageListRef = convRef.child('message-list');

				$scope.conv = $firebaseArray(messageListRef);

        // Enable submit button
				$scope.disabled = false;
				$scope.hidden = false;

				// add new items to the array
        // the message is automatically added to our Firebase database!
        $scope.addMessage = function() {
        		$scope.conv.$add({
					  		user_id: from_user_id,
								name: from_user_name,
            		message: $scope.newMessage,
								profile_pic: "http://dummyimage.com/150x150.jpg/5fa2dd/ffffff"
        		});
						$scope.newMessage = ""
			  }

				$scope.class = "selected";
			}
		});
})();


// Generates Unique identifier using two unique strings
function uniqueID(A, B) {
  if(A.localeCompare(B) == 0){
    return 0;
  }
  return A.localeCompare(B) < 0 ? A+B : B+A;
}

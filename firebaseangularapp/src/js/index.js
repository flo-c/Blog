window.firebaseangularmain = {

    logged : false,
    user : null,
	
	
	initialize : function() {
        if (this.logged) {
            // Set output div height
            var outputDiv = document.getElementById('output');
            // Set main display height
            var mainContainerDiv = document.getElementById('main');
            var headerDiv = document.getElementById('headercontainer');
            mainContainerDiv.style.height = (outputDiv.clientHeight - headerDiv.clientHeight) + "px";
        }
	}
	
};
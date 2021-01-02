import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
	apiKey: "AIzaSyAsM0ruHktwdgjJjL7WcbGIxnEbCILVH4Y",
	authDomain: "dax-myplanner.firebaseapp.com",
	databaseURL: "https://dax-myplanner.firebaseio.com",
	projectId: "dax-myplanner",
	storageBucket: "dax-myplanner.appspot.com",
	messagingSenderId: "658763380770",
	appId: "1:658763380770:web:c6e86fff4db6a55edf327b",
	measurementId: "G-5W96T08JGY"
};

firebase.initializeApp(config);

firebase.firestore().settings({
	timestampsInSnapshots: true
});

export default firebase;
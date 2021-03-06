const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const createNotification = (notification) => {
	return admin.firestore().collection("notifications")
		.add(notification)
		.then(doc => console.log("Notification added", doc));
} 

exports.projectCreated = functions.firestore
	.document("projects/{projectId}")
	.onCreate(doc => {
		const project = doc.data();
		const notification = {
			content: "Added a new project",
			user: `${project.authorFirstName} ${project.authorLastName}`,
			time: admin.firestore.FieldValue.serverTimestamp()
		}

	return createNotification(notification);
});

exports.projectEdited = functions.firestore
	.document("projects/{projectId}")
	.onUpdate(doc => {
		const project = doc.after.data();
		const notification = {
			content: "Edited a project",
			user: `${project.authorFirstName} ${project.authorLastName}`,
			time: admin.firestore.FieldValue.serverTimestamp()
		}

		return createNotification(notification);
	});

exports.projectDeleted = functions.firestore
	.document("projects/{projectId}")
	.onDelete(doc => {
		const project = doc.data();
		const notification = {
			content: "Deleted a project",
			user: `${project.authorFirstName} ${project.authorLastName}`,
			time: admin.firestore.FieldValue.serverTimestamp()
		}

		return createNotification(notification);
	});

exports.userSignedUp = functions.auth.user()
	.onCreate(user => {
		return admin.firestore().collection("users")
			.doc(user.uid).get().then(doc => {
				const newUser = doc.data();
				const notification = {
					content: "Joined the party",
					user: `${newUser.firstName} ${newUser.lastName}`,
					time: admin.firestore.FieldValue.serverTimestamp()
				}

				return createNotification(notification);
			});
});
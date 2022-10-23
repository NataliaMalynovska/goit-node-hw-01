const db = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const toContacts = await db.listContacts();
			console.table(toContacts);
			break;
		case "get":
			const getContact = await db.getContactById(id);
			console.table(getContact);
			break;
		case "add":
			const addContact = await db.addContact(name, email, phone);
			console.log(addContact);
			break;
		case "remove":
			const removeContact = await db.removeContact(id);
			console.table(removeContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

// invokeAction({ action: "list" });
// invokeAction({
// 	action: "add",
// 	name: "Vera",
// 	email: "vera@nbv.com",
// 	phone: "(044)4561237897",
// });
// invokeAction({ action: "get", id: "1" });
// invokeAction({ action: "remove", id: "db232d6c-e4e0-49c6-a1c0-e22b357a8c7d" });

const [, , action] = process.argv;
switch (action) {
	case "list":
		invokeAction({ action });
		break;
	case ("get", "remove"):
		const [, , , id] = process.argv;
		invokeAction({ action, id });
		break;
	case "add":
		const [, , , nameArgs, email, phone] = process.argv;
		const name = [...nameArgs].join("");
		invokeAction({ action, name, email, phone });
		break;

	default:
		break;
}

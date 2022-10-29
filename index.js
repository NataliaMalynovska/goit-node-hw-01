const db = require("./contacts");
const argv = require("yargs").argv;

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
invokeAction(argv);


// const [, , action] = process.argv;
// switch (action) {
// 	case "list":
// 		invokeAction({ action });
// 		break;
// 	case "remove":
// 		const [, , , id] = process.argv;
// 		invokeAction({ action, id });
// 		break;
// 	case "get":
// 		const [, , , id] = process.argv;
// 		invokeAction({ action, id });
// 		break;
// 	case "add":
// 		const [, , , nameArgs, email, phone] = process.argv;
// 		const name = [...nameArgs].join("");
// 		invokeAction({ action, name, email, phone });
// 		break;

// 	default:
// 		break;
// }

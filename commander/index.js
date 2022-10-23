const { program } = require("commander");
const db = require("../contacts");

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

program.command("list").action(async (options) => {
	invokeAction({ action: "list" });
});
program.command("get <id>").action(async (options) => {
	const id = options;
	invokeAction({ action: "get", id });
});
program.command("add <nameArgs> <email> <phone>").action(async (options) => {
	invokeAction({
		action: "add",
		name: options,
		email: options,
		phone: options,
	});
});
program.command("remove <id>").action(async (options) => {
	const id = options;
	invokeAction({ action: "remove", id });
});

program.parse();
// const [, , action] = process.argv;
// switch (action) {
// 	case "list":
// 		invokeAction({ action });
// 		break;
// 	case ("get", "remove"):
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

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
program
	.command("add ")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone")
	.action(async (options) => {
		const {name, email, phone} = options;
		invokeAction({
			action: "add",
			name: name,
			email: email,
			phone: phone,
		});
	});
program.command("remove <id>").action(async (options) => {
	const id = options;
	invokeAction({ action: "remove", id });
});

program.parse();

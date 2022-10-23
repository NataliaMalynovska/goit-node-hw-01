const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
	dbRaw = await fs.readFile(contactsPath);
	const data = JSON.parse(dbRaw);
	return data;
}

async function getContactById(id) {
	const db = await listContacts();
	const contact = db.find((item) => item.id === id);
	return contact;
}
async function addContact(name, email, phone) {
	const id = uuidv4();
	const newContact = { id, name, email, phone };
	const db = await listContacts();
	db.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(db));
	return newContact;
}
async function removeContact(itemIid) {
	const db = await listContacts();
	const contact = db.find((item) => item.id === itemIid);
	if (!contact) {
		return null;
	}
	const updateContacts = db.filter((item) => item.id !== itemIid);
	const data = updateContacts;
	await fs.writeFile(contactsPath, JSON.stringify(data));
	return data;
}

module.exports = {
	listContacts,
	addContact,
	removeContact,
	getContactById,
};

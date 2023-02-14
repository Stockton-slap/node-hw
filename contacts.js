const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function updateContactsList(newList) {
  await fs.writeFile(contactsPath, JSON.stringify(newList));
}

async function listContacts() {
  try {
    const res = await fs.readFile(contactsPath, "utf-8");
    const parsedData = await JSON.parse(res);

    return parsedData;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const res = await listContacts();
    const findContact = await res.find((contact) => contact.id === contactId);

    return findContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const res = await listContacts();
    const i = res.findIndex((contact) => contact.id === contactId);
    if (i === -1) {
      return null;
    }
    const deletedContact = res.splice(i, 1);

    updateContactsList(res);

    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const res = await listContacts();

  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };

  res.push(newContact);

  updateContactsList(res);

  return res;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

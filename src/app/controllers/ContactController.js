const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      response.status(403).json({ error: 'Name is invalid' });
      return;
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      response.status(401).json({ error: 'This e-mail is alredy in use' });
      return;
    }
    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });
    response.status(201).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    if (!name) {
      response.status(403).json({ error: 'Name is invalid' });
      return;
    }
    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      response.status(400).json({ error: 'This e-mail is alredy in use' });
      return;
    }

    const updatedUser = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });
    response.json(updatedUser);
  }
}

module.exports = new ContactController();

import ShippingAddress from '../models/shippingAddress.js';
import errorHandler from '../middlewares/errorHandler.js';

async function getShippingAddressesByUser(req, res) {
  try {
    const userId = req.params.userId;
    const addresses = await ShippingAddress.find({ user: userId });

    if (addresses.length === 0) {
      return res.status(404).json({ message: 'No shipping addresses found for this user' });
    }
    res.json(addresses);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

async function createShippingAddress(req, res) {
  try {
    const {
      user,
      name,
      address,
      city,
      state,
      postalCode,
      country = 'México',
      phone,
      isDefault = false,
      addressType = 'home'
    } = req.body;

    if (!user || !name || !address || !city || !state || !postalCode || !phone) {
      return res.status(400).json({ error: 'Faltan campos obligatorios para registrar la dirección.' });
    }

    if (isDefault) {
      await ShippingAddress.updateMany(
        { user: user, isDefault: true },
        { isDefault: false }
      );
    }

    const newAddress = await ShippingAddress.create({
      user,
      name,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault,
      addressType
    });

    await newAddress.populate('user');
    res.status(201).json(newAddress);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

async function updateShippingAddress(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const addressDoc = await ShippingAddress.findById(id);
    if (!addressDoc) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }

    if (updateData.isDefault === true) {
      await ShippingAddress.updateMany(
        { user: addressDoc.user, isDefault: true, _id: { $ne: id } },
        { isDefault: false }
      );
    }

    const updatedAddress = await ShippingAddress.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('user');

    res.status(200).json(updatedAddress);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

async function deleteShippingAddress(req, res) {
  try {
    const { id } = req.params;
    const deletedAddress = await ShippingAddress.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }

    res.status(204).send();
  } catch (error) {
    errorHandler(error, req, res);
  }
}

export {
  getShippingAddressesByUser,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};

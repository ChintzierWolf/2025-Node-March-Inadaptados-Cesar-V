import Product from '../models/product.js';

async function getProducts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate('category')
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });

    const totalResults = await Product.countDocuments();
    const totalPages = Math.ceil(totalResults / limit);
    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    next(error);
  }
}
async function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function getProductByCategory(req, res, next) {
  try {
    const id = req.params.idCategory;
    const products = await Product
      .find({ category: id })
      .populate('category')
      .sort({ name: 1 });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found on this category' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function createProduct(req, res, next) {
  try {
    // Detectamos si req.body es un Arreglo (Bulk Insert) o un Objeto individual
    const isArray = Array.isArray(req.body);
    const productsData = isArray ? req.body : [req.body];

    // Validamos todos los productos de la lista
    for (const product of productsData) {
      const { name, description, price, stock, imagesUrl, category, platform, genre, releaseDate } = product;
      // Nota: stock se valida con !== undefined para permitir stock en 0
      if (!name || !description || !price || stock === undefined || !imagesUrl || !category || !platform || !genre || !releaseDate) {
        return res.status(400).json({ error: 'All fields are required for each product' });
      }
    }

    // Usamos insertMany para guardar todo de una vez (funciona con 1 o 100 elementos)
    const newProducts = await Product.insertMany(productsData);

    // Retornamos la respuesta con el mismo formato que se recibió (Arreglo u Objeto)
    res.status(201).json(isArray ? newProducts : newProducts[0]);
  } catch (error) {
    next(error);
  }
}
async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const { name, description, price, stock, imagesUrl, category, platform, genre, releaseDate } = req.body;

    if (!name || !description || !price || !stock || !imagesUrl || !category || !platform || !genre || !releaseDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,
      { name, description, price, stock, imagesUrl, category, platform, genre, releaseDate },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
}
async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function searchProducts(req, res, next) {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      inStock,
      sort,
      order,
      page = 1,
      limit = 10,
    } = req.query;

    let filters = {};

    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }

    if (category) {
      filters.category = category;
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    if (inStock === 'true') {
      filters.stock = { $gt: 0 };
    }

    let sortOptions = {};

    if (sort) {
      const sortOrder = order === 'desc' ? -1 : 1;
      sortOptions[sort] = sortOrder;
    } else {
      sortOptions.name = 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filters)
      .populate('category')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const totalResults = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    res.status(200).json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalResults,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    next(error);
  }

}

export {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
}
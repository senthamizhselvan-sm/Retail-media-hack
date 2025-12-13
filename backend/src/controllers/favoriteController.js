const Favorite = require('../models/Favorite');

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add to favorites
// @route   POST /api/favorites
// @access  Private
exports.addFavorite = async (req, res) => {
  try {
    const { imageUrl, prompt, type, metadata } = req.body;

    const favorite = await Favorite.create({
      user: req.user.id,
      imageUrl,
      prompt,
      type,
      metadata,
    });

    res.status(201).json({
      success: true,
      favorite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove from favorites
// @route   DELETE /api/favorites/:id
// @access  Private
exports.removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      });
    }

    // Check ownership
    if (favorite.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    await favorite.deleteOne();

    res.json({
      success: true,
      message: 'Favorite removed',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

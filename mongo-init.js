// MongoDB initialization script
// This script runs when the container starts for the first time

// Switch to the pixcraft_ai database
db = db.getSiblingDB('pixcraft_ai');

// Create a user for the application
db.createUser({
  user: 'pixcraft_user',
  pwd: 'pixcraft_password',
  roles: [
    {
      role: 'readWrite',
      db: 'pixcraft_ai'
    }
  ]
});

// Create initial collections (optional - Mongoose will create them automatically)
db.createCollection('users');
db.createCollection('favorites');
db.createCollection('ailogs');

print('✅ MongoDB initialized successfully for PixCraft AI');
print('📊 Database: pixcraft_ai');
print('👤 User: pixcraft_user');
print('🔑 Collections created: users, favorites, ailogs');
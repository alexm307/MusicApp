const mongoose = require('mongoose');
const Artist = require('./models/artist');
const Album = require('./models/album');
const data = require('./data.json'); // Make sure to save your JSON data as data.json in the same directory

mongoose.connect('mongodb://localhost:27017/musicLibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    await Artist.deleteMany(); // Clear existing data
    await Album.deleteMany();

    for (const artistData of data) {
      const artist = new Artist({ name: artistData.name });
      await artist.save();

      for (const albumData of artistData.albums) {
        const album = new Album({
          title: albumData.title,
          description: albumData.description,
          songs: albumData.songs.map(song => song.title),
          artist: artist._id,
        });
        await album.save();

        artist.albums.push(album._id);
      }

      await artist.save();
    }

    console.log('Data imported successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error importing data:', err);
    mongoose.connection.close();
  }
};

importData();
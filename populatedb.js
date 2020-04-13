console.log(
  'This script populates some test categories and items to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Item = require('./models/item');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const categories = [];
const items = [];

async function createCategory(name, description) {
  const categoryDetail = { name, description };
  const category = new Category(categoryDetail);

  try {
    await category.save();

    console.log('New Category:', category);
    categories.push(category);
  } catch (err) {
    throw err;
  }
}

async function createItem(name, description, category, price, stock) {
  const itemDetail = { name, description, category, price, stock };
  const item = new Item(itemDetail);

  try {
    await item.save();

    console.log('New Item:', item);
    items.push(item);
  } catch (err) {
    throw err;
  }
}

async function createCategories() {
  try {
    await Promise.all([
      createCategory(
        'Musical Instruments',
        'A musical instrument is a device created or adapted to make musical sounds. You can find your favorite musical instrument here!'
      ),
      createCategory(
        'PC Components',
        'Do you want to build your own PC? here you will find all components you need!'
      )
    ]);
  } catch (err) {
    throw err;
  }
}

async function createItems() {
  try {
    await Promise.all([
      createItem(
        'Accordion Weltmeister Cantus V 120 Bass LMMH Double Cassotto Fisarmonica',
        'The instrument is in good condition. The sound is in tune, everything works and the bellows compression is very good.',
        categories[0],
        549,
        1
      ),
      createItem(
        'Yamaha MX88 88-Key Weighted Action Synthesizer',
        'The Yamaha MX88 rocks more than 1,000 killer MOTIF XS sounds, a class-compliant USB audio/MIDI interface, and deep controller integration with your favorite computer music software.',
        categories[0],
        1100,
        2
      ),
      createItem(
        'Gigabyte B450 AORUS M (AMD Ryzen AM4/M.2 Thermal Guard/HDMI/DVI/USB 3.1 Gen 2/DDR4/Micro ATX/Motherboard)',
        'GIGABYTE AM4 motherboards are ready to support the latest AMD Ryzen™ 3000 Processors and are backwards compatible with AMD Ryzen™ 2000 and 1000 Processors. With a rich list of features on GIGABYTE AM4 motherboards such as Ultra Durable™ Armor for PCIe/ memory slots, USB Type-C™ interfaces on select boards, refined audio quality, high speed Ethernet, and the latest standard WIFI design, GIGABYTE AM4 motherboards are perfect for users looking to build the best AMD platform systems.',
        categories[1],
        84.99,
        4
      ),
      createItem(
        'Intel Core i9-9900K Desktop Processor 8 Cores up to 5.0 GHz Turbo unlocked LGA1151 300 Series 95W',
        'if you afford it buy it',
        categories[1],
        450,
        1
      )
    ]);
  } catch (err) {
    throw err;
  }
}

async function populateDB() {
  try {
    await createCategories();
    await createItems();

    mongoose.connection.close();

    console.log('DATA SAVED:');
    console.log('Categories:');

    categories.forEach((c) => console.log(c));

    console.log('Items:');
    items.forEach((i) => console.log(i));

    console.log('DB IS POPULATED, Press any key to continue');
  } catch (error) {
    console.log('Error some data could not be saved');
    console.error(error);
  }
}

populateDB();

// npm init --y
// npm i random-avatar-generator image-to-base64 sharp
const { AvatarGenerator } = require('random-avatar-generator');
const imageToBase64 = require('image-to-base64');
const fs = require('fs');
const sharp = require('sharp');

const generator = new AvatarGenerator();

(async () => {
  const peopleString = fs.readFileSync('./people.json', 'utf-8');
  const people = JSON.parse(peopleString);
  for (const person of people) {
    console.log(`Processing image ${people.indexOf(person) + 1}/${people.length}`);

    const avatarUrl = generator.generateRandomAvatar();
    const imageData = await imageToBase64(avatarUrl);

    var img = new Buffer(imageData, 'base64');
    const resizedImageBuffer = await sharp(img).resize(64, 64).toBuffer();

    let resizedImageData = resizedImageBuffer.toString('base64');
    let resizedBase64 = `data:image/jpeg;base64,${resizedImageData}`;

    person.pictureUrl = resizedBase64;
  }

  fs.writeFileSync('./people.json', JSON.stringify(people), 'utf-8');
})();

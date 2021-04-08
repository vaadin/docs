// npm init --y
// npm i random-avatar-generator image-to-base64 sharp
// const { AvatarGenerator } = require('random-avatar-generator');
// const imageToBase64 = require('image-to-base64');
// const fs = require('fs');
// const sharp = require('sharp');

// const generator = new AvatarGenerator();

// const professions = [
//   'Podiatrist',
//   'Pediatrician',
//   'Endocrinologist',
//   'Neurologist',
//   'Rheumatologist',
//   'Allergist',
//   'Psychiatrist',
//   'Nephrologist',
//   'Obstetrician',
//   'Pulmonologist',
//   'Surgeon',
//   'Ophthalmologist',
//   'Oncologist',
//   'Urologist',
//   'Otolaryngologist',
//   'Anesthesiologist',
//   'Dermatologist',
//   'Radiologist',
//   'Gastroenterologist',
//   'Cardiologist',
//   'Orthopedist',
// ];

// const managers = new Map();

// (async () => {
//   const peopleString = fs.readFileSync('./people.json', 'utf-8');
//   const people = JSON.parse(peopleString);
//   for (const person of people) {
// console.log(`Processing image ${people.indexOf(person) + 1}/${people.length}`);

// const avatarUrl = generator.generateRandomAvatar();
// const imageData = await imageToBase64(avatarUrl);

// var img = new Buffer(imageData, 'base64');
// const resizedImageBuffer = await sharp(img).resize(64, 64).toBuffer();

// let resizedImageData = resizedImageBuffer.toString('base64');
// let resizedBase64 = `data:image/jpeg;base64,${resizedImageData}`;

// person.pictureUrl = resizedBase64;
//     var value = professions[Math.floor(Math.random() * professions.length)];

//     person.status = ['Available', 'Busy'][Math.random() < 0.7 ? 0 : 1];
//     person.profession = value;
//     if (managers.has(value)) {
//       person.managerId = managers.get(value);
//       person.manager = false;
//     } else {
//       person.managerId = null;
//       person.manager = true;
//       managers.set(value, person.id);
//     }
//   }

//   fs.writeFileSync('./people.json', JSON.stringify(people), 'utf-8');
// })();

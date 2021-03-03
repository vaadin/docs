// // npm init --y
// // npm i random-avatar-generator image-to-base64 sharp
// const { AvatarGenerator } = require('random-avatar-generator');
// const imageToBase64 = require('image-to-base64');
// const fs = require('fs');
// const sharp = require('sharp');

// const generator = new AvatarGenerator();

// const professions = [
//   {value: 'Podiatrist', manager: 'Manager of Department of Podiatric'},
//   {value: 'Pediatrician', manager: 'Manager of Department of Pediatric'},
//   {value: 'Endocrinologist', manager: 'Manager of Department of Endocrinology'},
//   {value: 'Neurologist', manager: 'Manager of Department of Neurology'},
//   {value: 'Rheumatologist', manager: 'Manager of Department of Rheumatology'},
//   {value: 'Allergist', manager: 'Manager of Department of Allergy'},
//   {value: 'Psychiatrist', manager: 'Manager of Department of Psychiatry'},
//   {value: 'Nephrologist', manager: 'Manager of Department of Nephrology'},
//   {value: 'Obstetrician', manager: 'Manager of Department of Obstetrics'},
//   {value: 'Pulmonologist', manager: 'Manager of Department of Pulmonology'},
//   {value: 'Surgeon', manager: 'Manager of Department of Surgery'},
//   {value: 'Ophthalmologist', manager: 'Manager of Department of Ophthalmology and Optometry'},
//   {value: 'Oncologist', manager: 'Manager of Department of Oncology'},
//   {value: 'Urologist', manager: 'Manager of Department of Urology'},
//   {value: 'Otolaryngologist', manager: 'Manager of Department of Otorhinolaryngology'},
//   {value: 'Anesthesiologist', manager: 'Manager of Department of Anesthesiology'},
//   {value: 'Dermatologist', manager: 'Manager of Department of Dermatology'},
//   {value: 'Radiologist', manager: 'Manager of Department of Radiology'},
//   {value: 'Gastroenterologist', manager: 'Manager of Department of Gastroenterology'},
//   {value: 'Cardiologist', manager: 'Manager of Department of Cardiology'},
//   {value: 'Orthopedist', manager: 'Manager of Department of Orthopedics'},
// ];

// const managers = new Map();

// (async () => {
//   const peopleString = fs.readFileSync('./people.json', 'utf-8');
//   const people = JSON.parse(peopleString);
//   for (const person of people) {
//     console.log(`Processing image ${people.indexOf(person) + 1}/${people.length}`);

//     const avatarUrl = generator.generateRandomAvatar();
//     const imageData = await imageToBase64(avatarUrl);

//     var img = new Buffer(imageData, 'base64');
//     const resizedImageBuffer = await sharp(img).resize(64, 64).toBuffer();

//     let resizedImageData = resizedImageBuffer.toString('base64');
//     let resizedBase64 = `data:image/jpeg;base64,${resizedImageData}`;

//     person.pictureUrl = resizedBase64;
//     var {value, manager} = professions[Math.floor(Math.random() * professions.length)];
//     if (managers.has(manager)) {
//       person.profession = value;
//       person.managerId = managers.get(manager)
//     } else {
//       person.profession = manager;
//       managers.set(manager, person.id);
//     }
//   }

//   fs.writeFileSync('./people.json', JSON.stringify(people), 'utf-8');
// })();

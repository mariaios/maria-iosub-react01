const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 34,
  petOwner: false,
  // html,javascript,css
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

console.warn(`
  Folosind obiectul person si reduce,
  afiseaza in consola un string care contine
  skillurile de pe pozitiile pare ale arrayului, separate prin virgula
`);
let message = '';

message = person.skills.reduce((message, skill, index) => {
  if (index % 2 !== 0) {
    return message;
  }

  return `${message}${index === 0 ? '' : ','}${skill}`;
}, '');
console.log(message);

console.warn(`
  In mod similar, afiseaza skillurile care NU incep cu j.
`);
message = person.skills.reduce((message, skill, index) => {
  if (skill.startsWith('j')) {
    return message;
  }

  return `${message}${index === 0 ? '' : ','}${skill}`;
}, '');
console.log(message);

console.warn(`
  Folosind reduce afiseaza propozitia: "Prietenii mei se numesc xxx yyy, xxx yyy, xxx yyy."
`);
message = person.friends.reduce(
  (message, { name, surname }, index, friends) => {
    const punctuation = index === friends.length - 1 ? '.' : ', ';

    return `${message}${name} ${surname}${punctuation}`;
  },
  'Prietenii mei se numesc ',
);
console.log(message);

console.warn(`
  Folosind reduce, afiseaza numarul total de ani pe
  care il au persoanele din arrayul friends, doar
  daca varsta este mai mare sau egala cu 30 de ani.
`);
message = person.friends.reduce((sumYears, friend) => {
  const { age } = friend;

  return age >= 30 ? sumYears + age : sumYears;
}, 0);
console.log(message);

console.warn(`doar skillurile care incep cu j`);
let filteredSkills = person.skills.reduce((filteredSkills, skill) => {
  if (skill.startsWith('j')) {
    return filteredSkills;
  }

  filteredSkills.push(skill);

  return filteredSkills;
}, []);
console.log(filteredSkills);

filteredSkills = person.skills.filter((skill) => {
  return !skill.startsWith('j');
});
console.log(filteredSkills);

const characters = [
  { name: 'Bluto', quote: '', show: 'South Side' },
  { name: 'Orla', quote: '', show: 'Derry Girls' },
  { name: 'Dennis', quote: '', show: 'Always Sunny In Philadelphia' },
  { name: 'Steven Toast', quote: '', show: 'Toast of London' },
  { name: 'Elephant Man', quote: '', show: 'Year of The Rabbit' },
  { name: 'Tracy', quote: '', show: '30 Rock' },
  { name: 'Captain Holt', quote: '', show: 'Brooklyn 99' },
  { name: 'Gob Bluth', quote: '', show: 'Arrested Development' },
];

let shows = [
  { name: 'South Side', seasons: 3, streamer: 'HBO' },
  { name: 'Derry Girls', seasons: 3, streamer: 'Netflix' },
  { name: 'Always Sunny In Philadelphia', seasons: 16, streamer: 'Hulu' },
  { name: 'Toast of London', seasons: 4, streamer: 'BBC' },
  { name: 'Year of The Rabbit', seasons: 1, streamer: 'BBC' },
  { name: '30 Rock', seasons: 7, streamer: 'Peacock' },
  { name: 'Brooklyn 99', seasons: 8, streamer: 'Peacock' },
  { name: 'Arrested Development', seasons: 5, streamer: 'Netflix' },
];


export default {
  Characters: {
    Create: async (data) => {
      characters.push(data);
    },
    Find: async ({ name }) => {
      const index = characters.findIndex((character) => character.name === name);
      return characters[index];
    },
    List: async () => { return characters; },
    Remove: async ({ name }) => {
      const index = characters.findIndex((character) => character.name == name);
      characters.splice(index, 1);

      return { deleted: 1 };
    },
    Show: async ({ name }) => {
      const filtered = characters.filter((character) => character.show === name);
      return filtered;
    },
    Update: async ({ context, values }) => {
      const index = characters.findIndex((character) => character.name === context.name);
      const character = { ...characters[index], tagline: values.tagline };
      
      characters[index] = character;
      
      return character;
    },
  },
  Shows: {
    Create: async (data) => {
      shows.push(data);
      return data;
    },
    Find: async ({ name }) => {
      const index = shows.findIndex((show) => show.name === name);
      return shows[index];
    },
    List: async () => { return shows; },
    Remove: async ({ name }) => {
      const index = shows.findIndex((show) => show.name == name);
      shows.splice(index, 1);

      return { deleted: 1 };
    },
    Update: async ({ context, values }) => {
      const index = shows.findIndex((show) => show.name === context.name);
      const show = { ...shows[index], tagline: values.tagline };

      shows[index] = show;

      return show;
    },
  },
}
const characters = [
  { name: 'Bluto', quote: 'Money does important work.  Money is a machine that transports the value of your labor into the future.', show: 'South Side' },
  { name: 'Orla', quote: 'I love my wee fingers', show: 'Derry Girls' },
  { name: 'Dee', quote: 'At least he isn’t covered in stupid tattoos and has a cigarette for a mother', show: 'Always Sunny In Philadelphia' },
  { name: 'Steven Toast', quote: 'Yes I can hear you Clem Fandango', show: 'Toast of London' },
  { name: 'Tracy', quote: 'Put it in the tub with a reef', show: '30 Rock' },
  { name: 'Gob Bluth', quote: 'Illusions, Michael', show: 'Arrested Development' },
];

let shows = [
  { name: 'South Side', seasons: 3, streamer: 'HBO' },
  { name: 'Derry Girls', seasons: 3, streamer: 'Netflix' },
  { name: 'Always Sunny In Philadelphia', seasons: 16, streamer: 'Hulu' },
  { name: 'Toast of London', seasons: 4, streamer: 'BBC' },
  { name: '30 Rock', seasons: 7, streamer: 'Peacock' },
  { name: 'Arrested Development', seasons: 5, streamer: 'Netflix' },
];


export default {
  Characters: {
    Create: async (data) => {
      characters.push({ ...data, quote: '' });
      return data;
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
      const character = { ...characters[index], quote: values.quote };
      
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
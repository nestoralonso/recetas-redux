import { v4 } from 'node-uuid';

const fakeDb = {
  recipes: [
    {
      id: 'a1',
      title: 'Bondiola Braseada a la Cerveza!',
      description: 'Tremenda receta para hacer una Bondiola a puro Sabor',
      thumbnailUrl: 'http://img.youtube.com/vi/1pwLAJlM4H4/default.jpg',
    },
    {
      id: 'a2',
      title: 'Matambre Arrollado DELICIA TOTAL',
      description: 'Como hacer un Matambre Arrollado y Asado 100%!' +
      ' Una combinación que va a explotar los paladares de tus comensales!',
      thumbnailUrl: 'http://img.youtube.com/vi/GeAquSuYfnc/default.jpg',
    },
    {
      id: 'a3',
      title: 'Costillar a Pura Leña Inyectado al Vino Tinto!',
      description: 'Tremendo ASADO de noche a puro costillar y achuras!' +
      ' Esta receta te deja el costillar como una manteca! A inyectar se ha dicho!',
      thumbnailUrl: 'http://img.youtube.com/vi/v3nuujGTYs4/default.jpg',
    },
    {
      id: 'a4',
      title: 'Lomo al Trapo! Directo en las Brasas!',
      description: 'Técnica para hacer carne 100% al trapo! No saben el sabor que se genera!',
      thumbnailUrl: 'http://img.youtube.com/vi/lQzKDb8VR78/default.jpg',
    }
  ]
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export function fetchRecipes(userId) {
  return delay(300).then(() => {
    return fakeDb.recipes;
  });
}

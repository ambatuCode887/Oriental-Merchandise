import type { PageServerLoad, Actions } from './$types';
import { getMerchandisesCollection } from '$lib/db';
import { ObjectId } from 'mongodb';

export const load = (async ({ params }) => {
  const merchandisesCollection = await getMerchandisesCollection();
  const slug = params.id;

  const getMerchandise = await merchandisesCollection.findOne(
    { _id: new ObjectId(slug) },
    { projection: { _id: 0 } }  
  );
  const merchandise = JSON.parse(JSON.stringify(getMerchandise));
  return { merchandise, slug };
}) satisfies PageServerLoad;  

export const actions = {
  default: async (event) => {
  },
} satisfies Actions;
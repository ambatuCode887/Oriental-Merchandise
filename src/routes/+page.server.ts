import type { PageLoad } from './$types';
import { getMerchandisesCollection } from '$lib/db'

const merchandisesCollection = await getMerchandisesCollection()

export const load: PageLoad = async () => {
	const getMerchandises = await merchandisesCollection.find({}).toArray();
  const merchandises = JSON.parse(JSON.stringify(getMerchandises))
  
  return {
    merchandises
	};
};
import { firestore, storage } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export const fetchPsychologicalMessages = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, 'psychologicalMessages')
    );
    const messages = querySnapshot.docs.map((doc) => doc.data());
    return messages;
  } catch (error) {
    console.error('Error fetching psychological messages:', error);
  }
  return [];
};

export const fetchCatImages = async () => {
  try {
    const listResult = await listAll(ref(storage, 'catImages'));

    if (listResult.items.length === 0) {
      console.log('No cat images found in storage');
    }

    const imageUrls = await Promise.all(
      listResult.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { id: item.name, uri: url };
      })
    );
    return imageUrls;
  } catch (error) {
    console.error('Error fetching cat images:', error);
  }
  return [];
};

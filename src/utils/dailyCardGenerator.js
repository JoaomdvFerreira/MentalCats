export const generateDailyCard = (catImagesData, psychologicalMessagesData) => {
  if (catImagesData.length === 0 || psychologicalMessagesData.length === 0) {
    console.warn('No cat images or psychological messages found.');
    return null;
  }

  const randomIndex = Math.floor(Math.random() * catImagesData.length);
  const randomImage = catImagesData[randomIndex];
  const randomMessage =
    psychologicalMessagesData[
      Math.floor(Math.random() * psychologicalMessagesData.length)
    ];

  const newCard = {
    image: { id: randomIndex + 1, uri: randomImage.uri },
    message: { title: randomMessage.title, message: randomMessage.message },
  };

  return newCard;
};

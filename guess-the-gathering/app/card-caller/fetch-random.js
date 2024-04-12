export async function fetchRandomCard() {
    const totalCards = 10000;
    const randomId = Math.floor(Math.random() * totalCards) + 1;
    console.log(`Fetching card with id: ${randomId}`);
    const response = await fetch(`https://api.magicthegathering.io/v1/cards/${randomId}`);
  
    if (response.ok) {
      const data = await response.json();
      if (data.card && data.card.imageUrl) {
        return data.card.imageUrl;
      } else {
        console.log('Image not found');
        return null;
      }
    } else {
      console.log('Card not found');
      return null;
    }
  }
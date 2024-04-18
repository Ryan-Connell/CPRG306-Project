export async function fetchRandomCard() {
  let cardFound = false;
  let data = null;

  while (!cardFound) {
    console.log(`Fetching a random card`);
    const response = await fetch(
      `https://api.magicthegathering.io/v1/cards?random=true&pageSize=1`
    );

    if (response.ok) {
      data = await response.json();
      if (data.cards && data.cards.length > 0) {
        cardFound = true;
        data.card = data.cards[0]; // Store the card in data.card for consistency with the previous function
      } else {
        console.log("Card not found, retrying...");
      }
    } else {
      console.log("Error fetching card, retrying...");
    }
  }

  return data.card;
}

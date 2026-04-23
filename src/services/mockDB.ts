import { AuctionLot, EventMetadata } from '../types';

export const getAuctions = (): AuctionLot[] => {
    const saved = localStorage.getItem('arcadia_auctions');
    return saved ? JSON.parse(saved) : [{
        id: "lot_1",
        originalTitle: "Vial of the First Rain",
        originalDescription: "Purported to be the first precipitation to fall on the newly formed Earth. Glows faintly under moonlight. Contains traces of unidentified organic matter.",
        cipherTitle: "⍵⍨⍙⍫ ⍮⍝ ⍳⍧⎊ ⍝⍨⍱⍲⍳ ⍱⍙⍨⍭",
        cipherDescription: "⍯⍴⍱⍯⍮⍱⍳⎊⎉ ⍳⍮ ⍦⎊ ⍳⍧⎊ ⍝⍨⍱⍲⍳ ⍯⍱⎊⎈⍨⍯⍨⍳⍙⍳⍨⍮⍭ ⍳⍮ ⍝⍙⍫⍫ ⍮⍭ ⍳⍧⎊ ⍭⎊⍶⍫⍸ ⍝⍮⍱⍬⎊⎉ ⎊⍙⍱⍳⍧⎔ ⍦⍫⍮⍶⍲ ⍝⍙⍨⍭⍳⍫⍸ ⍴⍭⎉⎊⍱ ⍬⍮⍮⍭⍫⍨⍦⍧⍳⎔",
        startingBid: 150000,
        decryptionKey: "oblivion",
        imageUrl: "https://images.unsplash.com/photo-1616853291583-b78fc438885b?auto=format&fit=crop&q=80&w=800",
        timestamp: Date.now() - 3600000
    }];
};

export const saveAuction = (lot: AuctionLot) => {
    const auctions = getAuctions();
    localStorage.setItem('arcadia_auctions', JSON.stringify([lot, ...auctions]));
};

export const clearAuctions = () => {
    localStorage.removeItem('arcadia_auctions');
};

export const getEvents = (): EventMetadata[] => {
    const saved = localStorage.getItem('arcadia_events');
    return saved ? JSON.parse(saved) : [{
        id: "ev_1",
        originalText: "The password for the vial is oblivion meet at the lake",
        cipherText: "▪️ 🔑 ▪️ ▪️ 🧪 ▪️ 🌑 🜁 ▪️ ▪️ 🌊",
        locationName: "The Serpentine Lake",
        latitude: 51.5055,
        longitude: -0.1656,
        timestamp: Date.now() - 3600000
    }];
};

export const saveEvent = (event: EventMetadata) => {
    const events = getEvents();
    localStorage.setItem('arcadia_events', JSON.stringify([event, ...events]));
};

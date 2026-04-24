import { AuctionLot, EventMetadata, MemberIdentity, DirectMessage } from '../types';

const ADJECTIVES = ["Silent", "Crimson", "Shadow", "Argent", "Cobalt", "Veiled", "Hollow", "Iron"];
const NOUNS = ["Observer", "Cipher", "Hand", "Eye", "Whisper", "Moth", "Raven", "Lotus"];

export const generateIdentity = (): MemberIdentity => {
    const existing = localStorage.getItem('arcadia_identity');
    if (existing) return JSON.parse(existing);

    const codename = `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`;
    const identity: MemberIdentity = {
        id: "me_" + Date.now().toString(),
        codename,
        joinDate: Date.now()
    };
    localStorage.setItem('arcadia_identity', JSON.stringify(identity));
    return identity;
};

export const MOCK_MEMBERS: MemberIdentity[] = [
    { id: "mem_1", codename: "Crimson Raven", joinDate: Date.now() - 10000000 },
    { id: "mem_2", codename: "Silent Observer", joinDate: Date.now() - 20000000 },
    { id: "mem_3", codename: "Veiled Moth", joinDate: Date.now() - 5000000 },
];

export const getMembers = (): MemberIdentity[] => {
    const saved = localStorage.getItem('arcadia_members');
    return saved ? JSON.parse(saved) : MOCK_MEMBERS;
};

export const saveMember = (member: MemberIdentity) => {
    const members = getMembers();
    localStorage.setItem('arcadia_members', JSON.stringify([member, ...members]));
};

export const removeMember = (memberId: string) => {
    const members = getMembers().filter(m => m.id !== memberId);
    localStorage.setItem('arcadia_members', JSON.stringify([...members]));
};

export const getMessages = (myId: string): DirectMessage[] => {
    const saved = localStorage.getItem('arcadia_dms_' + myId);
    return saved ? JSON.parse(saved) : [
        {
            id: "msg_1",
            senderId: "mem_1",
            senderName: "Crimson Raven",
            receiverId: myId,
            content: "Welcome to the inner circle. We encrypt our intentions, but our goals align.",
            timestamp: Date.now() - 50000
        }
    ];
};

export const saveMessage = (myId: string, msg: DirectMessage) => {
    const msgs = getMessages(myId);
    localStorage.setItem('arcadia_dms_' + myId, JSON.stringify([...msgs, msg]));
};

export const deleteMessage = (myId: string, msgId: string) => {
    const msgs = getMessages(myId);
    localStorage.setItem('arcadia_dms_' + myId, JSON.stringify(msgs.filter(m => m.id !== msgId)));
};

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

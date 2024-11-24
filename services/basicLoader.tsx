import PocketBase from 'pocketbase';

const pb = new PocketBase('https://dbrskaji.pockethost.io');

export async function getAllBasicSettings() {
    try {
        const records = await pb.collection('basics').getFullList({
            sort: '-created',
        });
        return records;
    } catch (error) {
        console.error('Error fetching all basic settings:', error);
        return [];
    }
}
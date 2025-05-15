import { error } from '@sveltejs/kit';
import { sql } from '$lib/server/db.js';
import { validateDigest } from '$lib/digest';

export async function load({ params }) {
    const { digest } = params;
    if (!digest) {
        throw error(400, 'Hash is required');
    }
    if (digest.length !== 64) {
        throw error(400, 'Hash must be 64 characters long');
    }
    if (!/^[a-f0-9]+$/.test(digest)) {
        throw error(400, 'Hash must be a hexadecimal string');
    }
    // Check if the hash exists in the database
    const {rows: [secret]} = await sql`SELECT message FROM secrets WHERE digest = ${digest}`;
    
    return {...secret, digest};
}

export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const message = formData.get('message');
        const { digest } = params;

        if (!message) {
            throw error(400, 'Message is required');
        } else if (typeof message !== 'string') {
            throw error(400, 'Message must be a string');
        }
        if (message.length > 1000000) {
            throw error(400, 'Message is too long');
        }

        // Validate using the shared utility
        const isValid = await validateDigest(message, digest);
        if (!isValid) {
            throw error(400, 'Message does not match the digest');
        }

        await sql`
            INSERT INTO secrets (message, digest)
            VALUES (${message}, ${digest})
            ON CONFLICT (digest) DO UPDATE
            SET message = ${message}
        `;

        return { success: true };
    }
};
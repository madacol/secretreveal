/**
 * Generates SHA-256 digest for a message
 * @param {string} message
 * @returns {Promise<string>} Hex digest
 */
export async function getDigest(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Validates if a message matches a digest
 * @param {string} message
 * @param {string} digest
 * @returns {Promise<boolean>}
 */
export async function validateDigest(message, digest) {
    const messageDigest = await getDigest(message);
    return messageDigest === digest;
}

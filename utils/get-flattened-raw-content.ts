export const getFlattenRawContent = async () => {
    const API_URL =
        "https://raw.githubusercontent.com/marchah/sea-ports/refs/heads/master/lib/ports.json";
    const response = await fetch(API_URL);
    const data = (await response.json()) as Record<string, Location>;
    const flattened = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
    }));
    return { "sea-ports": flattened };
};

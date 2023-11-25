export const generateId = () => {
    const cryptoInstance = (window as any).crypto;
    return cryptoInstance.randomUUID();
}
export const useUtils = () => {
    const toHex = (value) => `0x${Number(value).toString(16)}`
    return { toHex };
  };
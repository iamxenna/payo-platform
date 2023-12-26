declare global {
  interface Window {
    ethereum: providers.ExternalProvider;
  }
}

export {};

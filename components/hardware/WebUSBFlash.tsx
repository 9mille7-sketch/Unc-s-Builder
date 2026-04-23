// WebUSB Flashing Logic for Staff Direct Injector
export const flashInjectedScript = async (base64Payload: string) => {
  const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x2508 }] });
  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(0);

  const binary = Uint8Array.from(atob(base64Payload), c => c.charCodeAt(0));
  for (let i = 0; i < binary.length; i += 64) {
    const chunk = binary.slice(i, i + 64);
    await device.transferOut(1, chunk);
  }
  return "SUCCESS";
};

declare global {
  interface Navigator {
    bluetooth: Bluetooth
  }

  interface Bluetooth {
    requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>
  }

  interface BluetoothDevice {
    gatt?: BluetoothRemoteGATTServer
    // ... other properties you might use
  }

  interface BluetoothRemoteGATTServer {
    connect(): Promise<BluetoothRemoteGATTServer>
    getPrimaryService(service: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService>
    // ... other properties you might use
  }

  interface BluetoothRemoteGATTService {
    getCharacteristic(characteristic: BluetoothCharacteristicUUID): Promise<BluetoothRemoteGATTCharacteristic>
    // ... other properties you might use
  }

  interface BluetoothRemoteGATTCharacteristic {
    readValue(): Promise<DataView>
    writeValue(value: BufferSource): Promise<void>
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    addEventListener(type: 'characteristicvaluechanged', listener: (this: BluetoothRemoteGATTCharacteristic, ev: Event) => any, options?: boolean | AddEventListenerOptions): void
    // ... other properties you might use
  }

  // Add any other Web Bluetooth API interfaces you might use
  type BluetoothServiceUUID = number | string;
  type BluetoothCharacteristicUUID = number | string;
}

export {};

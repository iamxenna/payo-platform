import { v4 as uuidv4 } from "uuid";
import WertWidget from "@wert-io/widget-initializer";
import type { IWertModule } from "./WertModule.interfaces";
import { WertConfig } from "./configuration";
import "react-calendar/dist/Calendar.css";

class WertModule implements IWertModule {
  private readonly partner_id: string = WertConfig.partner_id;
  private readonly _amount: number;
  private readonly _address: string;
  private readonly _click_id: string;

  private readonly _wertInstance: WertWidget;

  constructor(amount: number, address: string) {
    this._amount = amount;
    this._address = address;
    this._click_id = uuidv4();

    this._wertInstance = new WertWidget({
      partner_id: this.partner_id,
      currency_amount: this._amount,
      click_id: this._click_id,
      address: this._address,
      commodities: '[{"commodity":"USDC","network":"polygon"}]',
      container_id: "wert_module",
      width: 400,
      height: 600,
      currency: "USD",
      listeners: {
        loaded: () => {
          console.log(document.getElementsByName("currency-amount"));
          document.getElementsByName("currency-amount").forEach((el) => {
            el.style.backgroundColor = " wert-disabled";
          });
        },
      },
    });
  }

  public mount(): void {
    this._wertInstance.mount();
  }

  public unmount(): void {
    return this._wertInstance.destroy();
  }
}

export default WertModule;

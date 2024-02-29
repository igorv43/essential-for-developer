import { GridRowsProp } from "@mui/x-data-grid";
export interface MMFixPriceModel {
  formula: string;
  price: number;
  log: FixMMLog[];
}
export interface FixMMLog {
  nome: string;
  valor: string;
}
export interface MarketCoinModel {
  marketCapitalization: number;
  totalSupply: number;
}
export class MMFixPrice {
  static Calculate(
    list: GridRowsProp,
    market: MarketCoinModel
  ): MMFixPriceModel {
    let MMPrice = 0;

    // https://medium.com/@cryto2711/a280bd4e94e6
    //case MM f.p =(Market Capitalization/ Total Supply)
    const MMfp = market.marketCapitalization / market.totalSupply;
    console.log("MMfp", MMfp);
    const A = this.FormulaA(list, MMfp);
    if (A > 0) {
      console.log("Formula A:", A);
      return { formula: "A", price: A } as MMFixPriceModel;
    }
    const B = this.FormulaB(list, MMfp);
    if (B > 0) {
      console.log("Formula B:", B);
      return { formula: "B", price: B } as MMFixPriceModel;
    }
    const C = this.FormulaC(list, MMfp);
    if (C > 0) {
      console.log("Formula C:", C);
      return { formula: "C", price: C } as MMFixPriceModel;
    }
    const D = this.FormulaD(list, MMfp);
    if (D > 0) {
      console.log("Formula D:", D);
      return { formula: "D", price: D } as MMFixPriceModel;
    }
    const E = this.FormulaE(list, MMfp);
    if (E > 0) {
      console.log("Formula E:", E);
      return { formula: "E", price: E } as MMFixPriceModel;
    }
    const F = this.FormulaF(list, MMfp);
    if (F > 0) {
      console.log("Formula F:", F);
      return { formula: "F", price: F } as MMFixPriceModel;
    }
    return { formula: "NDA", price: 0 } as MMFixPriceModel;
  }
  private static FormulaA(list: GridRowsProp, MMfp: number) {
    let success = false;
    let price: number = 0;
    // verifica se todos os preçoes seguem a logica
    const onePercent = MMfp * 0.01;
    for (let index = 0; index < list.length; index++) {
      const obj = list[index];
      if (obj.price >= MMfp - onePercent && obj.price <= MMfp + onePercent) {
        success = true;
      } else {
        success = false;
        break;
      }
    }
    if (success) {
      price = MMfp;
    }
    return price;
  }
  private static FormulaB(list: GridRowsProp, MMfp: number) {
    let success = false;
    let success_y = false;
    let price: number = 0;
    let list_y = new Array();
    // verifica se todos os preçoes seguem a logica

    const onePercent = MMfp * 0.01;
    for (let index = 0; index < list.length; index++) {
      const obj = list[index];
      if (obj.price >= MMfp - onePercent && obj.price <= MMfp + onePercent) {
        success = true;
      } else {
        list_y.push(obj);
      }
    }
    if (success) {
      for (let index = 0; index < list_y.length; index++) {
        const obj = list_y[index] as any;
        if (obj.price > MMfp + onePercent) {
          success_y = true;
        } else {
          success_y = false;
          break;
        }
      }
    }

    if (success_y) {
      price = this.FormulaBComplement(list, MMfp);
    }
    return price;
  }
  private static FormulaBComplement(list: GridRowsProp, MMfp: number) {
    let price: number = 0;
    const sumPrice = list.reduce((accumulator, object) => {
      return accumulator + object.price * object.volume;
    }, 0);
    const sumVolume = list.reduce((accumulator, object) => {
      return accumulator + object.volume;
    }, 0);

    const USTC_CEX_Price = sumPrice / sumVolume;
    if (Math.abs((USTC_CEX_Price - MMfp) / MMfp) <= 0.5) {
      price = MMfp - ((USTC_CEX_Price - MMfp) / 2 - MMfp);
    } else {
      price = USTC_CEX_Price * 0.965;
    }
    return price;
  }
  private static FormulaC(list: GridRowsProp, MMfp: number) {
    const onePercent = MMfp * 0.01;
    let price: number = 0;
    let success = false;
    for (let index = 0; index < list.length; index++) {
      const obj = list[index];
      if (obj.price > MMfp + onePercent) {
        success = true;
      } else {
        success = false;
        break;
      }
    }
    if (success) {
      price = this.FormulaBComplement(list, MMfp);
    }
    return price;
  }
  private static FormulaD(list: GridRowsProp, MMfp: number) {
    let success = false;
    let success_y = false;
    let price: number = 0;
    let list_y = new Array();
    // verifica se todos os preçoes seguem a logica

    const onePercent = MMfp * 0.01;
    for (let index = 0; index < list.length; index++) {
      const obj = list[index];
      if (obj.price >= MMfp - onePercent && obj.price <= MMfp + onePercent) {
        success = true;
      } else {
        list_y.push(obj);
      }
    }
    if (success) {
      for (let index = 0; index < list_y.length; index++) {
        const obj = list_y[index] as any;
        if (obj.price < MMfp - onePercent) {
          success_y = true;
        } else {
          success_y = false;
          break;
        }
      }
    }

    if (success_y) {
      price = this.FormulaDComplement(list, MMfp);
    }
    return price;
  }

  private static FormulaDComplement(list: GridRowsProp, MMfp: number) {
    let price: number = 0;
    const sumPrice = list.reduce((accumulator, object) => {
      return accumulator + object.price * object.volume;
    }, 0);
    const sumVolume = list.reduce((accumulator, object) => {
      return accumulator + object.volume;
    }, 0);
    console.log("sumPrice", sumPrice);
    console.log("sumVolume", sumVolume);
    const USTC_CEX_Price = sumPrice / sumVolume;
    console.log("USTC_CEX_Price", USTC_CEX_Price);
    console.log("calc x", (USTC_CEX_Price - MMfp) / MMfp);
    if (Math.abs((USTC_CEX_Price - MMfp) / MMfp) > 0.5) {
      console.log("achou", USTC_CEX_Price);
      price = USTC_CEX_Price * 1.035;
    } else {
      price = MMfp - ((USTC_CEX_Price - MMfp) / 2 - MMfp);
    }
    return price;
  }
  private static FormulaE(list: GridRowsProp, MMfp: number) {
    const onePercent = MMfp * 0.01;
    let price: number = 0;
    let success = false;
    for (let index = 0; index < list.length; index++) {
      const obj = list[index];
      if (obj.price < MMfp - onePercent) {
        success = true;
      } else {
        success = false;
        break;
      }
    }
    if (success) {
      price = this.FormulaDComplement(list, MMfp);
    }
    return price;
  }
  private static FormulaF(list: GridRowsProp, MMfp: number) {
    let success = false;
    let success_y = false;
    let price: number = 0;
    let list_y = new Array();
    // verifica se todos os preçoes seguem a logica

    const onePercent = MMfp * 0.01;
    for (let index = 0; index < list.length; index++) {
      const obj = list[index];
      if (obj.price > MMfp + onePercent) {
        success = true;
      } else {
        list_y.push(obj);
      }
    }
    if (success) {
      for (let index = 0; index < list_y.length; index++) {
        const obj = list_y[index] as any;
        if (obj.price < MMfp - onePercent) {
          success_y = true;
        } else {
          success_y = false;
          break;
        }
      }
    }

    if (success_y) {
      const sumPrice = list.reduce((accumulator, object) => {
        return accumulator + object.price * object.volume;
      }, 0);
      const sumVolume = list.reduce((accumulator, object) => {
        return accumulator + object.volume;
      }, 0);

      const USTC_CEX_Price = sumPrice / sumVolume;
      if (USTC_CEX_Price - MMfp >= 0) {
        price = this.FormulaBComplement(list, MMfp);
      } else {
        price = this.FormulaDComplement(list, MMfp);
      }
    }
    return price;
  }
}

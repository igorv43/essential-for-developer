import React from "react";
import { createContext } from "react";
import { MMFixPriceModel } from "../Bussines/MMFixPrice";
export type MMFixPriceContextType = {
  fixObj: MMFixPriceModel;
  updatePrice: (fixObj: MMFixPriceModel) => void;
};
export const context = React.createContext<MMFixPriceContextType | null>(null);
export const MMFixPriceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fixObj, setfixObj] = React.useState<MMFixPriceModel>({
    formula: "NDA",
    price: 0,
    log: [{ nome: "", valor: "" }],
  });
  const updatePrice = (todo: MMFixPriceModel) => {
    setfixObj(todo);
  };
  return (
    <context.Provider
      value={{
        fixObj,
        updatePrice,
      }}
    >
      {children}
    </context.Provider>
  );
};

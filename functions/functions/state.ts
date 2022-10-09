import { DeepPartial } from "@reduxjs/toolkit";
import { IPropertyProsState } from "../../interface/interfaces";
import cmds from "../cmds";

export default {
  *getAppState(
    path: string | undefined
  ): DeepPartial<IPropertyProsState> | unknown {
    return yield cmds.reduxGetState(path);
  },
};

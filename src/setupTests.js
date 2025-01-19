import { config } from "@vue/test-utils";

config.global.mocks = {
  $t: (msg) => msg,
};

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

interface CreateAliasCBParams {
  colors: any;
  dimensions: any;
}
interface Decorate {
  css?: any;
  colors?: any;
  dimensions?: any;
  createAlias?: (cb: (params: CreateAliasCBParams) => any) => void;
  alias?: any;
}

export { CreateAliasCBParams, Decorate };

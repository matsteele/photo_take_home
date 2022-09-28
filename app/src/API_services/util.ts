export const tcWrapper = (
  fns: Function[],
  set_loading: Function,
  set_error: Function
): void => {
  let result: any;

  fns.forEach((fn) => {
    fn =  function () {
      try {
        set_loading(true);
        result = fn(arguments);
      } catch (e) {
        set_error(e);
      }
      set_loading(false);
      return result;
    };
  });
};

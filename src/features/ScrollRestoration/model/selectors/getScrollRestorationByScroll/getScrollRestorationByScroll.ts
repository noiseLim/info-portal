import { StateSchema } from 'app/providers/StoreProvider';

export const getScrollRestorationByScroll = (state: StateSchema) =>
  state.scrollRestoration.scroll;

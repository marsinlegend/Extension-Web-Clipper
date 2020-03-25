import { IExtensionWithId } from './common';

const context = require.context('./extensions', true, /\.[t|j]s$/);

export const extensions: IExtensionWithId[] = context.keys().map(key => {
  const id = key.slice(2, key.length - 3);
  return {
    ...context(key).default,
    id,
    router: `/plugins/${id}`,
  };
});

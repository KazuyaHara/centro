import auth from './auth.json';
import common from './common.json';
import map from './map.json';

export default { translation: { ...auth, ...common, ...map } };

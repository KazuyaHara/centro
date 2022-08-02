import auth from './auth.json';
import common from './common.json';
import footprint from './footprint.json';
import menu from './menu.json';
import moment from './moment.json';

export default { translation: { ...auth, ...common, ...footprint, ...menu, ...moment } };

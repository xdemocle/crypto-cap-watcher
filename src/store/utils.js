
import _ from 'lodash';

const setValuesShadow = (state, newState) => {
  const ret = _.each(state, (value, key) => {
    if (!_.isArray(value) && !_.isObject(value)) {
      state[key] = newState[key];
    } else {
      return _.each(value, (propValue, propKey, collection) => {
        const Collection = collection;

        if (!_.isArray(value[propKey]) && !_.isObject(value[propKey])) {
          Collection[propKey] = propValue;
        } else {
          return setValuesShadow(value, collection);
        }

        return Collection;
      });
    }

    return state;
  });

  return ret;
};

export default {
  setValuesShadow
};

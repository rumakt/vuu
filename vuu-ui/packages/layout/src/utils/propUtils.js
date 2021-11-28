const NO_PROPS = {};
export const getProp = (component, propName) => {
  const props = getProps(component);
  return props[propName] ?? props[`data-${propName}`];
};

export const getProps = (component) => component?.props || component || NO_PROPS;

// Used when a container is expected to have a single child
export const getChildProp = (container) => {
  const props = getProps(container);
  if (props.children) {
    const {
      children: [target, ...rest]
    } = props;
    if (rest.length > 0) {
      console.warn(`getChild expected a single child, found ${rest.length + 1}`);
    }
    return target;
  } else {
    return undefined;
  }
};
